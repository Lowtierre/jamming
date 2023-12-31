const clientId = '6525d1287a8844dabab5deedf774dc69';
const redirectUri = 'https://jamming-lwtr.netlify.app';
// const redirectUri = 'http://localhost:3000';
let accessToken = window.localStorage.getItem('spotyToken');

const Spotify = {
    getAccessToken() {
        console.log('before: ', accessToken)
        if (accessToken) {
            return accessToken
        }
        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (urlAccessToken && urlExpiresIn) {
            accessToken = urlAccessToken[1];
            window.localStorage.setItem('spotyToken', accessToken);
            const expiresIn = Number(urlExpiresIn[1]);
            window.setTimeout(() => {
                window.localStorage.removeItem('spotyToken');
                window.history.pushState('Access Token', null, '/');
            }, expiresIn);
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
        console.log('after: ', accessToken)
    },


    search(term) {
        const accessToken = this.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.tracks && data.tracks.items) {
                    return data.tracks.items.map(track => {
                        return ({
                            id: track.id,
                            name: track.name,
                            artist: track.artists.map(artist => artist.name).join(', '),
                            album: track.album.name,
                            uri: track.uri
                        })
                    });
                } else {
                    return [];
                }
            });
    },

    savePlaylist(name, trackURIs) {
        if (!name || !trackURIs.length) {
            return Promise.resolve();
        }

        const accessToken = this.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;

        return fetch('https://api.spotify.com/v1/me', { headers: headers })
            .then(response => response.json())
            .then(jsonResponse => {
                userId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ name: name }),
                });
            })
            .then(response => response.json())
            .then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ uris: trackURIs }),
                });
            });
    },

    getUserPlaylists() {
        const accessToken = this.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        return fetch('https://api.spotify.com/v1/me/playlists', { headers: headers })
            .then(response => response.json())
                .then(data => {
                        const playlists = data.items.map(item => ({
                            id: item.id,
                            name: item.name,
                            tracks: [], // Initialize tracks property for each playlist
                        }));


                    const playlistPromises = playlists.map(playlist => {
                        return fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
                            headers: { Authorization: `Bearer ${accessToken}` },
                        })
                            .then(response => response.json())
                            .then(tracksData => {
                                playlist.tracks = tracksData.items.map(item => ({
                                    id: item.track.id,
                                    name: item.track.name,
                                    artist: item.track.artists.map(artist => artist.name).join(', '),
                                    album: item.track.album.name,
                                    uri: item.track.uri
                                }));
                                return playlist;
                            });
                    });

                    return Promise.all(playlistPromises);
                })
            // .catch((error) => {
            //     console.log('Error: ', error)
            // })
    },
}

export { Spotify }