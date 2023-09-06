import './search_results.css'
import React from 'react';
import Tracklist from '../tracklist/tracklist';
import Playlist from '../playlist/playlist';

function SearchResults({ tracklist, playlist, addSong, removeSong, updatePlaylistTitle, title, savePlaylist }) {

  const handleTitle = (e) => {
    updatePlaylistTitle(e.target.value)
  }

  const handleSaving = (e) => {
    e.preventDefault();
    savePlaylist();
  }

  return (
    <div className='search-results'>
      <div className='result-container'>
        <h1>Results</h1>
        {(tracklist.length > 0) ? <Tracklist tracklist={tracklist} addSong={addSong} /> : ''}
      </div>
      <form className='playlist-container' onSubmit={handleSaving}>
        <input placeholder='Playlist' className='playlist-input' value={title} onChange={handleTitle} />
        {(playlist.length > 0) ? <Playlist playlist={playlist} removeSong={removeSong} /> : ''}
        <input type="submit" value="Save" />
      </form>
    </div>
  )
}

export default SearchResults