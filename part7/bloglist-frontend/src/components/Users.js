import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'

const Users = () => {
  const users = useSelector((state) => state.users)

  const dispatch = useDispatch()

  // Fetches users from the backend when the component is mounted
  useEffect(() => {
    dispatch(getUsers())
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
