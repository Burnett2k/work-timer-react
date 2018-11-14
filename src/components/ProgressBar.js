const React = require('react');

class ProgressBar extends React.Component {
    render() {
        return (
            <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: '75%' }}
            />
        );
    }
}

export default ProgressBar;
