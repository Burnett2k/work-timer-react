const React = require('react');

class SessionCounter extends React.Component {

	render() {
		return (
			<div className='top-buffer'>
				<h4>sessions finished today: 
					<span className="badge badge-primary" id="sessionsCompleted">0</span>
				</h4>
			</div>
		);
	}
}

module.exports = SessionCounter;	