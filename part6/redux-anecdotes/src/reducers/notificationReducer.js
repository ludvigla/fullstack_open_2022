import { createSlice } from "@reduxjs/toolkit"

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

export const setNotification = (content, seconds) => {
  return async dispatch => {
    dispatch(createNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds*1000)
  }
}

export default notificationSlice.reducer