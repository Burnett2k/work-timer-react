const React = require("react");

const goalStyles = {
  display: "inline-block",
  verticalAlign: "baseline",
  textAlign: "center",
  paddingRight: "40px"
};

const pointerStyle = {
  cursor: "pointer"
};

class GoalLink extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.goalText && this.props.goalText.length > 0 ? (
          <span>
            <h1 className="display-2" style={goalStyles}>
              Goal: {this.props.goalText}
            </h1>

            <i
              className="fa fa-lg fa-pencil-square-o"
              title="edit"
              onClick={this.props.toggleEditMode}
              style={pointerStyle}
            />
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
