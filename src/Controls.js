const React = require('react');

class Controls extends React.Component {

	render() {
		return (
			<div>
				<button id="start" className="btn btn-lg btn-primary col-md-2" type="button">Start</button>
				<button id="stop" className="btn btn-lg btn-primary col-md-2" type="button">Stop</button>
				<button id="reset" className="btn btn-lg btn-primary col-md-2" type="button">Reset</button>
			</div>
		);
	}
}

module.exports = Controls;	