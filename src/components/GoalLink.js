const React = require("react");

const goalStyles = {
  display: "inline-block",
  verticalAlign: "baseline"
};

const pointerStyle = {
  cursor: "pointer"
};

class GoalLink extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.goalText && this.props.goalText.length > 0 ? (
          <span style={pointerStyle} onClick={this.props.toggleEditMode}>
            <h1 className="display-2" style={goalStyles}>
              Goal: {this.props.goalText}
            </h1>{" "}
            <i class="fa fa-pencil" aria-hidden="true" />
          </span>
        ) : (
          <a href="# " onClick={this.props.toggleEditMode}>
            Want to set a goal?
          </a>
        )}
      </React.Fragment>
    );
  }
}

export default GoalLink;
