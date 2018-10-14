const React = require("react");

class GoalInput extends React.Component {
  render() {
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          onChange={this.props.onGoalTyping}
          value={this.props.goalText}
          autoFocus
          placeholder="Enter your goal..."
        />
        <div className="input-group-append">
          <button
            type="button"
            className="btn btn-outline-success "
            onClick={this.props.toggleEditMode}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default GoalInput;
