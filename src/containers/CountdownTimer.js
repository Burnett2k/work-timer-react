import React from 'react';
import Controls from '../components/Controls.js';
import SessionCounter from '../components/SessionCounter.js';
import Timer from '../components/Timer.js';
import { connect } from 'react-redux';
import { saveSecondsRemaining } from '../actions';
import { saveStatus } from'../actions';

class CountdownTimer extends React.Component {

	constructor(props) {
		super(props)

		this.onStart = this.onStart.bind(this);
		this.onStop = this.onStop.bind(this);
		this.onReset = this.onReset.bind(this);
		this.onTick = this.onTick.bind(this);
		this.onCompletion = this.onCompletion.bind(this);
	}

	onStart() {
		this.props.dispatch(saveSecondsRemaining(100));
		this.props.dispatch(saveStatus(true));

		console.log("start");
	}
	onStop() {
		console.log("stop");
	}
	onReset() {
		console.log("reset");
	}
	onTick() {

	}
	onCompletion() {

	}



	render() {
	  	return (
			<div className="container text-center q-top-buffer">
      			<h4>POMODORO TIMER</h4>
				<Timer />
				<Controls 
					onStart = {this.onStart}
					onStop = {this.onStop}
					onReset = {this.onReset}
				/>
				<SessionCounter />
		    </div>);
	}

}

//only passing in data needed by the children
function mapStateToProps(state) {
	return {
		timer: state.timer
	};
}

export default connect(mapStateToProps)(CountdownTimer);          