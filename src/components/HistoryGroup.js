import { getSessions } from '../services/getSessions';

import './App.css';
const React = require('react');

class HistoryGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        };
    }

    async componentDidMount() {
        const json = await getSessions();
        console.log(JSON.stringify(json));
        this.setState({ isLoaded: true, items: json.sessions });
    }
    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div> ERROR</div>;
        } else if (!isLoaded) {
            return <div>Loading</div>;
        } else {
            return (
                <div className="list-group">
                    <ul className="list-group">
                        {isLoaded === true &&
                            items &&
                            items.map((item, key) => (
                                <div
                                    key={key}
                                    className="list-group-item list-group-item-action"
                                >
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">
                                            Pomodoro {key}{' '}
                                        </h5>
                                        <small>{item.date}</small>
                                    </div>
                                    {item.notes.text &&
                                        item.notes.text.length > 0 && (
                                            <p className="mb-1">
                                                Notes: {item.notes.text}
                                            </p>
                                        )}
                                    <small>
                                        Total Time: {item.notes.secondsElapsed}
                                    </small>
                                </div>
                            ))}
                    </ul>
                </div>
            );
        }
    }
}

export default HistoryGroup;
