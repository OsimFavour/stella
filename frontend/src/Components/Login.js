import React from 'react'
import { useNavigate } from 'react-router-dom'

// MUI
import { 
    AppBar, 
    Button, 
    Grid, 
    Typography, 
    Card, 
    CardHeader, 
    CardMedia, 
    CardContent,
    CircularProgress,
    TextField
} from '@mui/material'


function Login() {
  const navigate = useNavigate()

  return (
    <div style={{ 
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        border: '5px solid white' }}>
        <form>
            <Grid item container justifyContent='center' sx={{ marginTop: '1rem' }}>
                <Typography variant='h4'>Sign In Here</Typography>
            </Grid>
            <Grid item container sx={{ marginTop: '1rem' }}>
                <TextField id="username" label="Username" variant="outlined" fullWidth/>
            </Grid>
            <Grid item container sx={{ marginTop: '1rem' }}>
                <TextField id="password" label="Password" variant="outlined" type='password' fullWidth/>
            </Grid>
            <Grid item container xs={8} sx={{ 
                marginTop: '1rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                fontSize: '1.1rem' }}>
                <Button variant='contained' type='submit' fullWidth>Sign In</Button>
            </Grid>
       
        </form>

        <Grid item container justifyContent='center' sx={{ marginTop: '1rem' }}>
                <Typography variant='small'>Don't Have An Accout? {' '}
                <span onClick={() => navigate('/register')} style={{ cursor: 'pointer', color: ''}}>Sign Up</span></Typography>
        </Grid>
    </div>
  )
}

export default Login