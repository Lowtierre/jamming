import './App.css';
import React, { useState } from 'react';

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

  const writingString = (string) => {
    setString(string);
  }

  // const fetchSongs = (string) => {
  // }

  // const addSong = (song) => {
  // }

  // const removeSong = (song) => {
  // }

  return (
    <div className="App">
      <header>My App</header>
      {/* <SearchBar /> */}
      {/* <SearchResults /> */}
      {/* <Playlist /> */}
    </div>
  );
}

export default App;
