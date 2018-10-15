import React from "react";
import Controls from "../components/Controls.js";
import Timer from "../components/Timer.js";
import SaveSessions from "./SaveSessions.js";
import { connect } from "react-redux";
import { saveSecondsRemaining } from "../actions";
import { saveStatus } from "../actions";

import timesUp from "../sounds/timesup.mp3";

const STARTED = "running";
const PAUSED = "paused";
const STOPPED = "stopped";
const START = "start";
const PAUSE = "pause";
const RESUME = "resume";
const TAB_TEXT = "Pomodoro Timer";

class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);

    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onTick = this.onTick.bind(this);
    this.onCompletion = this.onCompletion.bind(this);

    this.sound = new Audio(timesUp);

    this.interval = "";
    this.flashInterval = "";

    this.state = {
      formattedTime: "00:00",
      playPauseText: "start",
      sessionComplete: false
    };
  }

  componentDidMount() {
    this.props.dispatch(saveSecondsRemaining(this.props.minutes * 60));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.secondsRemaining !== this.props.secondsRemaining) {
      this.convertSecondsToTimer();
    }
    if (prevProps.minutes !== this.props.minutes) {
      this.onReset();
    }
    if (prevProps.playPause !== this.props.playPause) {
      this.onStart();
    }
    if (prevProps.reset !== this.props.reset) {
      this.onReset();
    }
    if (prevProps.stop !== this.props.stop) {
      this.onStop();
    }
  }

  onStart() {
    switch (this.props.status) {
      case STARTED:
        this.props.dispatch(saveStatus(PAUSED));
        this.setState({ playPauseText: RESUME });
        clearInterval(this.interval);
        clearInterval(this.flashInterval);
        break;
      case PAUSED:
        this.interval = setInterval(() => this.onTick(), 1000);
        this.props.dispatch(saveStatus(STARTED));
        this.setState({ playPauseText: PAUSE });
        break;
      case STOPPED:
        this.props.dispatch(saveSecondsRemaining(this.props.minutes * 60));
        this.interval = setInterval(() => this.onTick(), 1000);
        this.props.dispatch(saveStatus(STARTED));
        this.setState({ playPauseText: PAUSE });
        clearInterval(this.flashInterval);
        break;
      default:
        break;
    }
  }

  onStop() {
    this.props.dispatch(saveStatus(STOPPED));
    this.setState({ playPauseText: START });
    this.props.dispatch(saveSecondsRemaining(0));
    clearInterval(this.interval);
    clearInterval(this.flashInterval);
  }

  onReset() {
    this.props.dispatch(saveStatus(STOPPED));
    this.setState({ playPauseText: START });
    this.props.dispatch(saveSecondsRemaining(this.props.minutes * 60));
    clearInterval(this.interval);
    clearInterval(this.flashInterval);
  }

  onTick() {
    if (this.props.secondsRemaining === 0) {
      this.onStop();
      this.onCompletion();
    } else {
      this.props.dispatch(
        saveSecondsRemaining(this.props.secondsRemaining - 1)
      );
    }
  }

  onCompletion() {
    this.setState(prevState => ({
      sessionComplete: !prevState.sessionComplete
    }));
    this.flashTimesUp();
    this.playSound();
  }

  playSound() {
    if (!this.props.isMuted) {
      this.sound.currentTime = 0;
      this.sound.play();
    }
  }

  convertSecondsToTimer() {
    let hours = (this.props.secondsRemaining / 60) >> 0;
    let minutes = this.props.secondsRemaining % 60;
    let time = `${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    this.setState({ formattedTime: time });
    this.addTimeToTab(time);
  }

  addTimeToTab(time) {
    if (this.props.status === STARTED || this.props.status === PAUSED) {
      document.title = `${time} left!`;
    } else {
      document.title = "Pomodoro Timer";
    }
  }

  flashTimesUp() {
    this.props.dispatch(saveSecondsRemaining(-1));
    this.setState({ formattedTime: "TIMES UP!" });

    this.flashInterval = setInterval(() => {
      if (document.title === TAB_TEXT) {
        document.title = "Times Up!";
      } else {
        document.title = TAB_TEXT;
      }
    }, 1000);
  }

  render() {
    return (
      <div className="container text-center q-top-buffer">
        <h4>POMODORO TIMER</h4>
        <Timer formattedTime={this.state.formattedTime} />
        <Controls
          onStart={this.onStart}
          onStop={this.onStop}
          onReset={this.onReset}
          playPauseText={this.state.playPauseText}
        />
        <SaveSessions
          sessionComplete={this.state.sessionComplete}
          toggleChartVisible={this.props.toggleChartVisible}
        />
      </div>
    );
  }
}

//only passing in data needed by the children
function mapStateToProps(state) {
  return {
    secondsRemaining: state.timer.secondsRemaining,
    status: state.timer.status,
    minutes: state.preferences.minutes,
    isMuted: state.preferences.isMuted
  };
}

export default connect(mapStateToProps)(CountdownTimer);
