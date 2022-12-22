import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visibleinfo, setVisibleInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisibleInfo(!visibleinfo)}>
        {visibleinfo ? 'hide' : 'view'}
      </button>
      {visibleinfo ? (
        <div>
          <p style={{ margin: "0px" }}>{blog.url}</p>
          <p style={{ margin: "0px" }}>
            likes {blog.likes} <button>like</button>
          </p>
          <p style={{ margin: "0px" }}>{blog.author}</p>
        </div>
      ) : null}
    </div>
  )
}

export default Blog
