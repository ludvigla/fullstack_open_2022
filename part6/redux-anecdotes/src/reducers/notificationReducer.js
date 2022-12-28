import { createSlice } from "@reduxjs/toolkit"

const initialState = 'Notification message'

const notificationSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
  },
})
  
export default notificationSlice.reducer