import { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const [visibleinfo, setVisibleInfo] = useState(false)

  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  const blogUserId = blog.user.id ? blog.user.id : blog.user

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const pStyle = { margin: '0px' }

  const handleLikeChange = () => {
    dispatch(addLike(blog.id, blogs))
  }

  const handleRemove = () => {
    dispatch(removeBlog(blog.id, blogs))
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button
        id='view-button'
        className='viewbutton'
        onClick={() => setVisibleInfo(!visibleinfo)}
      >
        {visibleinfo ? 'hide' : 'view'}
      </button>
      {visibleinfo ? (
        <div className='extendedInfo'>
          <p style={pStyle}>{blog.url}</p>
          <p style={pStyle}>
            likes {blog.likes}{' '}
            <button
              id='like-button'
              className='likebutton'
              onClick={handleLikeChange}
            >
              like
            </button>
          </p>
          <p style={pStyle}>{blog.author}</p>
          {user.user === blogUserId ? (
            <div>
              <button id='remove-button' onClick={handleRemove}>
                remove
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog