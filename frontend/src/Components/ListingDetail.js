import React, {useEffect, useState, useRef, useMemo, useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'
import Axios from 'axios'

// Contexts
import StateContext from '../Contexts/StateContext'

// Assets
import defaultProfilePicture from './Assets/defaultProfilePicture.jpg'

// React Leaflet
import { MapContainer, TileLayer, Marker, Popup, useMap, Polygon } from 'react-leaflet'


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
import RoomIcon from '@mui/icons-material/Room'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'


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
        sellerProfileInfo: ''
    }

    function ReducerFunction(draft, action) {
        switch(action.type) {       
            case 'catchListingInfo':
                draft.listingInfo = action.listingObject
                break

            case 'loadingDone':
                draft.dataIsLoading = false
                break

            case 'catchSellerProfileInfo':
                draft.sellerProfileInfo = action.profileObject
                break
            
        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)


    // REQUEST TO GET LISTING INFO
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
			}
			catch(e) {
            console.log(e.response)
			}
		}  
		GetListingInfo()
	}, [])


    // REQUEST TO GET PROFILE INFO
    useEffect(() => {
        if (state.listingInfo) {
            async function GetProfileInfo() {
                try {
                    const response = await Axios.get(
                        `http://localhost:8000/api/profiles/${state.listingInfo.seller}/`
                    )
                    // console.log(response.data)
                    console.log('Dispatching catchUserProfileInfo action with data:', response.data)
                    dispatch({
                        type: 'catchSellerProfileInfo',
                        profileObject: response.data,
                    })
                    dispatch({type: 'loadingDone'})
                }
                catch(e) {
                    console.log(e.response)
                }
            }  
            GetProfileInfo()
        }
	}, [state.listingInfo])

    
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

    const date = new Date(state.listingInfo.date_posted)
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

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
                    {/* {currentPicture} */}
                </Grid>
            ) : ''}

            {/* MORE INFORMATION */}
            
            <Grid item container sx={{ padding: '1rem', marginTop: '1rem'}}>
                <Grid item container xs={7} direction='column' spacing={1}>
                    <Grid item>
                        <Typography variant='h5'>{state.listingInfo.title}</Typography>
                    </Grid>
                    <Grid item>
                        <RoomIcon/> <Typography variant='h6'>{state.listingInfo.borough}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='subtitle1'>{formattedDate}</Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={5} alignItems='center'>
                    <Typography
                        variant='h6'
                        sx={{ fontWeight: 'bolder', color: 'green' }}>
                        {state.listingInfo.listing_type} | 
                        {' '}{state.listingInfo.property_status === 'Sale' ? 
                        state.listingInfo.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 
                        `${state.listingInfo.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/${
                            state.listingInfo.rental_frequency
                        }`}
                    </Typography>
                </Grid>
            </Grid>

            <Grid item container justifyContent='flex-start' sx={{ padding: '1rem', marginTop: '1rem'}}>

                {state.listingInfo.rooms ? (
                    <Grid item xs={2} sx={{ display: 'flex' }}>
                        <Typography variant='h6'>{state.listingInfo.rooms} Rooms</Typography>
                    </Grid>
                ) : ( 
                    ''
                )}

                {state.listingInfo.furnished ? (
                    <Grid item xs={2} sx={{ display: 'flex' }}>
                        <CheckBoxIcon sx={{ color: 'green', fontSize: '2rem' }}/> <Typography variant='h6'>Furnished</Typography>
                    </Grid>
                ) : ( 
                    ''
                )}

                {state.listingInfo.pool ? (
                    <Grid item xs={2} sx={{ display: 'flex' }}>
                        <CheckBoxIcon sx={{ color: 'green', fontSize: '2rem' }}/> <Typography variant='h6'>Pool</Typography>
                    </Grid>
                ) : ( 
                    ''
                )}

                {state.listingInfo.elevator ? (
                    <Grid item xs={2} sx={{ display: 'flex' }}>
                        <CheckBoxIcon sx={{ color: 'green', fontSize: '2rem' }}/> <Typography variant='h6'>Elevator</Typography>
                    </Grid>
                ) : ( 
                    ''
                )}

                {state.listingInfo.cctv ? (
                    <Grid item xs={2} sx={{ display: 'flex' }}>
                        <CheckBoxIcon sx={{ color: 'green', fontSize: '2rem' }}/> <Typography variant='h6'>CC Tv</Typography>
                    </Grid>
                ) : ( 
                    ''
                )}

                {state.listingInfo.parking ? (
                    <Grid item xs={2} sx={{ display: 'flex' }}>
                        <CheckBoxIcon sx={{ color: 'green', fontSize: '2rem' }}/> <Typography variant='h6'>Parking</Typography>
                    </Grid>
                ) : ( 
                    ''
                )}

            </Grid>

            {/* DESCRIPTION */}

            {state.listingInfo.description ? (
                <Grid item sx={{ padding: '1rem', marginTop: '1rem'}}>
                    <Typography variant='h5'>Description</Typography>
                    <Typography variant='h6'>{state.listingInfo.description}</Typography>
                </Grid>
            ) : ''}


            {/* SELLERS INFO */}

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
                                style={{ height: '2rem', width: '9rem', cursor: 'pointer' }} 
                                src={state.sellerProfileInfo.profile_picture !== null ? state.sellerProfileInfo.profile_picture : defaultProfilePicture}
                                onClick={() => navigate(`/agencies/${state.sellerProfileInfo.seller}`)}
                            />
                        </Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography variant='h6' ml={1.5}>{state.sellerProfileInfo.agency_name}!</Typography>
                        <Typography variant='p' mr={4}>
                            <IconButton sx={{ fontSize: '0.9rem' }} size="small">
                                <LocalPhoneIcon/> {state.sellerProfileInfo.phone_number}
                            </IconButton>
                        </Typography>
                        {/* <Grid item style={{ marginTop: '1rem', padding: '5px'}}>
                            {state.sellerProfileInfo.bio}
                        </Grid> */}
                    </Grid>
                </Grid>
            </StyledPaper>

            {/* MAP */}
            <Grid item container sx={{ marginTop: '4rem' }}>
                <Grid item xs={3}>
                    Points of Interests
                </Grid>
                <Grid item xs={9} sx={{ height: '35rem' }}>
                    <MapContainer 
						center={[51.505, -0.09]} 
						zoom={14} 
						scrollWheelZoom={true}
					>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<TheMapComponent/>
						{BoroughDisplay()}

						<Marker
							draggable
							eventHandlers={eventHandlers}
							position={state.markerPosition}
							ref={markerRef}>
						</Marker>
						{/* <Polygon positions={Camden}/> */}
					</MapContainer>
                </Grid>
            </Grid>

        </div>
    )
}

export default ListingDetail