const clientID = 'ceeabc5b0e5c43599d0d827d7fe56c62';
const redirectUri = 'https://codecademy-jammmed.surge.sh';

let accessToken = '';

const Spotify = {
  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }

    // check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      // This clears the parameters, allowing us to grab a new access token when it expires.
      window.setTimeout(() => accessToken = '', expiresIn *1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    console.log('accessToken :>> ', accessToken);
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { 
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(res => {
      return res.json();
    }).then(jsonRes => {
      if (!jsonRes.tracks) {
        return [];
      }
      return jsonRes.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }))
    }).catch(err => {
      console.log('err in search :>> ', err);
    })
  },

  savePlaylist(name, trackURIs) {
    if (!(name && trackURIs)) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    let userID = '';
    const headers = {
      'Authorization': `Bearer: ${accessToken}`,
      'Content-Type': 'application/json'
    };

    userID = fetch(`https://api.spotify.com/v1/me`, {
      headers: headers
    }).then(res => {
      return res.json()
    }).then(jsonRes => {
      return jsonRes.id;
    }).catch(err => {
      console.log('err in savePlaylist :>> ', err);
    })

    let playlistID = fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      headers: headers,
      method: 'POST',
      body: {
        name: name,
        description: 'TBD',
        public: false
      } 
    }).then(res => {
      return res.json();
    }).then(jsonRes => {
      return jsonRes.id;
    })

    playlistID = fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
      headers: headers,
      method: 'POST',
      body: {
        uris: trackURIs
      }
    }).then(res => {
      return res.json();
    }).then(jsonRes => {
      return jsonRes.id
    })
  }
}

export default Spotify;