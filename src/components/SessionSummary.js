import PropTypes from 'prop-types';

import './App.css';
const React = require('react');

class SessionSummary extends React.Component {
  static propTypes = {
    summary: PropTypes.array,
    isLoaded: PropTypes.bool,
  };
  constructor(props) {
    super(props);
  }

  render() {
    const { summary, isLoaded } = this.props;
    const totalTimeMinutes = (item) => {
      return (item.totalSeconds / 60).toFixed(0);
    };
    return (
      <React.Fragment>
        Weekly Summary:
        <ul
          className="list-group q-top-buffer"
          style={{
            overflowX: 'hidden',
            overflowY: 'scroll',
            maxHeight: '300px',
            marginTop: '5px',
          }}
        >
          {isLoaded === true &&
            summary &&
            summary.map((item, key) => (
              <div key={key} className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Week {item._id.week} </h5>
                  <small>
                    {new Date(item.minDate).toLocaleDateString()} -
                    {new Date(item.maxDate).toLocaleDateString()}
                  </small>
                </div>
                <div className="d-flex w-100 justify-content-between">
                  <small>
                    Total Time: {totalTimeMinutes(item)}{' '}
                    {totalTimeMinutes(item) === '1' ? 'minute' : 'minutes'}
                  </small>
                  <small>Total Sessions: {item.totalSessions}</small>
                </div>
              </div>
            ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default SessionSummary;
