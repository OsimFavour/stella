import React, {useEffect, useState, useRef, useMemo, useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'
import Axios from 'axios'

// Contexts
import StateContext from '../Contexts/StateContext'

// Assets
import defaultProfilePicture from './Assets/defaultProfilePicture.jpg'

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
    IconButton,
} from '@mui/material'

import { styled } from '@mui/material/styles'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
  }));


function AgencyDetail() {

    const navigate = useNavigate()
	const GlobalState = useContext(StateContext)

    // console.log(useParams())

    const params = useParams()

    const initialState = {
        userProfile: {
			agencyName: '',
			phoneNumber: '',
            profilePic: '',
            bio: '',
            sellerListings: []
		},
        dataIsLoading: true,
    }

    function ReducerFunction(draft, action) {
        switch(action.type) {       
            case 'catchUserProfileInfo':
                draft.userProfile.agencyName = action.profileObject.agency_name
                draft.userProfile.phoneNumber = action.profileObject.phone_number
                draft.userProfile.profilePic = action.profileObject.profile_picture
                draft.userProfile.bio = action.profileObject.bio
                draft.userProfile.sellerListings = action.profileObject.seller_listings
                break

            case 'loadingDone':
                draft.dataIsLoading = false
                break
            
        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)


    // Request to Get Profile Info
    useEffect(() => {
		async function GetProfileInfo() {
			try {
				const response = await Axios.get(
					`http://localhost:8000/api/profiles/${params.id}/`
				)
				// console.log(response.data)
				console.log('Dispatching catchUserProfileInfo action with data:', response.data)
				dispatch({
					type: 'catchUserProfileInfo',
					profileObject: response.data,
				})
                dispatch({type: 'loadingDone'})
			}
			catch(e) {
				console.log(e.response)
			}
		}  
		GetProfileInfo()
	}, [])

    if (state.dataIsLoading === true) {
        return (
            <Grid 
                container
                justifyContent='center'
                alignItems='center'
                sx={{height: '100vh'}}
            >
                <CircularProgress />
            </Grid>
        )
    }

    return (
        <div>
            <StyledPaper
                sx={{
                my: 1,
                mx: 'auto',
                p: 2,
                }}
            >
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar style={{height: '3rem', width: '3rem', marginTop: '5px'}}>
                            <img 
                                style={{height: '2rem', width: '9rem'}} 
                                src={state.userProfile.profilePic !== null ? state.userProfile.profilePic : defaultProfilePicture}
                            />
                        </Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography variant='h6' ml={1.5}>{state.userProfile.agencyName}!</Typography>
                        <Typography variant='p' mr={4}>
                            <IconButton sx={{ fontSize: '0.9rem' }} size="small">
                                <LocalPhoneIcon/> {state.userProfile.phoneNumber}
                            </IconButton>
                        </Typography>
                    </Grid>
                </Grid>
            </StyledPaper>
        </div>
    )

}

export default AgencyDetail