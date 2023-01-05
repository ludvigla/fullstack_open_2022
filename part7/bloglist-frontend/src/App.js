import { useEffect, useRef } from 'react'
import { PropTypes } from 'prop-types'
import { setNotification } from './reducers/notificationReducer'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from '@mui/material'
import Home from './components/Home'
import Blogs from './components/Blogs'
import SingleBlog from './components/SingleBlog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Menu from './components/Menu'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
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

  return (
    <div>
      <Container>
        <div>
          <Menu />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/login'
              element={
                user === null ? <LoginForm /> : <Navigate replace to='/' />
              }
            />
            <Route
              path='/blogs'
              element={
                <div>
                  {user ? (
                    <div>
                      <h2>create a new blog post</h2>
                      <Togglable
                        buttonLabel='create new blog'
                        ref={blogFormRef}
                      >
                        <BlogForm user={user} />
                      </Togglable>
                    </div>
                  ) : null}
                  <Blogs blogs={blogs} />
                </div>
              }
            />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<User />} />
            <Route path='/blogs/:id' element={<SingleBlog />} />
          </Routes>
        </div>
      </Container>
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
