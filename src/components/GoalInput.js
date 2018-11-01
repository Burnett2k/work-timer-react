const React = require("react");
import PropTypes from "prop-types";

class GoalInput extends React.Component {
  constructor(props) {
    super(props);
    this.keyPressed = this.keyPressed.bind(this);
  }

  static propTypes = {
    onGoalTyping: PropTypes.func
  }

  componentDidMount() {
    document.addEventListener("keyup", this.keyPressed, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.keyPressed, false);
  }

  keyPressed(event) {
    let key = event.keyCode || event.which;
    if (key === 13) {
      this.props.toggleEditMode();
    }
  }

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
