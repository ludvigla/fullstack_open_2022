import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material'
import { withStyles } from '@mui/styles'

const CustomTableHead = withStyles(() => ({
  root: {
    backgroundColor: 'lightgrey',
  },
}))(TableHead)

const TableHeaderCell = withStyles(() => ({
  root: {
    color: 'black',
  },
}))(TableCell)

const Users = () => {
  const users = useSelector((state) => state.users)

  const dispatch = useDispatch()

  // Fetches users from the backend when the component is mounted
  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const cellTextStyle = {
    fontSize: '1.1em',
    margin: '0px',
  }

  const cellHeaderStyle = {
    fontSize: '1.3em',
    margin: '0px',
  }

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <CustomTableHead>
            <TableRow>
              <TableHeaderCell>
                <p style={cellHeaderStyle}>username</p>
              </TableHeaderCell>
              <TableHeaderCell>
                <p style={cellHeaderStyle}>blogs created</p>
              </TableHeaderCell>
            </TableRow>
          </CustomTableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link to={`/users/${user.id}`} style={cellTextStyle}>
                      {user.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <p style={cellTextStyle}>{user.blogs.length}</p>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users
