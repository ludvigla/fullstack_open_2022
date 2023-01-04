import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
    },
  },
})

export const { appendBlog, setBlogs, updateBlog } = blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      console.log('returnedBlog', returnedBlog)
      setNotification({
        class: 'success',
        content: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      })
      dispatch(appendBlog(returnedBlog))
    } catch (exception) {
      setNotification({
        class: 'error',
        content: 'invalid title, author or url',
      })
    }
  }
}

export const addLike = (id, blogs) => {
  return async (dispatch) => {
    const blog = blogs.find((n) => n.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      await blogService.update(id, updatedBlog)
      dispatch(updateBlog(updatedBlog))
    } catch (exception) {
      setNotification({
        class: 'error',
        content: `Couldn't find '${blog.title}'. The blog post has been removed.`,
      })
    }
  }
}

export const removeBlog = (id, blogs) => {
  return async (dispatch) => {
    const blog = blogs.find((n) => n.id === id)

    // Confirm if user wants to remove the blog post
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(id)
        dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)))
      } catch (exception) {
        setNotification({
          class: 'error',
          content: `Couldn't find '${blog.title}'. The blog post has been removed.`,
        })
      }
    }
  }
}

export default blogsSlice.reducer
