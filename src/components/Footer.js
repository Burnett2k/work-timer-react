const React = require('react');

class Footer extends React.Component {

	render() {
		return (
			<footer className="footer text-center bg-dark text-light">
				<div className="container"> Created by Sawyer Burnett
					<br/>
					<a href="http://github.com/burnett2k" target="_blank" rel="noopener noreferrer">GitHub</a>
					<br/>
					<a href="http://linkedin.com/in/sawyer-burnett-9176411b" target="_blank" rel="noopener noreferrer">LinkedIn</a>
				</div>
			</footer>
		);
	}
}

export default Footer;	