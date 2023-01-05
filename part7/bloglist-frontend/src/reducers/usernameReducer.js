import { createSlice } from '@reduxjs/toolkit'

const usernameSlice = createSlice({
  name: 'username',
  initialState: '',
  reducers: {
    createUsername(state, action) {
      return action.payload
    },
  },
})

export const { createUsername } = usernameSlice.actions

export const setUsername = (content) => {
  return async (dispatch) => {
    dispatch(createUsername(content))
  }
}

export default usernameSlice.reducer
