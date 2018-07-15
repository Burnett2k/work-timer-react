const React = require('react');

class Footer extends React.Component {

	render() {
		return (
			<footer className="fixed-bottom text-center bg-dark text-light">
				<div className="containter"> Created by Sawyer Burnett
					<br/>
					<a href="http://github.com/burnett2k" target="_blank">GitHub</a>
					<br/>
					<a href="http://linkedin.com/in/sawyer-burnett-9176411b" target="_blank">LinkedIn</a>
				</div>
			</footer>
		);
	}
}

module.exports = Footer;	