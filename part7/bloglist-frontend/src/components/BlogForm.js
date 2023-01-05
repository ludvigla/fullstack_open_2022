import { useState } from 'react'
import PropTypes from 'prop-types'
import { createBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { TextField, Button } from '@mui/material'

const BlogForm = (props) => {
  const [newBlog, setNewBlog] = useState({
    user: props.user.name,
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
      user: props.user.name,
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label='title'
            name='title'
            value={newBlog.title}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <TextField
            label='author'
            name='author'
            value={newBlog.author}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <TextField
            label='url'
            name='url'
            value={newBlog.url}
            onChange={handleBlogChange}
          />
        </div>
        <Button
          id='create-blog-button'
          variant='contained'
          color='primary'
          type='submit'
        >
          create
        </Button>
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
