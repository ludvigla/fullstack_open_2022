import { useSelector } from 'react-redux'

const Success = () => {
  const errorMessage = useSelector((state) => state.errorMessage)

  if (errorMessage === null) {
    return null
  }

  return <div className='success'>{errorMessage}</div>
}

export default Success
