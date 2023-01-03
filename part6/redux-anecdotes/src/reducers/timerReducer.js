import { createSlice } from "@reduxjs/toolkit"

const timerSlice = createSlice({
  name: 'timer',
  initialState: null,
  reducers: {
    createTimer(state, action) {
      return action.payload
    },
  },
})
  
export const { createTimer } = timerSlice.actions
export default timerSlice.reducer