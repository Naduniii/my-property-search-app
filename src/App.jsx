import React, {useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Searchpage from './components/SearchPage';
import PropertyDetail from './components/PropertyDetail';
import propertiesData from './data/properties.json';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

function App() {
      // State to store favorite properties
  const [favourites, setFavourites] = useState ([]);
    // Add property to favorites if not already added
  function addFavorite (property) {
    setFavourites ((prev) => {
      if (prev.find((p) => p.id === property.id)) return prev;
      return [...prev, property];
    });
  }
    // Remove a property from favorites by ID
  function removeFavorite (id){
    setFavourites ((prev) => prev.filter((p) => p.id !== id));

  }
    // Clear all favorites
  function clearFavorites () {
    setFavourites([]);
  }
  return (
    <DndProvider backend = {HTML5Backend}>
      <BrowserRouter>
          <Routes>
           <Route
             path = "/"
             element={
              <Searchpage
                Properties={propertiesData.properties}
                favourites={favourites}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
                clearFavorites={clearFavorites}
              />
            } 
           />
           <Route
              path="/property/:id"
              element={
                <PropertyDetail
                  properties={propertiesData.properties}
                  favourites={favourites}
                  addFavorite={addFavorite}
                  removeFavorite={removeFavorite}
                  />
              }
              />
              </Routes>
              </BrowserRouter>
              </DndProvider>
              );
          }
      export default App;
