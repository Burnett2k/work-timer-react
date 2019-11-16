import PropTypes from 'prop-types';

import './App.css';
const React = require('react');

class SessionList extends React.Component {
    static propTypes = {
        isLoaded: PropTypes.bool,
        items: PropTypes.array,
    };
    constructor(props) {
        super(props);
    }

    render() {
        const { isLoaded, items } = this.props;

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
                            {item.notes.text && item.notes.text.length > 0 && (
                                <p className="mb-1">Notes: {item.notes.text}</p>
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

export default SessionList;
