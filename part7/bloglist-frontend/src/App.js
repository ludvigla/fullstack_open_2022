import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Success from './components/Success'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
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
      setErrorMessage('Wrong user name or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const createBlog = (newBlog) => {
    const blogObject = {
      user: user.id,
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: 0,
    }
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(() => {
        setErrorMessage('invalid title, author or url')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  // Function to increment likes for a blog post
  const addLike = (id) => {
    const blog = blogs.find((n) => n.id === id)

    // Increment likes by 1 to the new object
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id === id ? returnedBlog : blog)))
      })
      .catch(() => {
        setErrorMessage(
          `Couldn't find '${blog.title}'. The blog post has been removed.`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
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
          setErrorMessage(
            `Couldn't find '${blog.title}'. The blog post has been removed.`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
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
          errorMessage={errorMessage}
        />
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification message={errorMessage} />
          <Success message={successMessage} />
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

export default App
