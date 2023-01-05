import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }

  return (
    <div>
      <Alert severity={notification.class}>{notification.content}</Alert>
    </div>
  )
}

export default Notification
