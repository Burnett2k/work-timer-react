import PropTypes from 'prop-types';
const React = require('react');

class Controls extends React.Component {
    static propTypes = {
        onStart: PropTypes.func,
        playPauseText: PropTypes.string,
        onReset: PropTypes.func,
        onStop: PropTypes.func,
    };

    render() {
        return (
            <div>
                <button
                    className="btn btn-lg btn-success"
                    type="button"
                    onClick={this.props.onStart}
                >
                    {this.props.playPauseText}
                </button>
                &nbsp;
                <button
                    className="btn btn-lg btn-danger"
                    type="button"
                    onClick={this.props.onStop}
                >
                    stop
                </button>
                &nbsp;
                <button
                    className="btn btn-lg btn-primary"
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
