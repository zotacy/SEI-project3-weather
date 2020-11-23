import React, { Component } from 'react';
import './LocationsSearch.css';

class LocationsSearch extends Component{
  constructor(props){
    super(props);
    
    this.state={
      foundLocation:[],
    //   searchInput:"",
    }
  }
//   handleChange = e => {
//     const searchInput = e.currentTarget.value
//     this.setState({
//       searchInput: e.currentTarget.value,
//     })
//   }
//   handleClick = e => {
//     this.setState({
//       searchInput: e.currentTarget.innerText,
//     })
//   }
  
  render(){
    console.log(this.props)
    console.log(this.state.foundLocation)
    return (
      <div className="App">
        <form className="search-location-form" onSubmit={this.props.searchLocations()}>
            <input type="text" name="title" placeholder="Enter City" value={this.state.value}/>
            <input type="submit" value="Search"/>
        </form>
      </div>
    )
  };
}

export default LocationsSearch;