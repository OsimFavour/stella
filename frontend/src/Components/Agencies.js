import React, {useEffect, useState, useRef, useMemo, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'
import Axios from 'axios'

// Contexts
import StateContext from '../Contexts/StateContext'

// Assets
import defaultProfilePicture from './Assets/defaultProfilePicture.jpg'

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
    CardActions, 
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
  }))


function Agencies() {

    const navigate = useNavigate()
	const GlobalState = useContext(StateContext)

    const initialState = {
        dataIsLoading: true,
        agenciesList: [],
    }

    function ReducerFunction(draft, action) {
        switch(action.type) {       
            case 'catchAgencies':
                draft.agenciesList = action.agenciesArray
                break

            case 'loadingDone':
                draft.dataIsLoading = false
                break
            
        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)

    // Request to Get All Profiles
    useEffect(() => {
		async function GetAgencies() {
			try {
				const response = await Axios.get(
					`http://localhost:8000/api/profiles/`
				)
				// console.log(response.data)
				console.log('Dispatching catchAgencies action with data:', response.data)
				dispatch({
					type: 'catchAgencies',
					agenciesArray: response.data,
				})
                dispatch({type: 'loadingDone'})
			}
			catch(e) {
				console.log(e.response)
			}
		}  
		GetAgencies()
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
        <Grid container justifyContent='flex-start' spacing={2} sx={{ padding: '10px'}}>
            {state.agenciesList.map((agency) => {
                const PropertiesDisplay = () => {
                    if (agency.seller_listings.length === 0) {
                        return <Button disabled size="small">No Property Listed</Button>
                    }
                    else if ( agency.seller_listings.length === 1) {
                        return <Button size="small" onClick={() => navigate(`/agencies/${agency.seller}`)}>1 Property Listed</Button>
                    }
                    else {
                        return <Button size="small" onClick={() => navigate(`/agencies/${agency.seller}`)}>{agency.seller_listings.length} Properties Listed</Button>
                    }
                }

                if (agency.agency_name && agency.phone_number) {
                    return (
                        <Grid key={agency.id} item sx={{ marginTop: '1rem', maxWidth: '20rem' }}>
                            <Card>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={agency.profile_picture ? agency.profile_picture : defaultProfilePicture}
                                    title="Profile Picture"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {agency.agency_name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {agency.bio.substring(0, 100)}...
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {PropertiesDisplay()}
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                }
            })}
        </Grid>
    )
}

export default Agencies