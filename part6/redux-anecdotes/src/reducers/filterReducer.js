import { createSlice } from '@reduxjs/toolkit'

var initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterValueChange(state, action) {
      return action.payload
    }
  }

})

export const { filterValueChange } = filterSlice.actions
export default filterSlice.reducer