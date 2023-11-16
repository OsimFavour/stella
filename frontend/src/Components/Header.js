import Axios from 'axios'
import React, {useContext, useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'

// MUI Imports
import { Button, Typography, Grid, AppBar, Toolbar, IconButton, Menu, MenuItem, Snackbar } from '@mui/material'

// Contexts
import StateContext from '../Contexts/StateContext'
import DispatchContext from '../Contexts/DispatchContext'

function Header() {
    const navigate = useNavigate()
    const GlobalState = useContext(StateContext)
    const GlobalDispatch = useContext(DispatchContext)

    // Menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleProfile = () => {
        setAnchorEl(null)
        navigate('/profile')
    }

    const [openSnack, setOpenSnack] = useState(false)

    
    const handleLogout = async () => {
        setAnchorEl(null)
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
                navigate('/')
            }, 800)
        }
    }, [openSnack]) 

    return (
    <AppBar position="static" sx={{backgroundColor:'black'}}>
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                {/* <MenuIcon /> */}
            </IconButton>
            <div style={{marginRight: 'auto'}}>
                <Button color="inherit" onClick={() => navigate('/')}><Typography variant='h4'>Stella</Typography></Button>
            </div>
            <div>
                <Button color="inherit" sx={{marginRight: '2rem'}} onClick={() => navigate("/listings")}><Typography variant='h6'>Listings</Typography></Button>
                <Button color="inherit" sx={{marginLeft: '2rem'}} onClick={() => navigate("/agencies")}><Typography variant='h6'>Agencies</Typography></Button>
            </div>
            <div style={{marginLeft: 'auto', marginRight: '10rem'}}>
                <Button sx={{
                    backgroundColor: 'green',
                    color: 'white',
                    width: '15rem',
                    fontSize: '1.1rem',
                    marginRight: '1rem',
                    '&:hover': {
                        backgroundColor: 'green'
                    },
                    }}
                    onClick={() => navigate('/add_property')}>
                    Add Property</Button>
                    
                {GlobalState.userIsLogged ? <Button sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    width: '15rem',
                    fontSize: '1.1rem',
                    marginLeft: '1rem',
                    '&:hover': {
                        backgroundColor: 'green'
                    }, 
                    }}
                    onClick={handleClick}
                    // onClick={() => navigate("/login")}
                    >
                    {GlobalState.userUsername}</Button> : <Button sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    width: '15rem',
                    fontSize: '1.1rem',
                    marginLeft: '1rem',
                    '&:hover': {
                        backgroundColor: 'green'
                    },
                    }}
                    onClick={() => navigate("/login")}>
                    Login</Button>}


                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleProfile}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>

                    <Snackbar
                        open={openSnack}
                        message="You have successfully logged out"
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    />
                
            </div>
            
        </Toolbar>
    </AppBar>
  )
}

export default Header