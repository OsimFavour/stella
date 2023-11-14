import React, {useEffect, useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'
import Axios from 'axios'

// MUI
import { 
    AppBar, 
    Avatar,
    Button, 
    Grid, 
    Typography, 
    Card, 
    CardHeader, 
    CardMedia, 
    CardContent,
    CircularProgress,
    Paper,
    TextField,
    Snackbar
} from '@mui/material'


// Contexts
import DispatchContext from '../Contexts/DispatchContext'
import StateContext from '../Contexts/StateContext'


function Login() {
  const navigate = useNavigate()

  const GlobalDispatch = useContext(DispatchContext)
  const GlobalState = useContext(StateContext)

  const initialState = {
    usernameValue: '',
    passwordValue: '',
    sendRequest: 0,
    token: '',
    openSnack: false,
    }

    function ReducerFunction(draft, action) {
        switch(action.type) {
            case 'catchUsernameChange':
                draft.usernameValue = action.usernameChosen
                break
            case 'catchPasswordChange':
                draft.passwordValue = action.passwordChosen
                break
            case 'changeSendRequest':
                draft.sendRequest = draft.sendRequest + 1
                break
            case 'catchToken':
                draft.token = action.tokenValue
                break
            case 'setSnack':
                draft.openSnack = true
                break
        }
    }

    // const [state, dispatch] = useReducer(ReducerFunction, initialState)
    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)


    function formSubmit(e) {
        e.preventDefault()
        console.log('The form has been submitted')
        dispatch({type: 'changeSendRequest'})
    }


    // POST LOGIN DETAILS TO THE BACKEND
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

                    dispatch({
						type: "catchToken",
						tokenValue: response.data.auth_token,
					})
                    GlobalDispatch({
						type: "catchToken",
						tokenValue: response.data.auth_token,
					})
                    // navigate('/')
                }
                catch (error) {
                    console.log(error.response)
                }
            }
            SignIn()
            return () => {source.cancel()}
            }
    }, [state.sendRequest])


    // GET USER INFO
    useEffect(() => {
        if (state.token !== '') {
            const source = Axios.CancelToken.source()
            async function GetUserInfo() {
                try {
                    let url = 'http://localhost:8000/api-auth-djoser/users/me'
                    const response = await Axios.get(url, {
                        headers: { Authorization : 'Token '.concat(state.token) }
                    }, 
                    { cancelToken: source.token })
                    console.log(response)
                    // dispatch({type: 'catchToken', tokenValue: response.data.auth_token})
                    GlobalDispatch({
                        type: 'userSignsIn', 
                        usernameInfo: response.data.username,
                        emailInfo: response.data.email,
                        IdInfo: response.data.id
                    })
                    dispatch({
                        type: 'setSnack'
                    })
                    // navigate('/')
                }
                catch (error) {
                    console.log(error.response)
                }
            }
            GetUserInfo()
            return () => {source.cancel()}
            }
    }, [state.token])


    // CREATE A NEW USE EFFECT TO WATCH FOR CHANGES IN OPEN SNACK
    useEffect(() => {
        if (state.openSnack){
            // SET A TIMEOUT FOR 1.5 SECS AND DO A REDIRECT
            setTimeout(() => {
                navigate('/')
            }, 1500)
        }
    }) 


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
                <TextField 
                    id="username" 
                    label="Username" 
                    variant="outlined" 
                    fullWidth
                    value={state.usernameValue}
                    onChange={(e) => 
                        dispatch({
                            type: 'catchUsernameChange', 
                            usernameChosen: e.target.value
                            })}
                />
            </Grid>
            <Grid item container sx={{ marginTop: '1rem' }}>
                <TextField 
                    id="password" 
                    label="Password" 
                    variant="outlined" 
                    type='password' 
                    fullWidth
                    value={state.passwordValue}
                    onChange={(e) => 
                        dispatch({
                            type: 'catchPasswordChange', 
                            passwordChosen: e.target.value
                            })}/>
            </Grid>
            <Grid item container xs={8} sx={{ 
                marginTop: '1rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                fontSize: '1.1rem' }}>
                <Button 
                    variant='contained' 
                    type='submit' 
                    fullWidth
                >
                    Sign In
                </Button>
            </Grid>
       
        </form>
        {/* This sent a message to the frontend */}
        {/* {GlobalState.globalMessage} */}

        {/* {GlobalState.userToken} */}
        

        <Grid item container justifyContent='center' sx={{ marginTop: '1rem' }}>
                <Typography variant='small'>Don't Have An Account? {' '}
                <span onClick={() => navigate('/register')} style={{ cursor: 'pointer', color: ''}}>Sign Up</span></Typography>
        </Grid>

        <Snackbar
            open={state.openSnack}
            message="You have successfully logged in"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        />
    </div>
  )
}

export default Login