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
export default notificationSlice.reducer