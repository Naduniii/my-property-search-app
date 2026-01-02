import React  from 'react';
import {Link} from 'react-router-dom';
import {useDrag} from 'react-dnd';
import {ItemTypes} from '../dndTypes';

export default function PropertyCard ({property, isFavorites, addFavotite, removeFavorite}) {
    const [{ isDragging }, drag] = useDrag (() => ({
        type: ItemTypes.PROPERTY,
        item: {property},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

return (
    <div
       ref={drag}
       className="property-card"
       style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '0.5rem',
        backgroundColor: '#fff',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
       }}
    >
        <Link to={`/property/ ${property.id}`}>
        <img src = {property.picture}
        style={{width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px'}}
        />
        <h3 style = {{margin: '0.5rem'}}>
            {property.type} - £{property.price.toLocaleString()}

        </h3>
        </Link>
        <p>{property.description.slice(0, 80)}...</p>
       { /* Display property location */}
        <p>
            <strong>Location: </strong>{property.location}</p>
        <p>
            <strong>Bedrooms: </strong> {property.bedrooms}
        </p>
        {isFavorites ? (
            <button onClick={() => removeFavorite(property.id)} aria-label = "Remove from favourites">
                Remove Favotite
            </button>
        ) : (
            <button onClick={() => addFavotite (property)} aria-label = "Add to favourits">
                Add to Favotites
            </button>
        )}
    </div>
);
}


