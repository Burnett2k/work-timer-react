import { getSessions } from '../services/getSessions';
import { getSessionSummary } from '../services/getSessionSummary';
import SessionList from '../components/SessionList';
import PropTypes from 'prop-types';

import './App.css';
import SessionSummary from './SessionSummary';
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
      const indivdualSessions = await getSessions();
      const sessionSummary = await getSessionSummary();

      this.setState({
        isLoaded: true,
        items: indivdualSessions.sessions,
        summary: sessionSummary,
      });
    }
  }

  render() {
    const { error, isLoaded, items, summary } = this.state;
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
        <React.Fragment>
          <SessionSummary summary={summary} isLoaded={isLoaded} />
          <SessionList items={items} isLoaded={isLoaded} />
        </React.Fragment>
      );
    }
  }
}

export default HistoryGroup;
