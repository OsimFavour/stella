import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'
import Axios from 'axios'

// MUI 
import { Button, Typography, Grid, TextField, Toolbar, IconButton } from '@mui/material'
import CustomCard from './CustomCard'

// Assets
import city from './Assets/city.jpg'

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

const innerLondonOptions = [
	{
		value: "",
		label: "",
	},
	{
		value: "Camden",
		label: "Camden",
	},
	{
		value: "Greenwich",
		label: "Greenwich",
	},
	{
		value: "Hackney",
		label: "Hackney",
	},
	{
		value: "Hammersmith and Fulham",
		label: "Hammersmith and Fulham",
	},
	{
		value: "Islington",
		label: "Islington",
	},
	{
		value: "Kensington and Chelsea",
		label: "Kensington and Chelsea",
	},
	{
		value: "Lambeth",
		label: "Lambeth",
	},
	{
		value: "Lewisham",
		label: "Lewisham",
	},
	{
		value: "Southwark",
		label: "Southwark",
	},
	{
		value: "Tower Hamlets",
		label: "Tower Hamlets",
	},
	{
		value: "Wandsworth",
		label: "Wandsworth",
	},
	{
		value: "Westminster",
		label: "Westminster",
	},
	{
		value: "City of London",
		label: "City of London",
	},
];

const outerLondonOptions = [
	{
		value: "",
		label: "",
	},
	{
		value: "Barking and Dangenham",
		label: "Barking and Dangenham",
	},
	{
		value: "Barnet",
		label: "Barnet",
	},
	{
		value: "Bexley",
		label: "Bexley",
	},
	{
		value: "Brent",
		label: "Brent",
	},
	{
		value: "Bromley",
		label: "Bromley",
	},
	{
		value: "Croydon",
		label: "Croydon",
	},
	{
		value: "Ealing",
		label: "Ealing",
	},
	{
		value: "Enfield",
		label: "Enfield",
	},
	{
		value: "Haringey",
		label: "Haringey",
	},
	{
		value: "Harrow",
		label: "Harrow",
	},
	{
		value: "Havering",
		label: "Havering",
	},
	{
		value: "Hillingdon",
		label: "Hillingdon",
	},
	{
		value: "Hounslow",
		label: "Hounslow",
	},
	{
		value: "Kingston upon Thames",
		label: "Kingston upon Thames",
	},
	{
		value: "Merton",
		label: "Merton",
	},
	{
		value: "Newham",
		label: "Newham",
	},
	{
		value: "Redbridge",
		label: "Redbridge",
	},
	{
		value: "Richmond upon Thames",
		label: "Richmond upon Thames",
	},
	{
		value: "Sutton",
		label: "Sutton",
	},
	{
		value: "Waltham Forest",
		label: "Waltham Forest",
	},
]

const listingTypeOptions = [
	{
		value: '',
		label: ''
	},
	{
		value: 'Apartment',
		label: 'Apartment'
	},
	{
		value: 'House',
		label: 'House'
	},
	{
		value: 'Office',
		label: 'Office'
	},
]

function ListingSearch() {
    const initialState = {
        listingType: '',
        area: '',
        borough: '',
        price: '',
        // searchText: ''
    }

    function ReducerFunction(draft, action) {
        switch(action.type) {  

            case 'setListingType':
                draft.listingType = action.newListingType
                break

            case 'setArea':
                draft.area = action.newArea
                break

            case 'setBorough':
                draft.borough = action.newBorough
                break

            case 'setPrice':
                draft.price = action.newPrice
                break 

            case 'updateSendRequest':
                draft.sendRequest = draft.sendRequest + 1
                break

            // case 'setSearchText':
            //     action.searchText = action.newSearchText
            //     break
        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)

    useEffect(() => {
        if (state.sendRequest) {
            handleSearch()
        }
    }, [state.sendRequest])

    const handleSearch = async () => {
        try {
            const response = await Axios.get('/api/listings', {
                params: {
                    listing_type: state.listingType,
                    area: state.area,
                    borough: state.borough,
                    price: state.price,
                },
            });
            // Handle the response data as needed
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error.response);
        }
    };

    const FormSubmit = (e) => {
        e.preventDefault()
        console.log('The form has been submitted')
        dispatch({type: 'changeSendRequest'})
        // dispatch({type: 'disableButton'})
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
                            id="listingType" 
                            label="Listing Type*" 
                            variant="outlined" 
                            fullWidth
                            value={state.listingType}
                            onChange={(e) => 
                                dispatch({
                                    type: 'setListingType', 
                                    newListingType: e.target.value
                                })
                            }
                            select
							SelectProps={{
								native:true
							}}
                        >
                            {listingTypeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                        </TextField>
                    </Grid>

                    <Grid item container sx={{ marginTop: '1rem' }}>
                        <TextField 
                            id="area" 
                            label="Area*" 
                            variant="outlined" 
                            fullWidth
                            value={state.area}
                            onChange={(e) => 
                                dispatch({
                                    type: 'setArea', 
                                    newArea: e.target.value
                                })
                            }
                            select
							SelectProps={{
								native:true
							}}
                        >
                            {areaOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                                ))
                            }

                        </TextField>
                    </Grid>

                    <Grid item container sx={{ marginTop: '1rem' }}>
                        <TextField 
                            id="borough" 
                            label="Borough" 
                            variant="outlined" 
                            fullWidth
                            value={state.bioValue}
                            onChange={(e) => 
                                dispatch({
                                    type: 'setBorough', 
                                    newBorough: e.target.value
                                })
                            }
                            select
							SelectProps={{
								native:true
							}}
                        >
                            {state.area === 'Inner London' 
                                    ? innerLondonOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))
                                :''}

                            {state.area === 'Outer London' 
                                    ? outerLondonOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))
                                :''}
								
						</TextField>
                    </Grid>

                    <Grid item container sx={{ marginTop: '1rem' }}>
                        <TextField 
                            id="price" 
                            type='number'
                            label="Price *" 
                            variant="outlined" 
                            fullWidth
                            value={state.price}
                            onChange={(e) => 
                                dispatch({
                                    type: 'setPrice', 
                                    newPrice: e.target.value
                                })
                            }
                        />
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
                            disabled={state.disabledBtn}
                        >Search</Button>
                    </Grid>
            
                </form>
                {/* This sent a message to the frontend */}
                
                {/* <Snackbar
                    open={state.openSnack}
                    message="You have successfully updated your profile!"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                /> */}
            
            </div>
        </>
    )
}

export default ListingSearch