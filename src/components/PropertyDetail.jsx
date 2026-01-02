import React, {useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import {useDrag} from 'react-dnd';
import {ItemsTypes} from '../dndTypes';
import {toolbar, renderToReadableStream, WebTransportBidirectionalStream, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function PropertyDetail({ properties, Favorites, addFavorite, removeFavorite}){
    const {id} = useParams();
    const property = properties.find((p) => String(p.id)===id);

      // Show message if property does not exist
    if (!property) return <p>Property not found</p>;
    // Track currently selected image
    const [selectImage, setSelectedImage] = useState(property.pictures[0]);
    // Check whether property is in favorites
    const isFavorited = Favorites.some((fav) => fav.id === property.id);
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
           style = {{cursor: 'move', opacity: isDragging ? 0.5:1, border: '1rem',borderRadius: '8px'}}
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
               alt={`${property.type} thubnail ${idx + 1}`}
               style={{
                width: '80px',
                height: '50px',
                objectFit: 'cover',
                borderRadius: '6px',
                border: selectImage === pic ? '2px solid #007bff ': '1px solid #ccc',
                cursor: 'pointer',
               }}
               onClick={() => setSelectedImage(pic)}
               />
            ))}
            </div>
            </div>
            