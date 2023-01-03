import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (id) => {
    const curAnecdote = props.anecdotes.find((a) => a.id === id)
    props.addVote(id, {...curAnecdote, votes: curAnecdote.votes + 1})
    props.setNotification(`You voted for '${curAnecdote.content}'`, 5, props.timer)
  }

  return (
    <>
      {[...props.anecdotes]
        .filter((anecdote) => anecdote.content.includes(props.filter))
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    timer: state.timer,
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
