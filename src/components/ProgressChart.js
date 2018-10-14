const React = require("react");
import utils from "../utils/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [];

class ProgressChart extends React.Component {
  constructor(props) {
    super(props);

    this.popSessionsIntoArray();
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

  render() {
    return (
      <React.Fragment>
        <p>progress chart!</p>
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
      </React.Fragment>
    );
  }
}

export default ProgressChart;
