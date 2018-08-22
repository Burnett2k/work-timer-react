import React from 'react';
import Controls from '../components/Controls.js';
import SessionCounter from '../components/SessionCounter.js';
import Timer from '../components/Timer.js';

class CountdownTimer extends React.Component {

	render() {
	  	return (
			<div className="container text-center q-top-buffer">
      			<h4>POMODORO TIMER</h4>
				<Timer />
				<Controls />
				<SessionCounter />
		    </div>);
	}

}

export default CountdownTimer;          