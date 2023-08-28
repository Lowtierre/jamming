import './search_results.css'
import React from 'react';
import Tracklist from '../tracklist/tracklist';
import Playlist from '../playlist/playlist';

function SearchResults({ tracklist, playlist, addSong, removeSong }) {
  return (
    <div className='search-results'>
      <div className='result-container'>
        <h2>Results</h2>
        {(tracklist.length > 0) ? <Tracklist tracklist={tracklist} addSong={addSong} /> : ''}
      </div>
      <div className='playlist-container'>
        <input placeholder='Playlist' className='playlist-input' onChange='' />
        {(playlist.length > 0) ? <Playlist playlist={playlist} removeSong={removeSong} /> : ''}
      </div>
    </div>
  )
}

export default SearchResults