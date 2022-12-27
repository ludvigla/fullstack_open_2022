import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [visibleinfo, setVisibleInfo] = useState(false)

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
    addLike(blog.id)
  }

  const handleRemove = () => {
    removeBlog(blog.id)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisibleInfo(!visibleinfo)}>
        {visibleinfo ? 'hide' : 'view'}
      </button>
      {visibleinfo ? (
        <div>
          <p style={pStyle}>{blog.url}</p>
          <p style={pStyle}>
            likes {blog.likes} <button onClick={handleLikeChange}>like</button>
          </p>
          <p style={pStyle}>{blog.author}</p>
          {user.user === blogUserId ? (
            <div>
              <button onClick={handleRemove}>remove</button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

// 5.11: Blog list frontend, step11
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
