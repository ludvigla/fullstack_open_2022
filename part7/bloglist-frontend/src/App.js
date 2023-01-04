import { useState, useEffect, useRef } from 'react'
import { PropTypes } from 'prop-types'
import { setNotification } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      props.setNotification({
        class: 'error',
        content: 'Wrong user name or password',
      })
    }
  }

  const createBlog = async (newBlog) => {
    const blogObject = {
      user: user.id,
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: 0,
    }
    blogFormRef.current.toggleVisibility()

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      props.setNotification({
        class: 'success',
        content: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      })
    } catch (exception) {
      props.setNotification({
        class: 'error',
        content: 'invalid title, author or url',
      })
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  // Function to increment likes for a blog post
  const addLike = async (id) => {
    const blog = blogs.find((n) => n.id === id)

    // Increment likes by 1 to the new object
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      const returnedBlog = await blogService.update(id, changedBlog)
      setBlogs(blogs.map((blog) => (blog.id === id ? returnedBlog : blog)))
    } catch (exception) {
      props.setNotification({
        class: 'error',
        content: `Couldn't find '${blog.title}'. The blog post has been removed.`,
      })
    }
  }

  // Function to remove blog posts
  const removeBlog = (id) => {
    const blog = blogs.find((n) => n.id === id)

    // Confirm if user wants to remove the blog post
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter((blog) => blog.id !== id))
        })
        .catch(() => {
          props.setNotification({
            class: 'error',
            content: `Couldn't find '${blog.title}'. The blog post has been removed.`,
          })
        })
    }
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
          <p>
            {user.name} logged in<button onClick={handleLogout}>logout</button>
          </p>

          <h2>create new blog</h2>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs
            .sort(function (a, b) {
              return b.likes - a.likes
            })
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                addLike={addLike}
                removeBlog={removeBlog}
                user={user}
              />
            ))}
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
