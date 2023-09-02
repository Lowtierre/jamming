import React from 'react';
import Track from '../track/track';

function Playlist({ playlist, removeSong }) {
  return (
    <div className='playlist'>
        {playlist.map((track, index) => {
            return <Track
            key={index}
            id={track.id}
            name={track.name}
            artist={track.artist}
            btnIcon={'-'}
            handleSong={removeSong}
        />
        })}
    </div>
  )
}

export default Playlist