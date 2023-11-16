import React, {useContext, useEffect, useState} from 'react'
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
  MenuItem,
  Snackbar
} from '@mui/material'


function Navbar() {
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

  const [openSnack, setOpenSnack] = useState(false)

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
        setOpenSnack(true)
        // navigate('/')
      }
      catch(e) {

          console.log(e.response)
      }
    }
  }

  // CREATE A NEW USE EFFECT TO WATCH FOR CHANGES IN OPEN SNACK
  useEffect(() => {
    if (openSnack){
        // SET A TIMEOUT FOR 0.8 SEC AND DO A REDIRECT
        setTimeout(() => {
            navigate(0)
        }, 800)
    }
  }, [openSnack]) 
  

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

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Button onClick={() => navigate('/listings')}>
                    Listings
                  </Button>
                </Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Button onClick={() => navigate('/agencies')}>
                    Agencies
                  </Button>
                </Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Button onClick={() => navigate('/add-property')}>
                    Add Property
                  </Button>
                </Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  {GlobalState.userIsLogged ? (
                    // Render the user's username when the user is logged in and the page is "Login"
                    <Button onClick={() => navigate(`/${GlobalState.userUsername}`)}>
                      {GlobalState.userUsername}
                    </Button>
                  ) : ( 
                    // Render other pages normally
                    <Button onClick={() => navigate('/login')}>
                      Login
                    </Button>
                  )}
                </Typography>
              </MenuItem>

            </Menu>
          </Box>
          
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
            
            <Button
              
              onClick={() => {
                handleCloseNavMenu()
                navigate('/listings') 
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Listings
            </Button>

            <Button
              onClick={() => {
                handleCloseNavMenu()
                navigate('/agencies') 
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Agencies
            </Button>

            <Button
              onClick={() => {
                handleCloseNavMenu()
                navigate('/add-property') 
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Add Property
            </Button>

            {GlobalState.userIsLogged ? (
              <Button
                onClick={() => {
                  handleCloseNavMenu()
                  navigate(`${GlobalState.userUsername}`) 
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {GlobalState.userUsername}
              </Button>
            ) : (
              <Button 
                onClick={() => {
                  handleCloseNavMenu()
                  navigate('/login')
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Login
              </Button>
            )}

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
              
              <MenuItem onClick={handleProfile}>
                <Typography textAlign="center"><Button onClick={() => navigate('/profile')}>Profile</Button></Typography>
              </MenuItem>

              <MenuItem>
                <Typography textAlign="center"><Button onClick={() => navigate('/account')}>Account</Button></Typography>
              </MenuItem>

              <MenuItem>
                <Typography textAlign="center"><Button onClick={() => navigate('/dashboard')}>Dashboard</Button></Typography>
              </MenuItem>

              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center"><Button>Logout</Button></Typography>
              </MenuItem>

            </Menu>

            <Snackbar
                open={openSnack}
                message="You have successfully logged out"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar