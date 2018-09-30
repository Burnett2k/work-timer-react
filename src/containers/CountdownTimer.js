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
		this.convertSecondsToTimer();
	}

	onReset() {
		this.props.dispatch(saveStatus(STOPPED));
		clearInterval(this.interval);
		this.props.dispatch(saveSecondsRemaining(this.props.minutes * 60));
		this.convertSecondsToTimer();
	}

	onTick() {
		this.props.dispatch(saveSecondsRemaining(this.props.secondsRemaining - 1));
		this.convertSecondsToTimer();
	}

	onCompletion() {
		//todo save sessions completed
	}

	convertSecondsToTimer() {
		let hours = (this.props.secondsRemaining / 60)>>0;
		let minutes = (this.props.secondsRemaining % 60);
		this.setState({formattedTime: `${hours}:${minutes}`});
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