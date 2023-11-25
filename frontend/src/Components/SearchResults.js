// SearchResults.js
import React from 'react'
import { useLocation } from 'react-router-dom'

const SearchResults = () => {
    const location = useLocation();
    console.log('Location:', location)
    const listings = location.state?.listings || [];
    console.log('Listings: ', listings)
    return (
        <div>
        <h2>Search Results</h2>
        
        <ul>
            {listings && listings.map((listing) => (
            <li key={listing.id}>
                {listing.listing_type} - {listing.area} - {listing.borough} - ${listing.price}
            </li>
            ))}
        </ul>
        </div>
    );
};

export default SearchResults;
