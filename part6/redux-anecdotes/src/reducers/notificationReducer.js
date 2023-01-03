import { createSlice } from "@reduxjs/toolkit"
import { createTimer } from "./timerReducer"

const initialState = null

const notificationSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return null
    },
  },
})
  
export const { createNotification, removeNotification } = notificationSlice.actions

export const setNotification = (content, seconds, timer) => {
  return async dispatch => {
    clearTimeout(timer)
    dispatch(createNotification(content))
    const timerId = setTimeout(() => {
      dispatch(removeNotification())
    }, seconds*1000)
    // I thought it was easiest to store the timerId in the store
    // and then clear it in the next dispatch. So I created a timerReducer
    // and a createTimer action to be able to acccess the timerId in the store.
    dispatch(createTimer(timerId))
  }
}

export default notificationSlice.reducer