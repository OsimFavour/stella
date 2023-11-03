import React, {useEffect, useState, useRef, useMemo, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'
import Axios from 'axios'

// Contexts
import StateContext from '../Contexts/StateContext'

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
	FormControlLabel,
	Checkbox,
} from '@mui/material'


function Profile() {

    const navigate = useNavigate()
	const GlobalState = useContext(StateContext)

    const initialState = {
        userProfile: {
			agencyName: '',
			phoneNumber: ''
		}
    }

    function ReducerFunction(draft, action) {
        switch(action.type) {       
            case 'catchUserProfileInfo':
                draft.userProfile.agencyName = action.profileObject.agency_name
                draft.userProfile.phoneNumber = action.profileObject.phone_number
                break
        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)

    useEffect(() => {
		async function GetProfileInfo() {
			try {
				const response = await Axios.get(
					`http://localhost:8000/api/profiles/${GlobalState.userId}/`
				)
				// console.log(response.data)
				console.log('Dispatching catchUserProfileInfo action with data:', response.data)
				dispatch({
					type: 'catchUserProfileInfo',
					profileObject: response.data,
				})
			}
			catch(e) {
				console.log(e.response)
			}
		}
		GetProfileInfo()
	}, [])


    return (
    
    <>
        <div>
            <Typography 
                variant='h5' 
                sx={{
                    textAlign: 'center', 
                    marginTop: '1rem'
                }}
            >
                Welcome{' '}
                <span style={{ color: 'blue', fontWeight: 'bolder'}}>
                    {GlobalState.userUsername}
                </span>{' '}
                , Submit to Update Profile
            </Typography>
        </div>

        <div style={{ 
            width: '50%',
            marginLeft: 'auto',
            marginRight: 'auto',
            border: '5px solid white' }}>
            <form>
                <Grid item container justifyContent='center' sx={{ marginTop: '1rem' }}>
                    <Typography variant='h4'>Profile</Typography>
                </Grid>
                <Grid item container sx={{ marginTop: '1rem' }}>
                    <TextField 
                        id="agencyName" 
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
                    >Sign In</Button>
                </Grid>
        
            </form>
            {/* This sent a message to the frontend */}
            {/* {GlobalState.globalMessage} */}

            {/* {GlobalState.userToken} */}
            

            <Grid item container justifyContent='center' sx={{ marginTop: '1rem' }}>
                    <Typography variant='small'>Don't Have An Accout? {' '}
                    <span onClick={() => navigate('/register')} style={{ cursor: 'pointer', color: ''}}>Sign Up</span></Typography>
            </Grid>
        </div>
    </>
  )
}

export default Profile