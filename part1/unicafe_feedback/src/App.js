import { useState } from 'react'

// Define Display and Button components
// I realize I must've missunderstood the previous exercises as I have already 
// defined a Button component and a Display (StatisticLine) component. Anyways,
// here's my solution:
const StatisticsLine = ({ text, value }) => <div>{text + " " + value}</div>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

// Define Statistics component
const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <div>No feedback given</div>
    );
  } else {
    return (
      <div>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={good + neutral + bad} />
        <StatisticsLine text="average" value={(good - bad) / (good + neutral + bad)} />
        <StatisticsLine text="positive" value={(good / (good + neutral + bad)) * 100 + "%"} />
      </div>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button onClick={() => setBad(bad + 1)} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} /> 
    </div>
  )
}

export default App