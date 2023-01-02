import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      return state.map((anecdote) => {
        if (anecdote.id === action.payload) {
          return { ...anecdote, votes: anecdote.votes + 1 }
        }
        return anecdote
      })
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = {
      content: content,
      id: getId(),
      votes: 0
    }
    const returnedAnecdote = await anecdoteService.create(newAnecdote)
    dispatch(appendAnecdote(returnedAnecdote))
  }
}

export default anecdoteSlice.reducer