import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

// MUI Imports
import { Button, Typography, Grid, AppBar, Toolbar, IconButton } from '@mui/material'

function Header() {
    const navigate = useNavigate()
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
                <Button color="inherit" sx={{marginLeft: '2rem'}} onClick={() => navigate("/")}><Typography variant='h6'>Agencies</Typography></Button>
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
                    }}>
                    Add Property</Button>
                <Button sx={{
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
                    Login</Button>
            </div>
            
        </Toolbar>
    </AppBar>
  )
}

export default Header