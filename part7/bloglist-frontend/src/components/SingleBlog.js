import { useSelector, useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { addLike } from '../reducers/blogReducer'

const SingleBlog = () => {
  // Obtain blogs state and match with selected id
  const blogs = useSelector((state) => state.blogs)
  //const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  // Return null if navigation to /blogs/:id happens before users have been fetched
  if (!blogs) {
    return null
  }

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find((blog) => {
        return blog.id === match.params.id
      })
    : null

  const pStyle = { margin: '0px' }

  const handleLikeChange = () => {
    dispatch(addLike(blog.id, blogs))
  }

  /* const handleRemove = () => {
    dispatch(removeBlog(blog.id, blogs))
  } */

  //const blogUserId = blog.user.id ? blog.user.id : blog.user

  return (
    <>
      {blog === undefined ? (
        <div>user not found</div>
      ) : (
        <div>
          <h2>
            {blog.title} by {blog.author}
          </h2>
          <a href={blog.url}>{blog.url}</a>
          <p style={pStyle}>
            {blog.likes} likes{' '}
            <button
              id='like-button'
              className='likebutton'
              onClick={handleLikeChange}
            >
              like
            </button>
          </p>
          <p style={pStyle}>added by {blog.user.name}</p>
          {/* {user.user === blogUserId ? (
            <div>
              <button id='remove-button' onClick={handleRemove}>
                remove
              </button>
            </div>
          ) : null} */}
          <h3>comments</h3>
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default SingleBlog
