import PropTypes from 'prop-types';
const React = require('react');

class Timer extends React.Component {
  static propTypes = {
    formattedTime: PropTypes.string,
  };
  render() {
    return (
      <h2 id="timer" className="display-4 neon-text">
        {this.props.formattedTime}
      </h2>
    );
  }
}

export default Timer;
