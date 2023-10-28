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
	FormControlLabel,
	Checkbox
} from '@mui/material'


const areaOptions = [
	{
	  value: '',
	  label: '',
	},
	{
	  value: 'Inner London',
	  label: 'Inner London',
	},
	{
	  value: 'Outer London',
	  label: 'Outer London',
	}
]


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

			case 'catchPropertyStatusChange':
				draft.propertyStatusValue = action.propertyStatusChosen
				break

			case 'catchPriceChange':
				draft.priceValue = action.priceChosen
				break

			case 'catchRentalFrequencyChange':
				draft.rentalFrequencyValue = action.rentalFrequencyChosen
				break
			
			case 'catchRoomsChange':
				draft.roomsValue = action.roomsChosen
				break

			case 'catchFurnishedChange':
				draft.furnishedValue = action.furnishedChosen
				break

			case 'catchPoolChange':
				draft.poolValue = action.poolChosen
				break

			case 'catchElevatorChange':
				draft.elevatorValue = action.elevatorChosen
				break

			case 'catchCctvChange':
				draft.cctvValue = action.cctvChosen
				break
			
			case 'catchParkingChange':
				draft.parkingValue = action.parkingChosen
				break

			case 'catchPicture1Change':
				draft.picture1Value = action.picture1Chosen
				break

			case 'catchPicture2Change':
				draft.picture2Value = action.picture2Chosen
				break

			case 'catchPicture3Change':
				draft.picture3Value = action.picture3Chosen
				break
				
			case 'catchPicture4Change':
				draft.picture4Value = action.picture4Chosen
				break

			case 'catchPicture5Change':
				draft.picture5Value = action.picture5Chosen
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
			width: '75%',
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
						variant="standard" 
						fullWidth
						value={state.titleValue}
						onChange={(e) => dispatch({type: 'catchTitleChange', titleChosen: e.target.value})}/>
				</Grid>

				<Grid item container sx={{ marginTop: '1rem' }}>
					<TextField 
						id="ListingType" 
						label="Listing Type" 
						variant="standard" 
						fullWidth
						value={state.listingTypeValue}
						onChange={(e) => 
							dispatch({
								type: 'catchListingTypeChange', 
								listingTypeChosen: e.target.value
								})
							}
					/>
				</Grid>

				<Grid item container sx={{ marginTop: '1rem' }}>
					<TextField 
						id="description" 
						label="Description" 
						variant="standard" 
						fullWidth
						value={state.descriptionValue}
						onChange={(e) => 
							dispatch({
								type: 'catchDescriptionChange', 
								descriptionChosen: e.target.value
								})
							}
					/>
				</Grid>


				<Grid item container sx={{ marginTop: '1rem' }}>
					<TextField 
						id="propertyStatus" 
						label="Property Status" 
						variant="standard" 
						fullWidth
						value={state.propertyStatusValue}
						onChange={(e) => 
							dispatch({
								type: 'catchPropertyStatusChange', 
								propertyStatusChosen: e.target.value
								})
							}
					/>
				</Grid>

				<Grid item container sx={{ marginTop: '1rem' }}>
					<TextField 
						id="price" 
						label="Price" 
						variant="standard" 
						fullWidth
						value={state.priceValue}
						onChange={(e) => 
							dispatch({
								type: 'catchPriceChange', 
								priceChosen: e.target.value
								})
							}
					/>
				</Grid>

				<Grid item container sx={{ marginTop: '1rem' }}>
					<TextField 
						id="rentalFrequency" 
						label="Rental Frequency" 
						variant="standard" 
						fullWidth
						value={state.rentalFrequencyValue}
						onChange={(e) => 
							dispatch({
								type: 'catchRentalFrequencyChange', 
								rentalFrequencyChosen: e.target.value
								})
							}
					/>
				</Grid>

				<Grid item container sx={{ marginTop: '1rem' }}>
					<TextField 
						id="rooms" 
						label="Rooms" 
						variant="standard" 
						fullWidth
						value={state.roomsValue}
						onChange={(e) => 
							dispatch({
								type: 'catchRoomsChange', 
								roomsChosen: e.target.value
								})
							}
					/>
				</Grid>

				<Grid item container sx={{ marginTop: '1rem' }}>
					<FormControlLabel 
						control={
							<Checkbox checked={state.furnishedValue} 
								onChange={(e) => 
									dispatch({
										type: 'catchFurnishedChange',
										furnishedChosen: e.target.checked
									})
								} 
							/>
						} 
						label="Furnished" 
					/>
				</Grid>


				<Grid item container sx={{ marginTop: '1rem' }}>
					<FormControlLabel 
						control={
							<Checkbox checked={state.poolValue} 
								onChange={(e) => 
									dispatch({
										type: 'catchPoolChange',
										poolChosen: e.target.checked
									})
								} 
							/>
						} 
						label="Pool" 
					/>
				</Grid>

				<Grid item container sx={{ marginTop: '1rem' }}>
					<FormControlLabel 
						control={
							<Checkbox checked={state.cctvValue} 
								onChange={(e) => 
									dispatch({
										type: 'catchCctvChange',
										cctvChosen: e.target.checked
									})
								} 
							/>
						} 
						label="Cctv" 
					/>
				</Grid>

				<Grid item container sx={{ marginTop: '1rem' }}>
					<FormControlLabel 
						control={
							<Checkbox checked={state.parkingValue} 
								onChange={(e) => 
									dispatch({
										type: 'catchParkingChange',
										parkingChosen: e.target.checked
									})
								} 
							/>
						} 
						label="Parking" 
					/>
				</Grid>

				<Grid item container justifyContent='space-between'>
				<Grid item xs={5} sx={{ marginTop: '1rem' }}>
					<TextField 
						id="area" 
						label="Area" 
						variant="standard" 
						fullWidth
						value={state.areaValue}
						onChange={(e) => 
							dispatch({
								type: 'catchAreaChange', 
								areaChosen: e.target.value
							})
						}
						select
						SelectProps={{
							native:true
						}}


						// <select>
						// 	{areaOptions.map((option) => (
						// 		<option key={option.value} value={option.value}>
						// 		{option.label}
						// 		</option>
						// 	))}
						// </select>

					>

						{areaOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
						
					</TextField>
				</Grid>

				<Grid item xs={5} sx={{ marginTop: '1rem' }}>
					<TextField 
						id="borough" 
						label="Borough" 
						variant="standard" 
						fullWidth
						value={state.boroughValue}
						onChange={(e) => 
							dispatch({
								type: 'catchBoroughChange', 
								boroughChosen: e.target.value
								})
							}
					/>
				</Grid>

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