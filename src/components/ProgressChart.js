import utils from "../utils/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
const React = require("react");
const styles = {
  width: "90%",
  height: 400
};
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
        {this.props.isChartVisible ? (
          <div style={styles}>
            <ResponsiveContainer height="90%">
              <BarChart
                height={400}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis legendType="square" dataKey="date" />
                <YAxis type="number" interval={0} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="sessionsCompleted"
                  name="Sessions Completed"
                  fill="#007bff"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default ProgressChart;
