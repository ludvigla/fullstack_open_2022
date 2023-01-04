import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleBlogChange = (event) => {
    const value = event.target.value
    setNewBlog({
      ...newBlog,
      [event.target.name]: value,
    })
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor='title-input'>title:</label>
          <input
            id='title-input'
            type='text'
            name='title'
            value={newBlog.title}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <label htmlFor='author-input'>author:</label>
          <input
            id='author-input'
            type='text'
            name='author'
            value={newBlog.author}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <label htmlFor='url-input'>url:</label>
          <input
            id='url-input'
            type='text'
            name='url'
            value={newBlog.url}
            onChange={handleBlogChange}
          />
        </div>
        <button id='submit-post' type='submit'>
          create
        </button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
