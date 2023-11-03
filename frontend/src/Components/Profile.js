import React, {useEffect, useState, useRef, useMemo, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'
import Axios from 'axios'

// Contexts
import StateContext from '../Contexts/StateContext'

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
                break
            
            case 'catchAgencyNameChange':
                draft.agencyNameValue = action.agencyNameChosen
                break

            case 'catchPhoneNumberChange':
                draft.phoneNumberValue = action.phoneNumberChosen
                break
            
            case 'catchBioChange':
                draft.bioValue = action.bioChosen
                break

            case 'catchUploadedPicture':
                draft.uploadedPicture = action.pictureChosen
                break
            
            case 'catchProfilePictureChange':
                draft.profilePictureValue = action.profilePictureChosen
                break

            case 'changeSendRequest':
                draft.sendRequest = draft.sendRequest + 1
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


    // SEND REQUESTS
	useEffect(() => {
		if (state.sendRequest) {
            
            const UpdateProfile = async () => {
				const formData = new FormData()
				// Here we will append key value pairs

                formData.append('seller', GlobalState.userId)
                formData.append('agency_name', state.agencyNameValue)
                formData.append('phone_number', state.phoneNumberValue)
                formData.append('bio', state.bioValue)
                formData.append('profile_picture', state.profilePictureValue)

				try {
					let url = `http://localhost:8000/api/profiles/${GlobalState.userId}/update/`
                    // This will be a patch request since the Profile already exists
					const response = await Axios.patch(url, formData)
					console.log(response.data)
					// navigate('/listings')
				}
				catch(e) {
					console.log(e.response)
				}
			}
			UpdateProfile()
		}
	}, [state.sendRequest])

    const FormSubmit = (e) => {
        e.preventDefault()
        console.log('The form has been submitted')
        dispatch({type: 'changeSendRequest'})
    }

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
                <Grid container>
                    <Grid item></Grid>
                    <Grid item></Grid>
                </Grid>
            )
        }
    }

    return (
    
    <>
        <div>
            {WelcomeDisplay()}
        </div>

        <div style={{ 
            width: '50%',
            marginLeft: 'auto',
            marginRight: 'auto',
            border: '5px solid white' 
            }}
        >
            <form onSubmit={FormSubmit}>
                {/* <Grid item container justifyContent='center' sx={{ marginTop: '1rem' }}>
                    <Typography variant='h4'>Profile</Typography>
                </Grid> */}
                <Grid item container sx={{ marginTop: '1rem' }}>
                    <TextField 
                        id="agencyName" 
                        label="Agency Name*" 
                        variant="outlined" 
                        fullWidth
                        value={state.usernameValue}
                        onChange={(e) => 
                            dispatch({
                                type: 'catchAgencyNameChange', 
                                agencyNameChosen: e.target.value
                                })}
                    />
                </Grid>
                <Grid item container sx={{ marginTop: '1rem' }}>
                    <TextField 
                        id="phoneNumber" 
                        label="Phone Number*" 
                        variant="outlined" 
                        fullWidth
                        value={state.phoneNumberValue}
                        onChange={(e) => 
                            dispatch({
                                type: 'catchPhoneNumberChange', 
                                phoneNumberChosen: e.target.value
                                })}/>
                </Grid>

                <Grid item container sx={{ marginTop: '1rem' }}>
                    <TextField 
                        id="bio" 
                        label="Bio" 
                        variant="outlined" 
                        multiline
                        rows={6}
                        fullWidth
                        value={state.bioValue}
                        onChange={(e) => 
                            dispatch({
                                type: 'catchBioChange', 
                                bioChosen: e.target.value
                            })
                        }
                    />
                </Grid>

                <Grid item container xs={6} sx={{ 
					marginTop: '1rem',
					marginLeft: 'auto',
					marginRight: 'auto',
					fontSize: '1.1rem' }}>
					<Button 
						variant='outlined'
						component='label'
						fullWidth 
						sx={{ 
							fontSize: '0.8rem'
						}}
					>
						Profile Picture
						<input 
							type='file'
							accept='image/png, image/gif, image/jpeg, image/jpg'
							hidden
							onChange={(e) => dispatch({
								type: 'catchUploadedPicture',
								pictureChosen: e.target.files
							})}
						/>
					</Button>
				</Grid>

                {/* <Grid item container>
                    <Typography>
                        {state.profilePictureValue ? <li>{state.profilePictureValue.name}</li> : ''}
                    </Typography>
				</Grid> */}

                <StyledPaper
                    sx={{
                    my: 1,
                    mx: 'auto',
                    p: 0,
                    }}
                >
                    <Grid container>
                        <Typography>
                            {state.profilePictureValue ? <li>{state.profilePictureValue.name}</li> : ''}
                        </Typography>
                    </Grid>
                </StyledPaper>

                <Grid item container xs={8} sx={{ 
                    marginTop: '1rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    fontSize: '1.1rem' }}>
                    <Button 
                        variant='contained' 
                        type='submit' 
                        fullWidth
                    >Update</Button>
                </Grid>
        
            </form>
            {/* This sent a message to the frontend */}
            {/* {GlobalState.globalMessage} */}

            {/* {GlobalState.userToken} */}
        
        </div>
    </>
  )
}

export default Profile