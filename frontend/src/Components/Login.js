import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'

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

  const initialState = {
    usernameValue: '',
    passwordValue: '',
    sendRequest: 0
    }

    function ReducerFunction(draft, action) {
        switch(action.type) {
            case 'catchUsernameChange':
                draft.usernameValue = action.usernameChosen
                break
            case 'catchPasswordChange':
                draft.passwordValue = action.passwordChosen
                break
            // case 'changeSendRequest':
            //     draft.sendRequest = draft.sendRequest + 1
            //     break
        }
    }

    // const [state, dispatch] = useReducer(ReducerFunction, initialState)
    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)


    function formSubmit(e) {
        e.preventDefault()
        console.log('The form has been submitted')
        // dispatch({type: 'changeSendRequest'})
    }


    useEffect(() => {
        if (state.sendRequest) {
            const source = Axios.CancelToken.source()
            async function SignIn() {
                try {
                    let url = 'http://localhost:8000/api-auth-djoser/token/login'
                    const response = await Axios.post(url, {
                        username: state.usernameValue,
                        password: state.passwordValue,
                    }, 
                    { cancelToken: source.token })
                    console.log(response)
                    navigate('/')
                }
                catch (error) {
                    console.log(error.response)
                }
            }
            SignIn()
            return () => {source.cancel()}
            }
    }, [state.sendRequest])

    return (
    <div style={{ 
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        border: '5px solid white' }}>
        <form onSubmit={formSubmit}>
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