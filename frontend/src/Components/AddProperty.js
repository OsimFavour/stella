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
    TextField
} from '@mui/material'


function AddProperty() {
	const navigate = useNavigate()

	const initialState = {
        titleValue: '',
		listingTypeValue: '',
		descriptionValue: '',
		areaValue: '',
		boroughValue: '',
		latitudeValue: '',
		longitudeValue: '',
		propertyStatusValue: '',
		priceValue: '',
		rentalFrequencyValue: '',
		roomsValue: '',
		furnishedValue: false,
		poolValue: false,
		elevatorValue: false,
		cctvValue: false,
		parkingValue: false,
		picture1Value: '',
		picture2Value: '',
		picture3Value: '',
		picture4Value: '',
		picture5Value: '',
    }

    function ReducerFunction(draft, action) {
        switch(action.type) {
            case 'catchTitleChange':
                draft.titleValue = action.titleChosen
                break

			case 'catchListingTypeChange':
				draft.listingTypeValue = action.listingTypeChosen
				break

			case 'catchDescriptionChange':
				draft.descriptionValue = action.descriptionChosen
				break

			case 'catchAreaChange':
				draft.areaValue = action.areaChosen
				break

			case 'catchBoroughChange':
				draft.boroughValue = action.boroughChosen
				break

			case 'catchLatitudeChange':
				draft.latitudeValue = action.latitudeChosen
				break
			
			case 'catchLongitudeChange':
				draft.longitudeValue = action.longitudeChosen
				break

			case 'catchPriceChange':
				draft.priceValue = action.priceChosen
				break

			case 'catchPropertyStatusChange':
				draft.propertyStatusValue = action.propertyStatusChosen
				break

			case 'catchPropertyStatusChange':
				draft.propertyStatusValue = action.propertyStatusChosen
				break

			case 'catchPropertyStatusChange':
				draft.propertyStatusValue = action.propertyStatusChosen
				break
        }
    }

    // const [state, dispatch] = useReducer(ReducerFunction, initialState)
    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)

	function formSubmit(e) {
        e.preventDefault()
        console.log('The form has been submitted')
        // dispatch({type: 'changeSendRequest'})
    }

	return (
		<div style={{ 
			width: '50%',
			marginLeft: 'auto',
			marginRight: 'auto',
			border: '5px solid white' }}>
			<form onSubmit={formSubmit}>
				<Grid item container justifyContent='center' sx={{ marginTop: '1rem' }}>
					<Typography variant='h4'>Submit A Property</Typography>
				</Grid>
				
				<Grid item container sx={{ marginTop: '1rem' }}>
					<TextField 
						id="title" 
						label="Title" 
						variant="outlined" 
						fullWidth
						value={state.titleValue}
						onChange={(e) => dispatch({type: 'catchTitleChange', titleChosen: e.target.value})}/>
				</Grid>
	
				<Grid item container xs={8} sx={{ 
					marginTop: '1rem',
					marginLeft: 'auto',
					marginRight: 'auto',
					fontSize: '1.1rem' }}>
					<Button variant='contained' type='submit' fullWidth>Submit</Button>
				</Grid>
		   
			</form>

		</div>
	)
}

export default AddProperty