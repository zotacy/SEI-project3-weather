import React, { Component } from 'react';
import { Route, Link, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Header from '../Header/Header';
import LocationData from '../LocationData/LocationData'
import Locations from '../Locations/Locations';
// import AddLocations from "../LocationsAdd/AddLocations";
import LocationsSearch from '../LocationsSearch/LocationsSearch';
import testLocations from './testLocations.json';

// const woeidDatabase = [
//   {
//     title: "Raleigh",
//     woeid: 2478307
//   },
//   {
//     title: "San Francisco",
//     woeid: 2487956
//   },
//   {
//     title: "Washinton DC",
//     woeid: 2514815
//   },
//   {
//     title: "London",
//     woeid: 44418
//   },
//   {
//     title: "Paris",
//     woeid: 615702
//   },
// ]

class App extends Component{
  constructor(props){
    super(props);
    
    this.state={
      weatherData:[],
      searchData: [],
    }
  }

  componentDidMount = async () => {
    this.setState({
      weatherData: testLocations,
    })
  }

  searchLocations = async (queryLocation)=> {
    // console.log(queryLocation)
    const searchURL= "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query="
    let response = await axios.get(`${searchURL}${queryLocation}`)
    this.setState({searchData:response.data})
    this.addNewLocation(response.data[0].woeid)
  }
  addNewLocation = async (woeid) => {
    // console.log(woeid)
    let thisState = this.state.weatherData;
    const locationURL = "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/"
    let response = await axios.get(`${locationURL}${woeid}`)
    thisState.unshift(response.data)
    this.setState({weatherData:thisState});
  }
  
  render(){
    // console.log(this.state)
    return (
      <div className="App">
        <header>
        <Header/>
        </header>
        <Switch>
          <Route path="/" exact render={routerProps => <Locations {...this.props}{...this.state}/>}/>
          {/* <Route path="/new" exact render={routerProps => <AddLocations addNewLocation={this.addNewLocation}/>}/> */}
          <Route path="/search" exact render={routerProps => <LocationsSearch searchLocations={this.searchLocations}/>}/>
          <Route path="/weather/:id" exact render={routerProps => <LocationData {...routerProps} {...this.state} />}/>
        </Switch>
        <main className="App-main">

        </main>
      </div>
    )
  };
}

export default App;
