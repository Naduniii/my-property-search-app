import React from 'react';
import {useDrop} from 'react-dnd';
import {ItemTypes} from '../dndTypes';

function RemoveZone({removeFavorites}){
    const [{ isOver, canDrop}, drop] = useDrop({
        accept: [ItemTypes.FAVORITE],
        drop: (item) => {
            removeFavorite(item.id);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });
return (
    <div
       ref={drop}
       style={{
        marginTop: '1rem',
        padding: '1rem',
        border: '2px dashed red' ,
        borderRadius: '8px',
        backgroundColor : isOver && canDrop ? '#ffecec' : '#fff0f0',
        color: 'red',
        textAlign: 'center',
        fontWeight: 'bold',
        cursor: 'pointer',
        userSelect: 'none',
       }}
       aria-lebel="Remove favorite drop zone"
       >
       Drag here to ramove favorite
       </div>
);
}
export default function Favorites ({Favorites, addFavorite,removeFavorite,clearFavorites}){
    const [{isOver}, drop] = useDrop ({
        accept: [ ItemTypes.PROPERTY],
        drop: (item) => {
            addFavorite(item.property);
        },