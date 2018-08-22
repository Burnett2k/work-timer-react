import React from 'react';
import Controls from '../components/Controls.js';
import SessionCounter from '../components/SessionCounter.js';
import Timer from '../components/Timer.js';

class CountdownTimer extends React.Component {

	constructor(props) {

		super(props)

		this.onStart = this.onStart.bind(this);
		this.onStop = this.onStop.bind(this);
		this.onReset = this.onReset.bind(this);

	}

	onStart() {
		console.log("start");
	}
	onStop() {
		console.log("stop");
	}
	onReset() {
		console.log("reset");
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

export default CountdownTimer;          