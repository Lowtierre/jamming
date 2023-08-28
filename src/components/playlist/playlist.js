import React from 'react';
import Track from '../track/track';

function Playlist({ playlist, removeSong }) {
  return (
    <div className='playlist'>
        {playlist.map(track => {
            return <Track
            key={track.id}
            id={track.id}
            title={track.title}
            author={track.author}
            btnIcon={'-'}
            handleSong={removeSong}
        />
        })}
    </div>
  )
}

export default Playlist