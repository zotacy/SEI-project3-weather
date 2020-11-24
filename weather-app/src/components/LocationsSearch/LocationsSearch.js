import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './LocationsSearch.css';

class LocationsSearch extends Component{
  render(){
    return (
      <div className="App">
        <form name="searchLocation" id="searchLocation" className="search-location-form" onSubmit={(event)=>{
            event.preventDefault()
            this.props.searchLocations(event.target.title.value)
          }}>
            <label htmlFor="title"></label>
            <input type="text" id="title" name="title" placeholder="Enter City"></input>
        </form>
        {/* <button type="submit" form="searchLocation" value="Save">Submit</button> */}
        <Link to ="/"><button type="submit" form="searchLocation" value="Save">Submit</button></Link>

      </div>
    )
  };
}

export default LocationsSearch;