const React = require("react");

class SessionCounter extends React.Component {
  render() {
    return (
      <div className="q-top-buffer">
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.toggleChart}
        >
          completed today:{" "}
          <span className="badge badge-light">{this.props.completed}</span>
        </button>
      </div>
    );
  }
}

export default SessionCounter;
