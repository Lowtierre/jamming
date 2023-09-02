import React from 'react';
import './track.css';

function Track({ id, name, artist, btnIcon, handleSong }) {
  return (
    <div className='track'>
        <h4>{name}</h4>
        <p>{artist}</p>
        <button onClick={() => handleSong(id)}>{btnIcon}</button>
    </div>
  )
}

export default Track