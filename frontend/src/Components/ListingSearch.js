import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// MUI 
import { Button, Typography, Grid, AppBar, Toolbar, IconButton } from '@mui/material'
import CustomCard from './CustomCard'

// Assets
import city from './Assets/city.jpg'


function ListingSearch() {
    const [btnColor, setBtnColor] = useState('error')
    const [listingType, setListingType] = useState('');
    const [area, setArea] = useState('');
    const [borough, setBorough] = useState('');
    const [priceRange, setPriceRange] = useState('');

    const handleSearch = async () => {
        try {
            const response = await Axios.get('/api/properties/', {
                params: {
                    listing_type: listingType,
                    area: area,
                    borough: borough,
                    price_range: priceRange,
                },
            });
            // Handle the response data as needed
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error.response);
        }
    };
    
    return (
        <>
            <div style={{position: 'relative'}}>
                <img src={city} style={{width: '100%', height: '92vh'}}/>
                <div style={{position: 'absolute', zIndex:'100', top: '100px', left: '20px', textAlign: 'center'}}>
                    <Typography variant='h1' sx={{color: 'white', fontWeight: 'bolder'}}>
                        Find your <span style={{color: 'green'}}>Next Property</span> on Stella
                    </Typography>
                    <Button 
                    variant='contained' 
                    sx={{
                        fontSize: '3.5rem', 
                        borderRadius: '15px', 
                        backgroundColor: 'green', 
                        marginTop: '2rem', 
                        boxShadow: '3px 3px 3px white'
                        }}>See all Properties</Button>
                </div>
            </div>
        </>
    )
}

export default ListingSearch