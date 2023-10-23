import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'
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

    const initialState = {
        usernameValue: '',
        emailValue: '',
        passwordValue: '',
        password2Value: '',
        sendRequest: 0
    }

    function ReducerFunction(draft, action) {
        switch(action.type) {
            case 'catchUsernameChange':
                draft.usernameValue = action.usernameChosen
                break        
            case 'catchEmailChange':
                draft.emailValue = action.emailChosen
                break
            case 'catchPasswordChange':
                draft.passwordValue = action.passwordChosen
                break
            case 'catchPassword2Change':
                draft.password2Value = action.password2Chosen
                break
            case 'changeSendRequest':
                draft.sendRequest = draft.sendRequest + 1
                break
        }
    }

    // const [state, dispatch] = useReducer(ReducerFunction, initialState)
    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)

    // const [sendRequest, setSendRequest] = useState(false)
    // const [usernameValue, setUsernameValue] = useState('')
    // const [emailValue, setEmailValue] = useState('')
    // const [passwordValue, setPasswordValue] = useState('')
    // const [password2Value, setPassword2Value] = useState('')

    useEffect(() => {
        console.log(state.usernameValue)
    }, [state.usernameValue])

    function formSubmit(e) {
        e.preventDefault()
        console.log('The form has been submitted')
        dispatch({type: 'changeSendRequest'})
    }

    useEffect(() => {
        if (state.sendRequest) {
            const source = Axios.CancelToken.source()
            async function SignUp() {
                try {
                    let url = 'http://localhost:8000/api-auth-djoser/users/'
                    const response = await Axios.post(url, {
                        username: state.usernameValue,
                        email: state.emailValue,
                        password: state.passwordValue,
                        re_password: state.password2Value
                    }, 
                    { cancelToken: source.token })
                    console.log(response)
                    navigate('/')
                }
                catch (error) {
                    console.log(error.response)
                }
            }
            SignUp()
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
                <Typography variant='h4'>Create An Account</Typography>
            </Grid>
            
            <Grid item container sx={{ marginTop: '1rem' }}>
                <TextField 
                    id="username" 
                    label="Username" 
                    variant="outlined" 
                    fullWidth
                    value={state.usernameValue}
                    onChange={(e) => dispatch({type: 'catchUsernameChange', usernameChosen: e.target.value})}/>
            </Grid>

            <Grid item container sx={{ marginTop: '1rem' }}>
                <TextField 
                    id="email" 
                    label="Email" 
                    variant="outlined" 
                    fullWidth 
                    value={state.emailValue} 
                    onChange={(e) => dispatch({type: 'catchEmailChange', emailChosen: e.target.value})}/>
            </Grid>

            <Grid item container sx={{ marginTop: '1rem' }}>
                <TextField 
                    id="password" 
                    label="Password" 
                    variant="outlined"       
                    type='password' 
                    fullWidth
                    value={state.passwordValue}
                    onChange={(e) => dispatch({type: 'catchPasswordChange', passwordChosen: e.target.value})}/>
            </Grid>                

            <Grid item container sx={{ marginTop: '1rem' }}>
                <TextField 
                    id="password2" 
                    label="Confirm Password" 
                    variant="outlined" 
                    type='password' 
                    fullWidth
                    value={state.password2Value}
                    onChange={(e) => dispatch({type: 'catchPassword2Change', password2Chosen: e.target.value})}/>
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