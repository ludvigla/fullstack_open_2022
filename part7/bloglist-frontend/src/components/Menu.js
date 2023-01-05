import { Link } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'

const Menu = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }

  const user = useSelector((state) => state.user)

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu'></IconButton>
        <Button color='inherit' component={Link} to='/'>
          home
        </Button>
        <Button color='inherit' component={Link} to='/blogs'>
          blogs
        </Button>
        <Button color='inherit' component={Link} to='/users'>
          users
        </Button>
        {user === null ? (
          <Button color='inherit' component={Link} to='/login'>
            log in
          </Button>
        ) : (
          <Button color='inherit' onClick={handleLogout}>
            log out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Menu
