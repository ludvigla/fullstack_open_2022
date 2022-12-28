import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    createFilter(state, action) {
      return action.payload
    },
    removeFilter(state, action) {
      return ''
    },
  },
})
  
export const { createFilter, removeFilter } = filterSlice.actions
export default filterSlice.reducer