import PropTypes from 'prop-types';
const React = require('react');

class ProgressBar extends React.Component {
    static propTypes = {
        percent: PropTypes.number
    };

    render() {
        return (
            <div className="progress" style={{ marginTop: '30px' }}>
                <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    aria-valuenow={this.props.percent}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: `${this.props.percent}%` }}
                >
                    {this.props.percent}%
                </div>
            </div>
        );
    }
}

export default ProgressBar;
