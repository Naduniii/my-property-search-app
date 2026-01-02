import React, {useState, useMemo } from "react";
import SearchForm from './SearchForm';
import Propertylist from './PropertyList';
import Favorites from './Favorites';

export default function SearchPage ({
    properties,
    favorites,
    addFavourite,
    removeFavorite,
    clearFavorites
}) {
    const  [searchFilters, setSearchFilters] = useState ({
        type: '',
        minPrice: '',
        maxPrice: '',
        minBedrooms: '',
        maxBedrooms: '',
        afterDate: '',
        postcodeArea: '',
    });

    return (
        <div className="App" style={{display: 'flex',gap: '1rem'}}>
            <div style = {{flex: '1 1 65%'}}>
                <h1>Property Search</h1>

            <SearchForm
                searchFilters={searchFilters}
                setSearchFilters={setSearchFilters}
                />
            <Propertylist
                properties = {fileteredProperties}
                favorites = {favorites}
                addFavourite = {addFavourite}
                removeFavorite = {removeFavorite}
                />
                </div>
            
            <Favorites
                favorites = {favorites}
                addFavourite = {addFavourite}
                removeFavorite = {removeFavorite}
                clearFavorites = {clearFavorites} />

            </div>
    );
}
