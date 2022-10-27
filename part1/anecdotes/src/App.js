import { useState } from 'react'

const getRandomInt = (maxValue) => {
  return Math.floor(Math.random() * maxValue);
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  // Create an empty array for points
  const initial_points = new Array(anecdotes.length).fill(0);
  
  // Initiate states
  const [ points, setPoints] = useState(initial_points);
  const [ selected, setSelected ] = useState(0)

  const incrementPoints = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  const randomAnecdote = () => {
    setSelected(getRandomInt(anecdotes.length));
  };

  const placeVote = () => {
    incrementPoints();
  };

  return (
    <div>
      <button onClick={placeVote}>
        vote
      </button>
      <button onClick={randomAnecdote}>
        randomize anecdote
      </button>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        has {points[selected]} votes
      </div>
    </div>
  )
}

export default App;
