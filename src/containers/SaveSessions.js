import React from "react";
import { connect } from "react-redux";
import { saveSessionsCompleted } from "../actions";
import SessionCounter from "../components/SessionCounter";
import utils from "../utils/utils";

class SaveSessions extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.sessionComplete !== this.props.sessionComplete) {
      this.saveSessionsCompleted(true);
    }
  }

  componentDidMount() {
    this.saveSessionsCompleted(false);
  }

  saveSessionsCompleted(increment) {
    const today = utils.getFormattedDate();
    let completed =
      localStorage.getItem(today) != null
        ? parseInt(localStorage.getItem(today), 10)
        : 0;
    completed = increment ? completed + 1 : completed;
    this.props.dispatch(saveSessionsCompleted(completed));
    localStorage.setItem(today, completed);
  }

  getSessionsCompleted() {
    const today = utils.getFormattedDate();
    return localStorage.getItem(today) != null
      ? parseInt(localStorage.getItem(today), 10)
      : 0;
  }

  render() {
    return (
      <div>
        <SessionCounter completed={this.props.completed} />
      </div>
    );
  }
}

//only passing in data needed by the children
function mapStateToProps(state) {
  return {
    completed: state.sessions.completed
  };
}

//use connect method to make application aware of the redux store
//doing so makes this a 'smart' component. i.e. a container
export default connect(mapStateToProps)(SaveSessions);
