import React from 'react';
import './track.css';

function Track({ id, name, artist, btnIcon, handleSong }) {
  return (
    <div className='track'>
        <h4>{name.length > 30 ? name.substring(0, 30) + '...' : name}</h4>
        <p>{artist.length > 30 ? artist.substring(0, 30) + '...' : artist}</p>
        <button onClick={() => handleSong(id)}>{btnIcon}</button>
    </div>
  )
}

export default Track