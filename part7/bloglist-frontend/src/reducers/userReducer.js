import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    createUser(state, action) {
      return action.payload
    },
  },
})

export const { createUser } = userSlice.actions

export const setUser = (content) => {
  return async (dispatch) => {
    dispatch(createUser(content))
  }
}

export default userSlice.reducer
