import React from 'react'

import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import TrackList from '../TrackList/TrackList';
import Track from '../Track/Track';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        {
          name: 'Tiny Dancer',
          artist: 'Elton John',
          album: 'Madman Across the Water',
          id: 1000
        },
        {
          name: 'Skeletons',
          artist: 'Travis Scott',
          album: 'Astroworld',
          id: 1001
        },
        {
          name: 'Sober',
          artist: 'Childish Gambino',
          album: 'Kaual',
          id: 1002
        },
        {
          name: 'The Motto',
          artist: 'Drake',
          album: 'Passionfruit',
          id: 1004
        }
      ],
      playlistName: 'Crypto Vibes',
      playlistTracks: [
        {
          name: 'Sober',
          artist: 'Childish Gambino',
          album: 'Kaual',
          id: 1002
        },
        {
          name: 'Skeletons',
          artist: 'Travis Scott',
          album: 'Astroworld',
          id: 1001
        }
      ]
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  
  addTrack(track) {
    if (!this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      this.state.playlistTracks.push(track);
      this.setState({ playlistTracks: this.state.playlistTracks });
    } return;
  }

  removeTrack(track) {
    this.setState({ playlistTracks: 
      this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id) 
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist 
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onAdd={this.addTrack} // Delete this somehow - Playlist does not need this method
              onRemove={this.removeTrack}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App;

// return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );