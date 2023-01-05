import Notification from './Notification'
import { TextField, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { setUsername } from '../reducers/usernameReducer'
import { setPassword } from '../reducers/passwordReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = () => {
  const username = useSelector((state) => state.username)
  const password = useSelector((state) => state.password)

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setUsername(''))
      dispatch(setPassword(''))
      dispatch(
        setNotification({
          class: 'success',
          content: `Welcome back, ${user.name}!`,
        })
      )
    } catch (exception) {
      dispatch(
        setNotification({
          class: 'error',
          content: 'Wrong user name or password',
        })
      )
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <Notification />

      <form onSubmit={handleLogin} id='login-form'>
        <div>
          <TextField
            label='username'
            type='text'
            value={username}
            onChange={({ target }) => dispatch(setUsername(target.value))}
          />
        </div>
        <div>
          <TextField
            label='password'
            type='password'
            value={password}
            onChange={({ target }) => dispatch(setPassword(target.value))}
          />
        </div>
        <Button
          id='login-button'
          variant='contained'
          color='primary'
          type='submit'
        >
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
