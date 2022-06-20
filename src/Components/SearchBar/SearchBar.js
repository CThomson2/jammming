import React from 'react';

import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchTerm: '' };

    this.search = this.search.bind(this);
    this.searchByEnterKey = this.searchByEnterKey.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search() {
    this.props.onSearch(this.state.searchTerm);
  }
  searchByEnterKey(evt) {
    if (evt.key === "Enter") {
      this.search();
    } return;
  }

  handleTermChange(evt) {
    this.setState({ searchTerm: evt.target.value });
  }
  
  render() {
    return (
      <div className="SearchBar">
        <input 
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}
          onKeyDown={this.searchByEnterKey}
        />
        <button 
          className="SearchButton"
          onClick={this.search}
        >SEARCH</button>
      </div>
    )
  }
}

export default SearchBar;