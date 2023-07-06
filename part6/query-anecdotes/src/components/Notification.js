// THe notification should take in the text it should display
import { createContext } from 'react'

const Notification = ({state, dispatch}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

	const hideNotification = () => {
		dispatch({type: "HIDE"})
	}
  
  if (state.visible === false) {
		return null
	} else {
		setTimeout(hideNotification, 5000)
	}

  return (
    <div style={style}>
      {state.content}
    </div>
  )
}

export default Notification

export const NotificationContext = createContext()