const React = require('react');
import PropTypes from 'prop-types';

class SessionCounter extends React.Component {
    static propTypes = {
        completed: PropTypes.string
    };

    render() {
        return (
            <div className="q-top-buffer">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.toggleChart}
                >
                    completed today:{' '}
                    <span className="badge badge-light">
                        {this.props.completed}
                    </span>
                </button>
            </div>
        );
    }
}

export default SessionCounter;
