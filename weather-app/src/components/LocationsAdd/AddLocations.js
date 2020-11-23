import React, { Component } from 'react';
import './AddLocations.css';

const searchURL= "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query="
const query= "San"
const newLocation= `${searchURL}${query}`

class AddLocations extends Component{
  constructor(props){
    super(props);
    
    this.state={
      metaWeatherData:[]
    }
  }
  
  render(){
    console.log(this.props)
    console.log(this.state.metaWeatherData)
    return (
      <div className="App">
        <main className="add-locations-main">
            <h1>New Locations</h1>
            <button onClick={ ()=> {this.props.addNewLocation()}}>Add San Antonio</button>
            
        </main>
      </div>
    )
  };
}

export default AddLocations;
