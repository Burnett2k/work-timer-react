import React from 'react';
import Controls from '../components/Controls.js';
import Timer from '../components/Timer.js';
import SaveSessions from './SaveSessions.js';
import { connect } from 'react-redux';
import { saveSecondsRemaining } from '../actions';
import { saveStatus } from '../actions';
import PropTypes from 'prop-types';
import timesUp from '../sounds/harp-strumming.mp3';
// import ProgressBar from '../components/ProgressBar.js';
import Worker from '../utils/timer.worker.js';
import { saveSession } from '../services/timerSession';

const STARTED = 'running';
const PAUSED = 'paused';
const STOPPED = 'stopped';
const START = 'start';
const PAUSE = 'pause';
const RESUME = 'resume';
const TAB_TEXT = 'Pomodoro Timer';

class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);

    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onTick = this.onTick.bind(this);
    this.onCompletion = this.onCompletion.bind(this);
    this.sound = new Audio(timesUp);

    this.state = {
      formattedTime: '00:00',
      playPauseText: 'start',
      sessionComplete: false,
      percentComplete: 0,
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    minutes: PropTypes.number,
    secondsRemaining: PropTypes.number,
    playPause: PropTypes.bool,
    hide: PropTypes.bool,
    reset: PropTypes.bool,
    stop: PropTypes.bool,
    status: PropTypes.string,
    isMuted: PropTypes.bool,
    notes: PropTypes.string,
    theme: PropTypes.string,
  };

  componentDidMount() {
    // when previous timer was out, assume refresh means reset
    if (this.props.secondsRemaining === 0) {
      this.props.dispatch(saveSecondsRemaining(this.props.minutes * 60));
    }

    this.convertSecondsToTimer();
    if (window.Worker) {
      if (this.worker) {
        this.worker.terminate();
      }
      this.worker = new Worker();

      this.worker.addEventListener('message', (e) => this.onMessageReceived(e));
    }
    // if our last status was running, then we want to resume the timer
    if (this.props.status === STARTED) {
      this.onStart(true);
    }
  }

  onMessageReceived(e) {
    switch (e.data) {
      case 'tick':
        this.onTick();
        break;
      case 'flash':
        this.updateTabText();
        break;
      default:
        break;
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.secondsRemaining !== this.props.secondsRemaining) {
      this.convertSecondsToTimer();
    }
    if (prevProps.minutes !== this.props.minutes) {
      this.onReset();
    }
    if (prevProps.playPause !== this.props.playPause) {
      this.onStart(false);
    }
    if (prevProps.reset !== this.props.reset) {
      this.onReset();
    }
    if (prevProps.stop !== this.props.stop) {
      this.onStop();
    }
  }

  onStart(forceStart = false) {
    if (forceStart === false) {
      this.worker.postMessage('start');
      this.props.dispatch(saveStatus(STARTED));
      this.setState({ playPauseText: PAUSE });
    } else {
      switch (this.props.status) {
        case STARTED:
          this.props.dispatch(saveStatus(PAUSED));
          this.setState({ playPauseText: RESUME });
          this.worker.postMessage('clearAll');
          break;
        case PAUSED:
          this.worker.postMessage('start');
          this.props.dispatch(saveStatus(STARTED));
          this.setState({ playPauseText: PAUSE });
          break;
        case STOPPED:
          this.props.dispatch(saveSecondsRemaining(this.props.minutes * 60));
          this.worker.postMessage('start');
          this.props.dispatch(saveStatus(STARTED));
          this.setState({ playPauseText: PAUSE });
          this.worker.postMessage('clearFlash');
          break;
        default:
          break;
      }
    }
  }

  onStop() {
    this.props.dispatch(saveStatus(STOPPED));
    this.setState({ playPauseText: START });
    this.props.dispatch(saveSecondsRemaining(0));
    this.setPercentComplete(0);
    this.worker.postMessage('clearAll');
    this.stopSound();
  }

  onReset() {
    this.props.dispatch(saveStatus(STOPPED));
    this.setState({ playPauseText: START });
    this.props.dispatch(saveSecondsRemaining(this.props.minutes * 60));
    this.setPercentComplete(0);
    this.worker.postMessage('clearAll');
    this.stopSound();
  }

  onTick() {
    if (this.props.secondsRemaining === 0) {
      this.onStop();
      this.onCompletion();
      this.setPercentComplete();
    } else {
      this.setPercentComplete();
      this.props.dispatch(
        saveSecondsRemaining(this.props.secondsRemaining - 1)
      );
    }
  }

  setPercentComplete(percentComplete) {
    if ((percentComplete > -1) & (percentComplete < 100)) {
      this.setState({ percentComplete: percentComplete });
    } else {
      let percent = Math.round(
        (1 - this.props.secondsRemaining / (this.props.minutes * 60)) * 100
      );
      this.setState({ percentComplete: percent });
    }
  }

  onCompletion() {
    // todo ** figure out the right place to put this if you
    // also want to save data on incomplete sessions which would
    // be useful
    saveSession({
      secondsElapsed: this.props.minutes * 60,
      notes: {
        text: this.props.notes,
      },
    });
    this.setState((prevState) => ({
      sessionComplete: !prevState.sessionComplete,
    }));
    this.flashTimesUp();
    this.playSound();
  }

  playSound() {
    if (!this.props.isMuted) {
      this.sound.currentTime = 0;
      this.sound.volume = 0.3;
      this.sound.play();
    }
  }

  stopSound() {
    if (!this.props.isMuted) {
      this.sound.currentTime = 0;
      this.sound.pause();
    }
  }

  convertSecondsToTimer() {
    let hours = (this.props.secondsRemaining / 60) >> 0;
    let minutes = this.props.secondsRemaining % 60;
    let time = `${hours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    this.setState({ formattedTime: time });
    this.addTimeToTab(time);
  }

  addTimeToTab(time) {
    if (this.props.status === STARTED || this.props.status === PAUSED) {
      document.title = `${time} left!`;
    } else {
      document.title = 'Pomodoro Timer';
    }
  }

  flashTimesUp() {
    this.props.dispatch(saveSecondsRemaining(0));
    this.setState({ formattedTime: 'TIMES UP!' });
    this.worker.postMessage('flash');
  }

  updateTabText() {
    if (document.title === TAB_TEXT) {
      document.title = 'Times Up!';
    } else {
      document.title = TAB_TEXT;
    }
  }

  render() {
    return (
      <div
        className={`container text-center q-top-buffer ${
          this.props.hide ? 'd-none' : ''
        }`}
      >
        <h4 className="neon-text">POMODORO TIMER</h4>
        <Timer formattedTime={this.state.formattedTime} />
        <Controls
          onStart={this.onStart}
          onStop={this.onStop}
          onReset={this.onReset}
          playPauseText={this.state.playPauseText}
          theme={this.props.theme}
        />
        {/* <ProgressBar percent={this.state.percentComplete} /> */}
        <SaveSessions sessionComplete={this.state.sessionComplete} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    secondsRemaining: state.timer.secondsRemaining,
    status: state.timer.status,
    minutes: state.preferences.minutes,
    isMuted: state.preferences.isMuted,
    notes: state.timer.notes,
    theme: state.preferences.theme,
  };
}

export default connect(mapStateToProps)(CountdownTimer);
