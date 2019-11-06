import { getSessions } from '../services/getSessions';
import PropTypes from 'prop-types';

import './App.css';
const React = require('react');

class HistoryGroup extends React.Component {
    static propTypes = {
        authenticated: PropTypes.bool,
    };
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        };
    }

    async componentDidMount() {
        if (this.props.authenticated) {
            const json = await getSessions();
            this.setState({ isLoaded: true, items: json.sessions });
        }
    }

    render() {
        const { error, isLoaded, items } = this.state;
        const { authenticated } = this.props;
        if (!authenticated) {
            return <h5>Please sign in to see history</h5>;
        } else if (error) {
            return <div> ERROR</div>;
        } else if (!isLoaded) {
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            );
        } else {
            return (
                <ul className="list-group q-top-buffer">
                    {isLoaded === true &&
                        items &&
                        items.map((item, key) => (
                            <div
                                key={key}
                                className="list-group-item list-group-item-action"
                            >
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">
                                        Pomodoro {items.length - key}{' '}
                                    </h5>
                                    <small>
                                        {new Date(item.date).toLocaleString()}
                                    </small>
                                </div>
                                {item.notes.text &&
                                    item.notes.text.length > 0 && (
                                        <p className="mb-1">
                                            Notes: {item.notes.text}
                                        </p>
                                    )}
                                <small>
                                    Total Time:{' '}
                                    {(item.secondsElapsed / 60).toFixed(1)}{' '}
                                    minute(s)
                                </small>
                            </div>
                        ))}
                </ul>
            );
        }
    }
}

export default HistoryGroup;
