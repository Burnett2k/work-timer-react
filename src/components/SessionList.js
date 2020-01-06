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
            <React.Fragment>
                Pomodoros completed:
                <ul
                    className="list-group q-top-buffer"
                    style={{
                        overflow: 'scroll',
                        maxHeight: '500px',
                        marginTop: '5px',
                    }}
                >
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
                                <p className="mb-1">
                                    Notes:{' '}
                                    {item.notes.text &&
                                    item.notes.text.length > 0
                                        ? item.notes.text
                                        : 'N/A'}
                                </p>

                                <small>
                                    Total Time:{' '}
                                    {(item.secondsElapsed / 60).toFixed(1)}{' '}
                                    minute(s)
                                </small>
                            </div>
                        ))}
                </ul>
            </React.Fragment>
        );
    }
}

export default SessionList;
