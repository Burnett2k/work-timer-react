const React = require('react');

class Timer extends React.Component {

	render() {
		return (
			<h2 id="timer" className='display-1'>{this.props.formattedTime}</h2>
		);	
	}
}

export default Timer;	