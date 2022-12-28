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
    createAnecdote(state, action) {
      const newAnecdote = {
        content: action.payload,
        id: getId(),
        votes: 0
      }
      anecdoteService
        .create(newAnecdote)
      return [...state, newAnecdote]
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addVote, createAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer