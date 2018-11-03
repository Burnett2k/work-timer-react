const React = require('react');
import PropTypes from 'prop-types';

class Timer extends React.Component {
    static propTypes = {
        formattedTime: PropTypes.string
    };
    render() {
        return (
            <h2 id="timer" className="display-1">
                {this.props.formattedTime}
            </h2>
        );
    }
}

export default Timer;
