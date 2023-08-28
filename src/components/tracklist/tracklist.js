import React from 'react';
import Track from '../track/track';

function Tracklist({ tracklist, addSong }) {
  return (
    <div className='tracklist'>
        {tracklist.map(track => {
            return <Track
            key={track.id}
            id={track.id}
            title={track.title}
            author={track.author}
            btnIcon={'+'}
            handleSong={addSong}
        />
        })}
    </div>
  )
}

export default Tracklist