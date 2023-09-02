import React from 'react';
import Track from '../track/track';

function Tracklist({ tracklist, addSong }) {
  return (
    <div className='tracklist'>
        {tracklist.map((track, index) => {
            return <Track
            key={index}
            id={track.id}
            name={track.name}
            artist={track.artist}
            btnIcon={'+'}
            handleSong={addSong}
        />
        })}
    </div>
  )
}

export default Tracklist