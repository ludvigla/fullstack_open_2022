import { createSlice } from '@reduxjs/toolkit'

const passwordSlice = createSlice({
  name: 'password',
  initialState: '',
  reducers: {
    createPassword(state, action) {
      return action.payload
    },
  },
})

export const { createPassword } = passwordSlice.actions

export const setPassword = (content) => {
  return async (dispatch) => {
    dispatch(createPassword(content))
  }
}

export default passwordSlice.reducer
