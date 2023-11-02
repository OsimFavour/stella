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
    
    <div>Profile</div>
  )
}

export default Profile