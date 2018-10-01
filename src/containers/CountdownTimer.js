import React from 'react';
import Controls from '../components/Controls.js';
import SessionCounter from '../components/SessionCounter.js';
import Timer from '../components/Timer.js';
import { connect } from 'react-redux';
import { saveSecondsRemaining } from '../actions';
import { saveStatus } from'../actions';

const STARTED = 'running';
const PAUSED = 'paused';
const STOPPED = 'stopped';

class CountdownTimer extends React.Component {

	constructor(props) {
		super(props)

		this.onStart = this.onStart.bind(this);
		this.onStop = this.onStop.bind(this);
		this.onReset = this.onReset.bind(this);
		this.onTick = this.onTick.bind(this);
		this.onCompletion = this.onCompletion.bind(this);

		this.interval = '';

		this.state = {
			formattedTime: '00:00'
		}

	}

	componentDidMount() {
		this.props.dispatch(saveSecondsRemaining(this.props.minutes * 60));
	}

	componentDidUpdate(prevProps) {
		if (prevProps.secondsRemaining !== this.props.secondsRemaining) {
			this.convertSecondsToTimer();
		}
		if (prevProps.minutes !== this.props.minutes) {
			this.props.dispatch(saveSecondsRemaining(this.props.minutes * 60));
			this.props.dispatch(saveStatus(STOPPED));
			clearInterval(this.interval);
		}
	}

	onStart() {
		if (this.props.status === STARTED) {
			this.props.dispatch(saveStatus(PAUSED));
		} else {
			this.props.dispatch(saveSecondsRemaining(this.props.minutes * 60));
			this.interval = setInterval(() => this.onTick(), 1000);
			this.props.dispatch(saveStatus(STARTED));
		}
	}

	onStop() {
		this.props.dispatch(saveStatus(STOPPED));
		this.props.dispatch(saveSecondsRemaining(0));
		clearInterval(this.interval);
	}

	onReset() {
		this.props.dispatch(saveStatus(STOPPED));
		this.props.dispatch(saveSecondsRemaining(this.props.minutes * 60));
		clearInterval(this.interval);
	}

	onTick() {
		this.props.dispatch(saveSecondsRemaining(this.props.secondsRemaining - 1));
	}

	onCompletion() {
		//todo save sessions completed
	}

	convertSecondsToTimer() {
		let hours = (this.props.secondsRemaining / 60)>>0;
		let minutes = (this.props.secondsRemaining % 60);

		this.setState({formattedTime: `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`});
	}

	render() {
	  	return (
			<div className="container text-center q-top-buffer">
      			<h4>POMODORO TIMER</h4>
				<Timer 
					formattedTime={this.state.formattedTime}/>
				<Controls 
					onStart = {this.onStart}
					onStop = {this.onStop}
					onReset = {this.onReset}
				/>
				<SessionCounter 
				//todo add sessions completed
				/>
			</div>);
	}
}

//only passing in data needed by the children
function mapStateToProps(state) {
	return {
		secondsRemaining: state.timer.secondsRemaining,
		status: state.timer.status,
		minutes: state.preferences.minutes
	};
}

export default connect(mapStateToProps)(CountdownTimer);          