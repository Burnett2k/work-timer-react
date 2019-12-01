import PropTypes from 'prop-types';

import './App.css';
const React = require('react');

class SessionSummary extends React.Component {
    static propTypes = {
        summary: PropTypes.object,
        isLoaded: PropTypes.bool,
    };
    constructor(props) {
        super(props);
    }

    render() {
        const { summary, isLoaded } = this.props;
        return (
            <ul className="list-group q-top-buffer">
                Weekly Summary:
                {isLoaded === true &&
                    summary &&
                    summary.map((item, key) => (
                        <div
                            key={key}
                            className="list-group-item list-group-item-action"
                        >
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Week {item._id} </h5>
                                <small>
                                    {new Date(
                                        item.minDate
                                    ).toLocaleDateString()}{' '}
                                    -
                                    {new Date(
                                        item.maxDate
                                    ).toLocaleDateString()}
                                </small>
                            </div>
                            <div className="d-flex w-100 justify-content-between">
                                <small>
                                    Total Time:{' '}
                                    {(item.totalSeconds / 60).toFixed(1)}{' '}
                                    minute(s)
                                </small>
                                <small>
                                    Total Sessions: {item.totalSessions}
                                </small>
                            </div>
                        </div>
                    ))}
            </ul>
        );
    }
}

export default SessionSummary;