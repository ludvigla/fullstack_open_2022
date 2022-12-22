import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog }) => {
  const [visibleinfo, setVisibleInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const pStyle = { margin: "0px" }

  const handleLikeChange = (event) => {
    addLike(blog.id)
  }

  const handleRemove = (event) => {
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
          <div>
            <button onClick={handleRemove}>remove</button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Blog
