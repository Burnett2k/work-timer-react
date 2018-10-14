import React from "react";
import GoalLink from "../components/GoalLink";
import GoalInput from "../components/GoalInput";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import utils from "../utils/formattedDate";

const data = [];

class SaveGoals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goalText: ""
    };

    this.popSessionsIntoArray();
    this.onGoalTyping = this.onGoalTyping.bind(this);
  }

  popSessionsIntoArray() {
    var d = new Date();
    //set date to 7 days ago
    d.setDate(d.getDate() - 6);

    //loop through 7 times to get up to today
    for (var i = 0; i < 7; i++) {
      //get localstorage date

      let date = utils.getFormattedDate(d);
      //get localstorage # of sessions completed for that day
      let sessionsCompleted = utils.getSessionsCompleted(date);
      data.push({ date, sessionsCompleted });
      d.setDate(d.getDate() + 1);
    }
  }

  onGoalTyping(e) {
    this.setState({
      goalText: e.target.value
    });
  }

  render() {
    return (
      <div className="form-inline justify-content-center q-top-buffer">
        {this.props.isEditMode ? (
          <GoalInput
            toggleEditMode={this.props.toggleEditMode}
            onGoalTyping={this.onGoalTyping}
            goalText={this.state.goalText}
          />
        ) : (
          <GoalLink
            toggleEditMode={this.props.toggleEditMode}
            onGoalEdit={this.props.onGoalEdit}
            goalText={this.state.goalText}
          />
        )}
        <br />
        <BarChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sessionsCompleted" fill="#007bff" />
        </BarChart>
      </div>
    );
  }
}

export default SaveGoals;
