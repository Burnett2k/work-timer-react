const React = require('react');

class Controls extends React.Component {

	render() {
		return (
			<div>
				<button id="start" className="btn btn-lg btn-primary col-md-2" type="button">start</button>&nbsp; 
				<button id="stop" className="btn btn-lg btn-primary col-md-2" type="button">stop</button>&nbsp;
				<button id="reset" className="btn btn-lg btn-primary col-md-2" type="button">reset</button>
			</div>
		);
	}
}

module.exports = Controls;	