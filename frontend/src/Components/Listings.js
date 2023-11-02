import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import { useImmerReducer } from 'use-immer'

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
    IconButton,
    CardActions
} from '@mui/material'
import RoomIcon from '@mui/icons-material/Room'

// React Leaflet
import { MapContainer, TileLayer, useMap, Marker, Popup, Polyline, Polygon } from 'react-leaflet'
import { Icon } from 'leaflet'

// Map Icons
import houseIconPng from './Assets/Mapicons/house.png'
import apartmentIconPng from './Assets/Mapicons/apartment.png'
import officeIconPng from './Assets/Mapicons/office.png'

// Assets
import img1 from './Assets/img1.jpg'
import myListings  from './Assets/Data/Dummydata'

// Shape
import polygonOne from './Shape'


function Listings() {

    // let url = 'http://localhost:8000/api/listings/'
    // fetch(url).then(response => response.json()).then(data => console.log(data))

    const houseIcon = new Icon({
        iconUrl: houseIconPng,
        iconSize: [40, 40]
    })

    const apartmentIcon = new Icon({
        iconUrl: apartmentIconPng,
        iconSize: [40, 40]
    })

    const officeIcon = new Icon({
        iconUrl: officeIconPng,
        iconSize: [40, 40]
    })

    const [latitude, setLatitude] = useState(51.4874086523002)
    const [longitude, setLongitude] = useState(-0.12667052265135625)

    const initialState = {
		mapInstance: null,
    } 

    function ReducerFunction(draft, action) {
        switch(action.type) {
			case 'getMap':
				draft.mapInstance = action.mapData
				break
        }
    }

    // const [state, dispatch] = useReducer(ReducerFunction, initialState)
    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)

	function TheMapComponent() {
		const map = useMap()
		dispatch({ type: 'getMap', mapData: map })
		return null
	}

    function GoEast() {
        setLatitude(51.46567014039476) 
        setLongitude(0.2596173538795676) 
    }

    function GoCenter() {
        setLatitude(51.4874086523002) 
        setLongitude(-0.12667052265135625) 
    }

    const polyOne = [
        [51.505, -0.09],
        [51.51, -0.1],
        [51.51, -0.12],
    ]

    // console.log(myListings)

    const [allListings, setAllListings] = useState([])
    const [dataIsLoading, setDataIsLoading] = useState(true)

    useEffect(() => {
        const source = Axios.CancelToken.source()
        async function GetAllListings() {
            try {
                let url = 'http://localhost:8000/api/listings/'
                const response = await Axios.get(url, { cancelToken: source.token })
                // console.log(response.data)
                setAllListings(response.data)
                setDataIsLoading(false)
            }
            catch (error) {
                console.log(error.response)
            }
        }
        GetAllListings()
        return () => {source.cancel()}
    }, [])

    // console.log(allListings)

    if (dataIsLoading === false) {
        console.log(allListings[0].location)
    }

    if (dataIsLoading === true) {
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
    <Grid container>
        <Grid item xs={4}>
            {/* <Button onClick={GoEast}>Go East</Button> 
            <Button onClick={GoCenter}>Go Center</Button>*/}
           {allListings.map((listing) => {
            return (
                <Card key={listing.id} sx={{
                    margin: '0.5rem', 
                    border: '1px solid black',
                    position: 'relative'
                    }}>
                    <CardHeader
                        action={
                        // The flyTo method takes two arguments
                        // i.e. A pair of cordinates and a zoom level
                        <IconButton 
                            aria-label="settings" 
                            onClick={() => 
                                state.mapInstance.flyTo(
                                    [listing.latitude, listing.longitude],
                                    16
                                )
                            }
                        >
                            <RoomIcon />
                        </IconButton>
                        }
                        title={listing.title}
                    />
                    <CardMedia
                        sx={{paddingRight: '1rem',
                            paddingLeft: '1rem',
                            height: '20rem',
                            width: '30rem'}}
                        component="img"
                        image={listing.picture1}
                        alt={listing.title}
                    />
                    <CardContent>
                        <Typography variant="body2">
                            {listing.description.substring(0, 200)}... 
                        </Typography>
                    </CardContent>

                    {listing.property_status === 'Sale' ? (
                       <Typography sx={{
                            position:'absolute', 
                            backgroundColor: 'green',
                            zIndex: '1000',
                            color: 'white',
                            top: '100px',
                            left: '20px',
                            padding: '5px'
                        }}>
                            {listing.listing_type}: 
                            ${listing.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Typography> 
                    ) : (
                        <Typography sx={{
                            position:'absolute', 
                            backgroundColor: 'green',
                            zIndex: '1000',
                            color: 'white',
                            top: '100px',
                            left: '20px',
                            padding: '5px'
                        }}>
                            {listing.listing_type}: 
                            ${listing.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                            / {listing.rental_frequency}
                        </Typography>
                    )}
                    
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            {listing.seller_username}
                        </IconButton>
                    </CardActions>
                </Card>
            )
           })}
        </Grid>
        <Grid item xs={8} sx={{marginTop: '0.5rem'}}>
            <AppBar position='sticky'>
                <div style={{height: '100vh'}}>
                    {/* Center has an array of latitude and longitude */}
                    <MapContainer center={[51.505, -0.09]} zoom={14} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <TheMapComponent/>

                    {allListings.map((listing) => {
                        function IconDisplay() {
                            if (listing.listing_type === 'House') {
                                return houseIcon
                            }
                            else if (listing.listing_type === 'Apartment') {
                                return apartmentIcon
                            }
                            else if (listing.listing_type === 'Office') {
                                return officeIcon
                            }
                        }
                        return (
                            <Marker
                            key={listing.id}
                            icon={IconDisplay()}
                            position={[
                                listing.latitude,
                                listing.longitude
                            ]}>
                                <Popup>
                                    <Typography variant='h5'>{listing.title}</Typography>
                                    <img src={listing.picture1} style={{height: '14rem', width: '18rem'}}/>
                                    <Typography variant='body1'>
                                        {listing.description.substring(0, 150)}...
                                    </Typography>
                                    <Button variant='contained' fullWidth>Details</Button>
                                </Popup>
                            </Marker>
                        )
                    })}
                    {/* <Marker 
                    icon={officeIcon}
                    position={[latitude, longitude]}>
                        
                    </Marker> */}
                    </MapContainer>
                </div>
            </AppBar>
        </Grid>
    </Grid>
  )
}

export default Listings