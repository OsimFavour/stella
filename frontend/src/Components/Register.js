import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

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


function Register() {
    const navigate = useNavigate()
    const [sendRequest, setSendRequest] = useState(false)
    const [usernameValue, setUsernameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [password2Value, setPassword2Value] = useState('')

    useEffect(() => {
        console.log(usernameValue)
    }, [usernameValue])

    function formSubmit(e) {
        e.preventDefault()
        console.log('The form has been submitted')
        setSendRequest(!sendRequest)
    }

    useEffect(() => {
        if (sendRequest) {
            const source = Axios.CancelToken.source()
            async function SignUp() {
                try {
                    let url = 'http://localhost:8000/api-auth-djoser/users/'
                    const response = await Axios.post(url, {
                        username: usernameValue,
                        email: emailValue,
                        password: passwordValue,
                        re_password: password2Value
                    }, 
                    { cancelToken: source.token })
                    console.log(response)
                }
                catch (error) {
                    console.log(error.response)
                }
            }
            SignUp()
            return () => {source.cancel()}
            }
    }, [sendRequest])

    return (
    <div style={{ 
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        border: '5px solid white' }}>
        <form onSubmit={formSubmit}>
            <Grid item container justifyContent='center' sx={{ marginTop: '1rem' }}>
                <Typography variant='h4'>Create An Account</Typography>
            </Grid>
            
            <Grid item container sx={{ marginTop: '1rem' }}>
                <TextField 
                    id="username" 
                    label="Username" 
                    variant="outlined" 
                    fullWidth
                    value={usernameValue}
                    onChange={(e) => setUsernameValue(e.target.value)}/>
            </Grid>

            <Grid item container sx={{ marginTop: '1rem' }}>
                <TextField 
                    id="email" 
                    label="Email" 
                    variant="outlined" 
                    fullWidth 
                    value={emailValue} 
                    onChange={(e) => setEmailValue(e.target.value)}/>
            </Grid>

            <Grid item container sx={{ marginTop: '1rem' }}>
                <TextField 
                    id="password" 
                    label="Password" 
                    variant="outlined" 
                    type='password' 
                    fullWidth
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}/>
            </Grid>

            <Grid item container sx={{ marginTop: '1rem' }}>
                <TextField 
                    id="password2" 
                    label="Confirm Password" 
                    variant="outlined" 
                    type='password' 
                    fullWidth
                    value={password2Value}
                    onChange={(e) => setPassword2Value(e.target.value)}/>
            </Grid>

            <Grid item container xs={8} sx={{ 
                marginTop: '1rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                fontSize: '1.1rem' }}>
                <Button variant='contained' type='submit' fullWidth>Sign Up</Button>
            </Grid>
       
        </form>

        <Grid item container justifyContent='center' sx={{ marginTop: '1rem' }}>
                <Typography variant='small'>Already Have An Account? {' '}
                <span onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: ''}}>Sign In Here</span></Typography>
        </Grid>
    </div>
  )
}

export default Register