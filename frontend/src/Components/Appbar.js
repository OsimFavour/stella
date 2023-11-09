import React, {useContext} from 'react'
import Axios from 'axios'
import MenuIcon from '@mui/icons-material/Menu'
import AdbIcon from '@mui/icons-material/Adb'
import { Link, useNavigate } from 'react-router-dom'

import StateContext from '../Contexts/StateContext'
import DispatchContext from '../Contexts/DispatchContext'

import { 
  AppBar, 
  Box, 
  Toolbar, 
  IconButton, 
  Typography, 
  Menu, 
  Container, 
  Avatar, 
  Button, 
  Tooltip, 
  MenuItem 
} from '@mui/material'

const pages = ['listings', 'agencies', 'add_property', 'login']
const settings = ['profile', 'account', 'dashboard', 'logout']

function ResponsiveAppBar() {
  const navigate = useNavigate()
  const GlobalState = useContext(StateContext)
  const GlobalDispatch = useContext(DispatchContext)

  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleProfile = () => {
    setAnchorElNav(null)
    navigate('/profile')
  }

  const handleLogout = async () => {
    setAnchorElNav(null)
    const confirmLogout = window.confirm('Are you sure you want to leave?')
    if (confirmLogout) {
        try {
            let url = 'http://localhost:8000/api-auth-djoser/token/logout'
            const response = await Axios.post(
                url,
                GlobalState.userToken,
                { headers: { Authorization : 'Token '.concat(GlobalState.userToken) } }
            )
            console.log(response)
            GlobalDispatch({type: 'logout'})
            navigate('/')
        }
        catch(e) {

            console.log(e.response)
        }
    }
  }
  

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            STELLA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >

              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    {page === 'Login' && GlobalState.userIsLogged ? (
                      // Render the user's username when the user is logged in and the page is "Login"
                      <Button key={page} onClick={() => navigate(`/${GlobalState.userUsername}`)}>
                        {GlobalState.userUsername}
                      </Button>
                    ) : (
                      // Render other pages normally
                      <Button key={page} onClick={() => navigate(`/${page}`)}>
                        {page}
                      </Button>
                    )}
                  </Typography>
                </MenuItem>
              ))}

              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}> */}
                  {/* <Typography textAlign="center">{page}</Typography> */}
                  {/* <Typography textAlign="center"><Button key={page} onClick={() => navigate(`/${page}`)}>{page}</Button></Typography> */}
                {/* </MenuItem> */}
              {/* ))} */}
            </Menu>
          </Box>

            {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: '#fff' }}>
                  {item}
                </Button>
              ))}
            </Box> */}
          
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            STELLA
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseNavMenu()
                  navigate(`/${page}`) 
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
              // <Button key={page} onClick={() => navigate(`/${page}`)}>{page}</Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : (setting === 'Profile' ? handleProfile : handleCloseUserMenu)}>
                {/* <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}> */}
                  <Typography textAlign="center"><Button key={setting} onClick={() => navigate(`/${setting}`)}>{setting}</Button></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar