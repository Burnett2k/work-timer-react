import PropTypes from 'prop-types';
const React = require('react');

class Controls extends React.Component {
    static propTypes = {
        onStart: PropTypes.func,
        playPauseText: PropTypes.func,
        onReset: PropTypes.func,
        onStop: PropTypes.func
    };

    render() {
        return (
            <div>
                <button
                    className="btn btn-lg btn-outline-primary col-md-2"
                    type="button"
                    onClick={this.props.onStart}
                >
                    {this.props.playPauseText}
                </button>
                &nbsp;
                <button
                    className="btn btn-lg btn-outline-danger col-md-2"
                    type="button"
                    onClick={this.props.onStop}
                >
                    stop
                </button>
                &nbsp;
                <button
                    className="btn btn-lg btn-outline-primary col-md-2"
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
