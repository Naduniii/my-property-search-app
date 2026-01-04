import React, {useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import {useDrag} from 'react-dnd';
import { ItemTypes } from '../dndTypes';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';




export default function PropertyDetail({ properties, favorites, addFavorite, removeFavorite}){
    const {id} = useParams();
    const property = properties.find((p) => String(p.id)===id);

      // Show message if property does not exist
    if (!property) return <p>Property not found</p>;
    // Track currently selected image
    const [selectedImage, setSelectedImage] = useState(property.pictures[0]);
    // Check whether property is in favorites
    const isFavorited = favorites.some((fav) => fav.id === property.id);
      // Enable dragging property into favorites
    const [{ isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.PROPERTY,
        item: {property},
        collect : (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div style={{padding:'1rem', maxWidth: '900px',margin: 'auto'}}>
            <Link to = "/">← Back to Search</Link>
            <h1>{property.type} - £ {property.price.toLocaleString()}</h1>
            <p><strong>Location:</strong>{property.location}</p>

        <div
           ref = {drag}
           style={{ cursor: 'move', opacity: isDragging ? 0.5 : 1, border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}
           aria-label = "Drag property to add to favourites"
        >
        <img
           src = {selectedImage}
           alt = {`${property.type} main`}
           style= {{width:'100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px'}}
           />

        <div
          style = {{
            display: 'flex',
            gap: '0.5rem',
            marginTop: '0.5rem',
            overflowX: 'auto',
            maxWidth: '100%',
          }}
      >
        {property.pictures.map((pic, idx) => (
            <img
               key={idx}
               src={pic}
               alt={`${property.type} thumbnail ${idx + 1}`}
               style={{
                width: '80px',
                height: '50px',
                objectFit: 'cover',
                borderRadius: '6px',
                border: selectedImage === pic ? '2px solid #007bff ': '1px solid #ccc',
                cursor: 'pointer',
               }}
               onClick={() => setSelectedImage(pic)}
               />
            ))}
            </div>
            </div>
            {/* Thumbnails */}
           <div style = {{marginTop: '1rem'}}>
            {isFavorited ? (
                <button onClick={() => removeFavorite(property.id)} aria-label = "Remove from favourites" style={{marginRight: '1rem'}}>
                    Remove from Favorites
                </button>
            ) : (
                <button onClick = {() => addFavorite(property)} aria-label="Add to favorites" style={{marginRight: '1rem'}}>
                    Add to Favorites
                </button>

            )}
            </div>

            <Tabs style={{marginTop: '1rem'}}>
                <TabList>
                    <Tab>Description</Tab>
                    <Tab>Floor Plan</Tab>
                    <Tab>Map</Tab>
                </TabList>

                <TabPanel>
                    <p>{property.longDescription}</p>
                </TabPanel>
                <TabPanel>
                     <img src={property.floorPlan} alt="Floor plan" style={{ maxWidth: '100%', borderRadius: '8px' }} />
        </TabPanel>
        <TabPanel>
                    <iframe
                       title= "Property Location"
                       src = {property.mapEmbedUrl}
                       width="100%"
                       height = "300"
                       style={{border: 0, borderRadius: '8px'}}
                       allowFullScreen=""
                       loading="lazy"
                       referrerPolicy="no-referrer-when-downgrade"
                       />
                   </TabPanel>
                   </Tabs>
                   </div>
                   );
                   }
        

                


