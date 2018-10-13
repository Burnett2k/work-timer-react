const React = require("react");

class GoalInput extends React.Component {
  render() {
    return (
      <React.Fragment>
        <label className="col-form-label">Enter your goal:</label>
        <input
          type="text"
          className="form-control"
          onChange={this.props.onGoalTyping}
          value={this.props.goalText}
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
