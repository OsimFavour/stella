import React, {useEffect, useState, useRef, useMemo, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'
import Axios from 'axios'

// Contexts
import StateContext from '../Contexts/StateContext'

// Components
import ProfileUpdate from './ProfileUpdate'

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
	FormControlLabel,
	Checkbox,
} from '@mui/material'

import { styled } from '@mui/material/styles'

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
  }));
  

function Profile() {

    const navigate = useNavigate()
	const GlobalState = useContext(StateContext)

    const initialState = {
        userProfile: {
			agencyName: '',
			phoneNumber: '',
            profilePic: '',
            bio: '',
		},
        agencyNameValue: '',
        phoneNumberValue: '',
        bioValue: '',
        uploadedPicture: [],
        profilePictureValue: '',
        sendRequest: 0
    }

    function ReducerFunction(draft, action) {
        switch(action.type) {       
            case 'catchUserProfileInfo':
                draft.userProfile.agencyName = action.profileObject.agency_name
                draft.userProfile.phoneNumber = action.profileObject.phone_number
                draft.userProfile.profilePic = action.profileObject.profile_picture
                draft.userProfile.bio = action.profileObject.bio
                break
            
        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)

    // Use Effect to catch uploaded picture.
    useEffect(() => {
        if (state.uploadedPicture[0]) {
            dispatch({
                type: 'catchProfilePictureChange',
                profilePictureChosen: state.uploadedPicture[0]
            })
        }
    }, [state.uploadedPicture[0]])


    // Request to Get Profile Info
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


    const WelcomeDisplay = () => {
        if (
            state.userProfile.agencyName === null || 
            state.userProfile.agencyName === '' || 
            state.userProfile.phoneNumber === null || 
            state.userProfile.phoneNumber === ''
            ) {
            return (
                <StyledPaper
                    sx={{
                    my: 1,
                    mx: 'auto',
                    p: 2,
                    }}
                >
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar>S</Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography>Welcome {GlobalState.userUsername}!</Typography>
                            <Typography variant='p'>Submit to Update Profile</Typography>
                        </Grid>
                    </Grid>
                </StyledPaper>
            )
        }
        else {
            return (
                        <StyledPaper
                            sx={{
                            my: 1,
                            mx: 'auto',
                            p: 2,
                            }}
                        >
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item>
                                    <Avatar>
                                        <img 
                                            style={{height: '2rem', width: '9rem'}} 
                                            src={state.userProfile.profilePic}
                                        />
                                    </Avatar>
                                </Grid>
                                <Grid item xs>
                                    <Typography>Welcome {GlobalState.userUsername}!</Typography>
                                    <Typography variant='p'>You have X properties listed.</Typography>
                                </Grid>
                            </Grid>
                        </StyledPaper>
            )
        }
    }

    return (
    
    <>
        <div>
            {WelcomeDisplay()}
        </div>

       <ProfileUpdate/>
    </>
  )
}

export default Profile