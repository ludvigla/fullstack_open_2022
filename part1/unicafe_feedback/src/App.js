import { useState } from 'react'

const Display = ({ text, counter }) => <div>{text + " " + counter}</div>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      <Display text = "good" counter={good} />
      <Display text = "neutral" counter={neutral} />
      <Display text = "bad" counter={bad} />
    </div>
  )
}

export default App