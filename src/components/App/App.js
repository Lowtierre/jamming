import './App.css';
import React, { useEffect, useState } from 'react';
import SearchBar from '../search_bar/search_bar';
import SearchResults from '../search_results/search_results';
import { Spotify } from '../../utilities/Spotify';

function App() {

  const [string, setString] = useState('');
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [tracklist, setTracklist] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    fetchUserPlaylists();
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };

    return fetch('https://api.spotify.com/v1/me', { headers: headers })
        .then(response => response.json())
        .then(jsonResponse => {
            const userId = jsonResponse.id;
            console.log(userId)
          })
  }, []);

  const fetchUserPlaylists = () => {
    Spotify.getUserPlaylists()
      .then((playlists) => {
        setUserPlaylists(playlists)
        console.log('Playlists: ', playlists);
      })
      .catch((error) => {
        console.error("Error fetching user playlists:", error);
      });
  };

  const writeString = (inputStr) => {
    setString(inputStr);
  }

  const updatePlaylistTitle = (inputStr) => {
    setPlaylistTitle(inputStr);
  }

  const fetchSongs = (string) => {
    Spotify.search(string).then(setTracklist);
    setString('');
  }

  const addSong = (id) => {
    const newTrack = tracklist.filter(track => track.id === id)[0];
    if (playlist.some(track => track.id === id)) {
      return;
    } else {
      setPlaylist(prev => [...prev, newTrack])
    }
  }

  const removeSong = (id) => {
    setPlaylist(prev => prev.filter(song => song.id !== id))
  }

  const savePlaylist = () => {
    if (!playlistTitle || !playlist.length) {
      return; 
    }
  
    const trackURIs = playlist.map((track) => track.uri);
    const existingPlaylist = userPlaylists.find((playlist) => playlist.name === playlistTitle);
  
    if (existingPlaylist) {
      const playlistId = existingPlaylist.id;
      const accessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
  
      fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'PUT',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uris: trackURIs }),
      })
        .then(() => {
          alert("Playlist successfully updated.");
        })
        .catch((error) => {
          console.error("Error updating playlist:", error);
        });
    } else {
      Spotify.savePlaylist(playlistTitle, trackURIs)
        .then((newPlaylist) => {
          alert("New playlist successfully saved.");
          setPlaylist([]);
          setPlaylistTitle('')
          setUserPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
          fetchUserPlaylists();
        })
        .catch((error) => {
          console.error("Error saving new playlist:", error);
        });
    }
  };

  return (
    <div className="App">
      <header>
        <h3>Ja<em>mmm</em>ing</h3>
      </header>
      <SearchBar
        string={string}
        writeString={writeString}
        fetchSongs={fetchSongs}
      />
      <SearchResults
        tracklist={tracklist}
        playlist={playlist}
        addSong={addSong}
        removeSong={removeSong}
        updatePlaylistTitle={updatePlaylistTitle}
        title={playlistTitle}
        savePlaylist={savePlaylist}
      />
    </div>
  );
}

export default App;
