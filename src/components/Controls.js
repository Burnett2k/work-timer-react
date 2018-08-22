const React = require('react');

class Controls extends React.Component {

	render() {
		return (
			<div>
				<button className="btn btn-lg btn-primary col-md-2" type="button" onClick={this.props.onStart}>start</button>&nbsp; 
				<button className="btn btn-lg btn-primary col-md-2" type="button" onClick={this.props.onStop}>stop</button>&nbsp;
				<button className="btn btn-lg btn-primary col-md-2" type="button" onClick={this.props.onReset}>reset</button>
			</div>
		);
	}
}

export default Controls;	
