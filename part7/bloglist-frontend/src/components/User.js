import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  // Obtain users state and match with selected id
  const users = useSelector((state) => state.users)

  // Return null if navigation to /users/:id happens before users have been fetched
  if (!users) {
    return null
  }

  const match = useMatch('/users/:id')
  const user = match
    ? users.find((user) => {
        return user.id === match.params.id
      })
    : null

  return (
    <>
      {user === undefined ? (
        <div>user not found</div>
      ) : (
        <div>
          <h2>{user.name}</h2>
          <h3>added blogs</h3>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default User
