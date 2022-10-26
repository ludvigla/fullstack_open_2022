import { useState } from 'react'

// Define Display and Button components
const Display = ({ text, counter }) => <div>{text + " " + counter}</div>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

// Define Statistics component
// Not sure if the task is to assemble all statistics into one Statistics component or 
// if the Statistics component should be the same as Display component that I used in 
// the previous exercise. Going for the first option...
const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <Display text = "good" counter={good} />
      <Display text = "neutral" counter={neutral} />
      <Display text = "bad" counter={bad} />
      <Display text = "all" counter={good + neutral + bad} />
      <Display text = "average" counter={(good - bad)/(good + neutral + bad)} />
      <Display text = "positive" counter={good/(good + neutral + bad) * 100 + "%"} />
    </div>
  )
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