import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'
import Blog from './Blog'
import PropTypes from 'prop-types'

const Blogs = ({ blogs }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {[...blogs]
            .sort(function (a, b) {
              return b.likes - a.likes
            })
            .map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Blog key={blog.id} blog={blog} />
                </TableCell>
                <TableCell>written by {blog.user.name}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
}

export default Blogs
