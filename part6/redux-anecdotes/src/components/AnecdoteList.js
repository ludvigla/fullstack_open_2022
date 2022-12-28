import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'
import { useState } from 'react'

const AnecdoteList = (props) => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const [timeoutId, setTimeoutId] = useState(null)

  const vote = (id) => {
    dispatch(addVote(id))
    const curAnecdote = anecdotes.find((a) => a.id === id)
    dispatch(createNotification(`You voted for '${curAnecdote.content}'`))
    // Maybe not the best solution to mix in useState, 
    // but without it the timers would stack up and the
    // notifications would disappear a bit randomly when
    // voting for multiple anecdotes in a row.
    clearTimeout(timeoutId)
    let curTimeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
    setTimeoutId(curTimeoutId)
  }

  return (
    <>
      {[...anecdotes]
        .filter((anecdote) => anecdote.content.includes(filter))
        .sort(function (a, b) {
          return b.votes - a.votes
        })
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
