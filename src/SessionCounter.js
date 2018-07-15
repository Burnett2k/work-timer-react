const React = require('react');

class SessionCounter extends React.Component {

	render() {
		return (
			<h4>sessions finished today: 
				<span className="badge badge-primary" id="sessionsCompleted">0</span>
			</h4>
		);
	}
}

module.exports = SessionCounter;	