import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
  }

  return (
    <>
      {anecdotes
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
