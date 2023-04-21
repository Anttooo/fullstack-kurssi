import { createSlice } from '@reduxjs/toolkit'

var initialState = ""

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const { showNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer