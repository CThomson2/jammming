const client_id = 'ceeabc5b0e5c43599d0d827d7fe56c62';
const redirect_uri = 'http://localhost:3000/';

let accessToken = '';
let expiresIn;

const Spotify = {
  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch;
      expiresIn = expiresInMatch;
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      
      // Redirect users to Spotify API
      const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`
      window.location = url;
    }
  },

  async search(text) {
    return await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${text}`,
      { headers: 
        { Authorization: `Bearer: ${accessToken}` }
      }
    ).then(res => {
      return res.json()
    }).then(jsonRes => {
      if (!jsonRes.tracks) {
        return [];
      }
      return jsonRes.tracks.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }))
    })
  }
}

export default Spotify;