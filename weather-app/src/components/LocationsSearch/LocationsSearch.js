import React, { Component } from 'react';
import './LocationsSearch.css';

class LocationsSearch extends Component{
  render(){
    return (
      <div className="App">
        <form name="searchLocation" id="searchLocation" className="search-location-form" onSubmit={(event)=>{
            event.preventDefault()
            // console.log(event.target.title.value)
            this.props.searchLocations(event.target.title.value)
          }}>
            <label htmlFor="title"></label>
            <input type="text" id="title" name="title" placeholder="Enter City"></input>
        </form>
        <button type="submit" form="searchLocation" value="Save">Submit</button>

      </div>
    )
  };
}

export default LocationsSearch;