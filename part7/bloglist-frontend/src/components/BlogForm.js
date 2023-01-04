import { useState } from 'react'
import PropTypes from 'prop-types'
import { createBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'

const BlogForm = (props) => {
  const [newBlog, setNewBlog] = useState({
    user: props.user.user,
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
    props.createBlog(newBlog)
    setNewBlog({
      user: props.user.user,
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
  user: PropTypes.object.isRequired,
  createBlog: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  createBlog,
}

const ConnectedBlogForm = connect(null, mapDispatchToProps)(BlogForm)

export default ConnectedBlogForm
