import PropTypes from 'prop-types';
const React = require('react');

class Controls extends React.Component {
  static propTypes = {
    onStart: PropTypes.func,
    playPauseText: PropTypes.string,
    onReset: PropTypes.func,
    onStop: PropTypes.func,
    theme: PropTypes.string,
  };

  render() {
    return (
      <div>
        <button
          className={`btn m-1 ${
            this.props.theme === 'light' ? 'btn-success' : 'btn-outline-success'
          }`}
          type="button"
          onClick={this.props.onStart}
        >
          {this.props.playPauseText}
        </button>
        <button
          className={`btn m-1 ${
            this.props.theme === 'light' ? 'btn-danger' : 'btn-outline-danger'
          }`}
          type="button"
          onClick={this.props.onStop}
        >
          stop
        </button>
        <button
          className={`btn m-1 ${
            this.props.theme === 'light' ? 'btn-primary' : 'btn-outline-primary'
          }`}
          type="button"
          onClick={this.props.onReset}
        >
          reset
        </button>
      </div>
    );
  }
}

export default Controls;
