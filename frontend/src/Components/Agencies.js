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
        <div>
            {state.agenciesList.map((agency) => {
                if (agency.agency_name && agency.phone_number) {
                    return <li>{agency.agency_name}</li>
                }
            })}
        </div>
    )
}

export default Agencies