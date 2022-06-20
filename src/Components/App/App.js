import React from 'react'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        {
          name: 'Tiny Dancer',
          artist: 'Elton John',
          name: 'Madman Across the Water'
        },
        {
          name: 'Skeletons',
          artist: 'Travis Scott',
          name: 'Astroworld'
        },
        {
          name: 'Sober',
          artist: 'Childish Gambino',
          name: 'Kaual'
        }
      ]
    }
  }
  
  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist />
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