const React = require("react");

const styles = {
  display: "inline-block",
  verticalAlign: "baseline"
};

class GoalLink extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.goalText && this.props.goalText.length > 0 ? (
          <span>
            <h4 style={styles}>Goal: {this.props.goalText}</h4>{" "}
            <a style={styles} href="# " onClick={this.props.toggleEditMode}>
              {" "}
              edit
            </a>
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
