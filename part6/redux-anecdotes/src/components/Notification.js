import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => {
    if ( state.notification ) {
      return state.notification
    }
    return null
  })
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification) {
    return (
      <div style={style}>
        <p>{notification}</p>
      </div>
    )
  } else {
    return ('')
  }
}

export default Notification