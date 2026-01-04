import React, {useState, useMemo } from "react";
import SearchForm from './SearchForm';
import PropertyList from './PropertyList';
import Favorites from './Favorites';

export default function SearchPage ({
    // Store current search filter values
    properties,
    favorites,
    addFavorite,
    removeFavorite,
    clearFavorites
}) {
    const[searchFilters, setSearchFilters] = useState ({
        type: '',
        minPrice: '',
        maxPrice: '',
        minBedrooms: '',
        maxBedrooms: '',
        afterDate: '',
        postcodeArea: '',
    });
     // Compute filtered properties based on search filters

    const filteredProperties = useMemo(() => {
        return properties.filter((property) => {
                  // Property type filter
            if (searchFilters.type && searchFilters.type !== 'any' && property.type.toLowerCase() !== searchFilters.type.toLowerCase()) {
                return false;
            }
                 // Price range filter
            if (searchFilters.minPrice && property.price < Number (searchFilters.minPrice))
                return false;
            if (searchFilters.maxPrice && property.price > Number (searchFilters.maxPrice))
                return false;

                  // Bedroom count filter
            if (searchFilters.minBedrooms && property.bedrooms < Number (searchFilters.minBedrooms))
                return false;
            if (searchFilters.maxBedrooms && property.bedrooms > Number (searchFilters.maxBedrooms))
                return false;
              
                  // Date added filter
            if (searchFilters.afterDate){
                const propertyDate = new Date(property.added.year, new Date (`${property.added.month} 1, 2000`).getMonth(),property.added.day);
                const filterDate = new Date(searchFilters.afterDate);
                if (propertyDate < filterDate) 
                  return false;
                }
                      // Postcode area filter
            if (searchFilters.postcodeArea) {
                const parts = property.location.trim().split(" ");
                const propertyArea = parts[parts.length - 1].toLowerCase();   // e.g. "br5"

                if (!propertyArea.startsWith(searchFilters.postcodeArea.toLowerCase())) {
                  return false;
                }
            }

            return true;
       });
    }, [properties, searchFilters]);


    return (
    <div className="App" style={{ display: 'flex', gap: '1rem' }}>
      <div style={{ flex: '1 1 65%' }}>
        <h1>Property Search</h1>
        <SearchForm searchFilters={searchFilters} setSearchFilters={setSearchFilters} />
        <PropertyList
          properties={filteredProperties}
          favorites={favorites}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
        />
      </div>
      <Favorites favorites={favorites} addFavorite={addFavorite} removeFavorite={removeFavorite} clearFavorites={clearFavorites} />
    </div>
  );
}
