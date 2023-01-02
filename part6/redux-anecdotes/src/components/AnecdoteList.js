import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    const curAnecdote = anecdotes.find((a) => a.id === id)
    dispatch(addVote(id, {...curAnecdote, votes: curAnecdote.votes + 1}))
    dispatch(setNotification(`You voted for '${curAnecdote.content}'`, 5))
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
