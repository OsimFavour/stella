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
    TextField,
    Snackbar,
    Alert
} from '@mui/material'


function Register() {
    const navigate = useNavigate()

    const initialState = {
        usernameValue: '',
        emailValue: '',
        passwordValue: '',
        password2Value: '',
        sendRequest: 0,
        openSnack: false,
        disabledBtn: false,
        usernameErrors: {
            hasErrors: false,
            errorMessage: '',
        },
        emailErrors: {
            hasErrors: false,
            errorMessage: '',
        },
        passwordErrors: {
            hasErrors: false,
            errorMessage: '',
        },
        password2HelperText: '',
        serverUserMessage: '',
        serverEmailMessage: '',
    }


    function ReducerFunction(draft, action) {
        switch(action.type) {
            case 'catchUsernameChange':
                draft.usernameValue = action.usernameChosen
                draft.usernameErrors.hasErrors = false
                draft.usernameErrors.errorMessage = ''
                draft.serverUserMessage = ''
                break   

            case 'catchEmailChange':
                draft.emailValue = action.emailChosen
                draft.emailErrors.hasErrors = false
                draft.emailErrors.errorMessage = ''
                draft.serverEmailMessage = ''
                break

            case 'catchPasswordChange':
                draft.passwordValue = action.passwordChosen
                draft.passwordErrors.hasErrors = false
                draft.passwordErrors.errorMessage = ''
                break

            case 'catchPassword2Change':
                draft.password2Value = action.password2Chosen
                if (action.password2Chosen != draft.passwordValue){
                    draft.password2HelperText = "The two password fields must match."
                }
                else if (action.password2Chosen === draft.passwordValue){
                    draft.password2HelperText = ''
                }
                break

            case 'changeSendRequest':
                draft.sendRequest = draft.sendRequest + 1
                break

            case 'setSnack':
                draft.openSnack = true
                break

            case 'disableButton':
                draft.disabledBtn = true
                break

            case 'enableButton':
                draft.disabledBtn = false
                break

            case 'catchUsernameErrors':
                if (action.usernameChosen.length === 0){
                    draft.usernameErrors.hasErrors = true
                    draft.usernameErrors.errorMessage = 'This field must not be blank.'
                }
                else if (action.usernameChosen.length < 5){
                    draft.usernameErrors.hasErrors = true
                    draft.usernameErrors.errorMessage = 'Username must have at least five characters.'
                }
                else if (!/^([a-zA-Z0-9]+)$/.test(action.usernameChosen)){
                    draft.usernameErrors.hasErrors = true
                    draft.usernameErrors.errorMessage = 'Enter a valid username. This value may contain only letters and numbers.'
                }
                break

            case 'catchEmailErrors':
                if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(action.emailChosen)){
                    draft.emailErrors.hasErrors = true
                    draft.emailErrors.errorMessage = 'Enter a valid email address.'
                }
                break
            
            case 'catchPasswordErrors':
                if (action.passwordChosen.length < 8){
                    draft.passwordErrors.hasErrors = true
                    draft.passwordErrors.errorMessage = 'The password must have at least 8 characters!'
                }
                else if (!/^(?=.*[0-9!@#$%^&*()-_=+{};:'",.<>/?`~])[\w!@#$%^&*()-_=+{};:'",.<>/?`~]{8,}$/.test(action.passwordChosen)){
                    draft.passwordErrors.hasErrors = true
                    draft.passwordErrors.errorMessage = 'The password must have at least 1 special character or a number!'
                }
                break
            
            case 'usernameExists':
                draft.serverUserMessage = 'A user with that username already exists!'
                break

            case 'emailExists':
                draft.serverEmailMessage = 'A user with that email already exists!'
                break

        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)

    useEffect(() => {
        console.log(state.usernameValue)
    }, [state.usernameValue])

    function formSubmit(e) {
        e.preventDefault()
        console.log('The form has been submitted')
        if (!state.usernameErrors.hasErrors && 
            !state.emailErrors.hasErrors && 
            !state.passwordErrors.hasErrors && 
            state.password2HelperText === ''
            ){
            dispatch({type: 'changeSendRequest'})
            dispatch({type: 'disableButton'})
        }
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
                    dispatch({
                        type: 'setSnack'
                    })
                }
                catch (error) {
                    console.log(error.response)
                    dispatch({type: 'enableButton'})
                    if (error.response.data.username){
                        dispatch({type: 'usernameExists'})
                    }
                    else if (error.response.data.email){
                        dispatch({type: 'emailExists'})
                    }
                }
            }
            SignUp()
            return () => {source.cancel()}
            }
    }, [state.sendRequest])


    // CREATE A NEW USE EFFECT TO WATCH FOR CHANGES IN OPEN SNACK
    useEffect(() => {
        if (state.openSnack){
            // SET A TIMEOUT FOR 1.5 SECS AND DO A REDIRECT
            setTimeout(() => {
                navigate('/')
            }, 1500)
        }
    }, [state.openSnack]) 

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

            {state.serverUserMessage ? (
                <Alert severity="error">
                    {state.serverUserMessage}
                </Alert>
            ) : ''}

            {state.serverEmailMessage ? (
                <Alert severity="error">
                    {state.serverEmailMessage}
                </Alert>
            ) : ''}
            
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
                        })
                    }
                    onBlur={(e) => 
                        dispatch({
                            type: 'catchUsernameErrors', 
                            usernameChosen: e.target.value
                        })
                    }
                    error={state.usernameErrors.hasErrors ? true : false}
                    helperText={state.usernameErrors.errorMessage}
                />
            </Grid>

            <Grid item container sx={{ marginTop: '1rem' }}>
                <TextField 
                    id="email" 
                    label="Email" 
                    variant="outlined" 
                    fullWidth 
                    value={state.emailValue} 
                    onChange={(e) => 
                        dispatch({
                            type: 'catchEmailChange', 
                            emailChosen: e.target.value
                        })
                    }
                    onBlur={(e) => 
                        dispatch({
                            type: 'catchEmailErrors', 
                            emailChosen: e.target.value
                        })
                    }
                    error={state.emailErrors.hasErrors ? true : false}
                    helperText={state.emailErrors.errorMessage}
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
                        })
                    }
                    onBlur={(e) => 
                        dispatch({
                            type: 'catchPasswordErrors', 
                            passwordChosen: e.target.value
                        })
                    }
                    error={state.passwordErrors.hasErrors ? true : false}
                    helperText={state.passwordErrors.errorMessage}
                />
            </Grid>                

            <Grid item container sx={{ marginTop: '1rem' }}>
                <TextField 
                    id="password2" 
                    label="Confirm Password" 
                    variant="outlined" 
                    type='password' 
                    fullWidth
                    value={state.password2Value}
                    onChange={(e) => 
                        dispatch({
                            type: 'catchPassword2Change', 
                            password2Chosen: e.target.value
                        })
                    }
                    error={state.password2HelperText !== '' ? true : false}
                    helperText={state.password2HelperText}
                />
            </Grid>

            <Grid item container xs={8} sx={{ 
                marginTop: '1rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                fontSize: '1.1rem' }}>
                <Button variant='contained' type='submit' fullWidth disabled={state.disabledBtn}>Sign Up</Button>
            </Grid>
       
        </form>

        <Grid item container justifyContent='center' sx={{ marginTop: '1rem' }}>
                <Typography variant='small'>Already Have An Account? {' '}
                <span onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: ''}}>Sign In Here</span></Typography>
        </Grid>

        <Snackbar
            open={state.openSnack}
            message="You have successfully created an account!"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        />
    </div>
  )
}

export default Register