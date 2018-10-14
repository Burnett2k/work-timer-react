const React = require("react");

class GoalInput extends React.Component {
  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          className="form-control"
          onChange={this.props.onGoalTyping}
          value={this.props.goalText}
          autoFocus
          placeholder="Enter your goal..."
        />
        <button
          type="submit"
          className="btn btn-success"
          onClick={this.props.toggleEditMode}
        >
          Save
        </button>
      </React.Fragment>
    );
  }
}

export default GoalInput;
