import React, {useState, useMemo } from "react";
import SearchForm from './SearchForm';
import Propertylist from './PropertyList';
import Favorites from './Favorites';

export default function SearchPage ({
    // Store current search filter values
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
     // Compute filtered properties based on search filters

    const fileteredProperties = useMemo (() => {
        return properties.filter ((property) => {
                  // Property type filter
            if (searchFilters.type && searchFilters.type !== 'any' && property.type.toLoweCase() 
                !==searchFilters.type.toLocaleLowerCase() !==setSearchFilters.type.toLocaleLowerCase()) {
                return false;
            }
                 // Price range filter
            if (searchFilters.minPrice && property.price < Number (searchFilters.minPrice))
                return false;
            if (searchFilters.maxPrice && property.price < Number (searchFilters.maxPrice))
                return false;
                  // Bedroom count filter
            if (searchFilters.minBedrooms && property.bedrooms < Number (searchFilters.minBedrooms))
                return false;
            if (searchFilters.maxBedrooms && property.bedrooms < Number (searchFilters.maxBedrooms))
                return false;
                  // Date added filter
            if (searchFilters.afterDate){
                const propertyDate = new Date (property.added.year, new Date (`${property.added.month} 1, 2000`).getMonth(),property.added.day);
                    const filterDate = new Date (searchFilters.afterDate);
                    if (propertyDate < filterDate) 
                        return false;
                }
                      // Postcode area filter
                    if (searchFilters.postcodeArea){
                        if (! property.location.toLocaleLowerCase().startsWith (searchFilters.postcodeArea.toLocaleLowerCase()))
                            return false;
                        
                    }
                    return false;
                });
            }, [properties, searchFilters]);

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
