const React = require('react');

class Preferences extends React.Component {

	render() {
		return (
	        <div className="Container d-flex flex-row-reverse">
          		<button type='button' className="btn btn-outline-primary" 
          		data-toggle="modal" data-target="#settingsModal" id="preferences">
          			<i className="fa fa-wrench d-block d-md-none" aria-hidden="true"></i>
          			<span className="d-none d-md-block d-lg-block d-xl-block">Settings</span>
          		</button>
        	</div>
		);
	}
}

module.exports = Preferences;	