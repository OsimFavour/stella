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
    CardActions, 
    CardMedia, 
    CardContent,
    CircularProgress,
    Paper,
    TextField,
	FormControlLabel,
	Checkbox,
    IconButton,
    Breadcrumbs,
    Link
} from '@mui/material'

import { styled } from '@mui/material/styles'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
  }));


function ListingDetail() {

    const navigate = useNavigate()
	const GlobalState = useContext(StateContext)

    // console.log(useParams())

    const params = useParams()

    const initialState = {
        dataIsLoading: true,
        listingInfo: '',
    }

    function ReducerFunction(draft, action) {
        switch(action.type) {       
            case 'catchListingInfo':
                draft.listingInfo = action.listingObject
                break

            case 'loadingDone':
                draft.dataIsLoading = false
                break
            
        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)


    // Request to Get Listing Info
    useEffect(() => {
		async function GetListingInfo() {
			try {
				const response = await Axios.get(
					`http://localhost:8000/api/listings/${params.id}/`
				)
				// console.log(response.data)
				console.log('Dispatching catchUserListingInfo action with data:', response.data)
				dispatch({
					type: 'catchListingInfo',
					listingObject: response.data,
				})
                dispatch({type: 'loadingDone'})
			}
			catch(e) {
				console.log(e.response)
			}
		}  
		GetListingInfo()
	}, [])

    const listingPictures = [
        state.listingInfo.picture1,
        state.listingInfo.picture2,
        state.listingInfo.picture3,
        state.listingInfo.picture4,
        state.listingInfo.picture5,
    ].filter((picture) => picture !== null)
    // The arrow function returns only pictures that are not NULL

    const [currentPicture, setCurrentPicture] = useState(0)

    const PreviousPicture = () => {
        if (currentPicture === 0) {
            return setCurrentPicture(listingPictures.length - 1)
        }
        else {
            return setCurrentPicture(currentPicture - 1)
        }
    }

    const NextPicture = () => {
        if (currentPicture === listingPictures.length - 1) {
            return setCurrentPicture(0)
        }
        else {
            return setCurrentPicture(currentPicture + 1)
        }
    }

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
        
        <div style={{ marginLeft: '2rem', marginRight: '2rem', marginBottom: '2rem'}}>
            <Grid item sx={{marginTop: '1rem'}}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" sx={{cursor: 'pointer'}} onClick={() => navigate('/listings')}>
                        Listings
                    </Link>
                    
                    <Typography color="text.primary">{state.listingInfo.title}</Typography>
                </Breadcrumbs>
            </Grid>

            {/* IMAGE SLIDER */}
            {listingPictures.length > 0 ? (
                <Grid item container justifyContent='center' sx={{position: 'relative', marginTop: '1rem'}}>
                    {listingPictures.map((picture, index) => {
                        return (
                            <div key={index}>
                                {index === currentPicture ? <img src={picture} style={{ width: '45rem', height: '35rem'}}/> : ''}
                            </div>
                        )
                    })}
                    <ArrowCircleLeftIcon onClick={PreviousPicture} sx={{ position: 'absolute', cursor: 'pointer', fontSize: '3rem', color: 'white', top: '50%', left: '27.5%', '&:hover': {backgroundColor: 'green'}}}/>
                    <ArrowCircleRightIcon onClick={NextPicture} sx={{ position: 'absolute', cursor: 'pointer', fontSize: '3rem', color: 'white', top: '50%', right: '27.5%', '&:hover': {backgroundColor: 'green'}}}/>
                    {currentPicture}
                </Grid>
            ) : ''}
        </div>
    )
}

export default ListingDetail