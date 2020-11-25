import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './LocationsSearch.css';

class LocationsSearch extends Component {
  constructor(props) {
      super(props)

      this.state = {
          alertValue:'',
      }
  }

alert=(event)=>{
  console.log(event)
  this.setState({
    alertValue: `${event.target.form[0].value} Has Been Added To Your Weather Locations`
  })
}

  render(){
    return (
      <div className="App">
        <div className="citySearch">
          <form name="searchLocation" id="searchLocation" className="search-location-form" onSubmit={(event)=>{
              event.preventDefault()
              this.props.searchLocations(event.target.title.value)
            }}>
              <label htmlFor="title"></label>
              <input type="text" id="title" name="title" placeholder="Enter City"></input>
          </form>
          <button type="submit" form="searchLocation" value="Save" onClick={(event) => this.alert(event)}>Submit</button>
          </div>
          <Link to ="/"><button id="home" type="submit" value="Save">Return to HomePage</button></Link>
          <h1>{this.state.alertValue}</h1>
      </div>
    )
  };
}

export default LocationsSearch;