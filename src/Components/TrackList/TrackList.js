import React from 'react'

import './TrackList.css';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => {
          <li 
            key={track.id}
          >
            {track.name}, {track.artist}, {track.album}
          </li>
        })}
        <!-- You will add a map method that renders a set of Track components  -->
      </div>
    )
  }
}

export default TrackList;