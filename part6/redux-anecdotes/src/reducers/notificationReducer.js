import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from "react-redux"

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

export const setNotification = (content, delay) => {
	return dispatch => {
		dispatch(showNotification(`You voted for: "${content}"`))
		setTimeout(function() {
			dispatch(removeNotification())
		}, delay * 1000)

	}
}

export default notificationSlice.reducer