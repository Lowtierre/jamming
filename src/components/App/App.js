import './App.css';
import React, { useState } from 'react';
import SearchBar from '../search_bar/search_bar';
import SearchResults from '../search_results/search_results';

const SONGS = [
  {
    id: 0,
    title: 'Kill You',
    author: 'Eminem'
  },
  {
    id: 1,
    title: 'The Real Slim Shady',
    author: 'Eminem'
  },
  {
    id: 2,
    title: 'Without me',
    author: 'Eminem'
  }
]

function App() {

  const [string, setString] = useState('');
  const [tracklist, setTracklist] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  const writeString = (inputStr) => {
    setString(inputStr);
  }

  const fetchSongs = (string) => {
    const stringLower = string.toLowerCase();
    const results = SONGS.filter(song => song.title.toLowerCase().includes(stringLower) || song.author.toLowerCase().includes(stringLower));
    if (string) {
      setTracklist(results);
    }
    setString('')
  }

  const addSong = (songId) => {
    const songToAdd = SONGS.filter(song => song.id == songId);
    console.log(songToAdd)
    if (!playlist.some(song => song.id == songId)) {
      setPlaylist(prev => [...prev, songToAdd[0]])
    }
  }

  const removeSong = (songId) => {
    console.log('click');
    setPlaylist(prev => prev.filter(song => song.id != songId))

  }

  return (
    <div className="App">
      <header>Jammming</header>
      <SearchBar string={string} writeString={writeString} fetchSongs={fetchSongs} />
      <SearchResults tracklist={tracklist} playlist={playlist} addSong={addSong} removeSong={removeSong} />
    </div>
  );
}

export default App;
