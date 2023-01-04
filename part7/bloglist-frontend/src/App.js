import { useState, useEffect, useRef } from 'react'
import { PropTypes } from 'prop-types'
import { setNotification } from './reducers/notificationReducer'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Menu from './components/Menu'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // State is now managed with Redux
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  // Blogs are now initialized with Redux
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

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
      setUsername('')
      setPassword('')
    } catch (exception) {
      props.setNotification({
        class: 'error',
        content: 'Wrong user name or password',
      })
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }

  return (
    <div>
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification />
          <Menu />
          <p>
            {user.name} logged in<button onClick={handleLogout}>logout</button>
          </p>
          <Routes>
            <Route
              path='/'
              element={
                <div>
                  <h2>create new blog</h2>
                  <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                    <BlogForm user={user} />
                  </Togglable>
                  {[...blogs]
                    .sort(function (a, b) {
                      return b.likes - a.likes
                    })
                    .map((blog) => (
                      <Blog key={blog.id} blog={blog} user={user} />
                    ))}
                </div>
              }
            />
            <Route path='/users' element={<Users />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

App.propTypes = {
  setNotification: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  setNotification,
}

const ConnectedApp = connect(null, mapDispatchToProps)(App)

export default ConnectedApp
