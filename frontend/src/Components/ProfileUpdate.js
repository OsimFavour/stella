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
    Snackbar
} from '@mui/material'

import { styled } from '@mui/material/styles'

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
  }));
  

function ProfileUpdate(props) {

    const navigate = useNavigate()
	const GlobalState = useContext(StateContext)

    console.log(props.userProfile)

    const initialState = {
        agencyNameValue: props.userProfile.agencyName,
        phoneNumberValue: props.userProfile.phoneNumber,
        bioValue: props.userProfile.bio,
        uploadedPicture: [],
        profilePictureValue: props.userProfile.profilePic,
        sendRequest: 0,
        openSnack: false,
        disabledBtn: false,
        
    }

    function ReducerFunction(draft, action) {
        switch(action.type) {  

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

            case 'setSnack':
                draft.openSnack = true
                break

            case 'disableButton':
                draft.disabledBtn = true
                break

            case 'enableButton':
                draft.disabledBtn = false
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




    // SEND PATCH REQUESTS
	useEffect(() => {
		if (state.sendRequest) {
            
            const UpdateProfile = async () => {
				const formData = new FormData()
				// Here we will append key value pairs

                if (typeof state.profilePictureValue === 'string' || state.profilePictureValue === null) {
                    formData.append('seller', GlobalState.userId)
                    formData.append('agency_name', state.agencyNameValue)
                    formData.append('phone_number', state.phoneNumberValue)
                    formData.append('bio', state.bioValue)
                }
                else {
                    formData.append('seller', GlobalState.userId)
                    formData.append('agency_name', state.agencyNameValue)
                    formData.append('phone_number', state.phoneNumberValue)
                    formData.append('bio', state.bioValue)
                    formData.append('profile_picture', state.profilePictureValue)
                }

				try {
					let url = `http://localhost:8000/api/profiles/${GlobalState.userId}/update/`
                    // This will be a patch request since the Profile already exists
					const response = await Axios.patch(url, formData)
					console.log(response.data)
                    dispatch({
                        type: 'setSnack'
                    })
                    // To refresh the page
					// navigate(0)
				}
				catch(e) {
					console.log(e.response)
                    dispatch({type: 'enableButton'})
				}
			}
			UpdateProfile()
		}
	}, [state.sendRequest])

    // CREATE A NEW USE EFFECT TO WATCH FOR CHANGES IN OPEN SNACK
    useEffect(() => {
        if (state.openSnack){
            // SET A TIMEOUT FOR 0.8 SEC AND DO A REDIRECT
            setTimeout(() => {
                navigate(0)
            }, 500)
        }
    }, [state.openSnack]) 

    const FormSubmit = (e) => {
        e.preventDefault()
        console.log('The form has been submitted')
        dispatch({type: 'changeSendRequest'})
        dispatch({type: 'disableButton'})
    }

    const ProfilePictureDisplay = () => {
        if (typeof state.profilePictureValue !== 'string') {
            return (
                <Typography>
                    {state.profilePictureValue ? <li>{state.profilePictureValue.name}</li> : ''}
                </Typography>
            )
        }
        else if (typeof state.profilePictureValue === 'string') {
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
                                    src={props.userProfile.profilePic}
                                />
                            </Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography>Current Profile Picture</Typography>
                        </Grid>
                    </Grid>
                </StyledPaper>
                // <Grid item sx={{ marginTop: '0.5rem', marginRight: 'auto', marginLeft: 'auto'}}>
                //     <img src={props.userProfile.profilePic} style={{ height: '5rem', width: '5rem'}}/>
                // </Grid>
            )
        }
    }
    return (
    
    <>
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
                    
                <Grid container>
                    {ProfilePictureDisplay()}
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
						// sx={{ 
						// 	fontSize: '0.8rem'
						// }}
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

                <Grid item container xs={8} sx={{ 
                    marginTop: '1rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    fontSize: '1.1rem' }}>
                    <Button 
                        variant='contained' 
                        type='submit' 
                        fullWidth
                        disabled={state.disabledBtn}
                    >Update</Button>
                </Grid>
        
            </form>
            {/* This sent a message to the frontend */}
            {/* {GlobalState.globalMessage} */}

            {/* {GlobalState.userToken} */}
            <Snackbar
                open={state.openSnack}
                message="You have successfully updated your profile!"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            />
        
        </div>
    </>
  )
}

export default ProfileUpdate