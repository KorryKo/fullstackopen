import { useState } from "react";

const StatisticLine = (props) => {
  const { text, value } = props;

  return (
    <p style={{ margin: 0 }}>
      {text} {value}
    </p>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  return (
    <div>
      <h1>statistics</h1>
      {good !== 0 || neutral !== 0 || bad !== 0 ? (
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <StatisticLine text={"good"} value={good} />
                </td>
              </tr>
              <tr>
                <td>
                  <StatisticLine text={"neutral"} value={neutral} />
                </td>
              </tr>
              <tr>
                <td>
                  <StatisticLine text={"bad"} value={bad} />
                </td>
              </tr>
              <tr>
                <td>
                  <StatisticLine text={"all"} value={all} />
                </td>
              </tr>
              <tr>
                <td>
                  <StatisticLine text={"average"} value={average} />
                </td>
              </tr>
              <tr>
                <td>
                  <StatisticLine text={"positive"} value={`${positive}%`} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>no feedback was given</p>
      )}
    </div>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
