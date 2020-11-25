import React, { Component } from 'react';
import { Route, Link, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Header from '../Header/Header';
import LocationData from '../LocationData/LocationData'
import Locations from '../Locations/Locations';
import AddBase from "../AddBase/AddBase";
import LocationsSearch from '../LocationsSearch/LocationsSearch';
import testLocations from './testLocations.json';
import baseCities from "./baseCities.json"


class App extends Component{
  constructor(props){
    super(props);
    
    this.state={
      weatherData:[],
      inputValue: '',
      searchData: [],
      baseCities: [],
    }
  }

  componentDidMount = async () => {
    this.setState({
      weatherData: testLocations,
      baseCities: baseCities,
    })
  }

  searchLocations = async (queryLocation)=> {
    // console.log(queryLocation)
    const searchURL= "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query="
    let response = await axios.get(`${searchURL}${queryLocation}`)
    this.setState({searchData:response.data})
    this.addLocation(response.data[0].woeid)
  }
  addLocation = async (woeid) => {
    // console.log(woeid)
    let thisState = this.state.weatherData;
    const locationURL = "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/"
    let response = await axios.get(`${locationURL}${woeid}`)
    thisState.unshift(response.data)
    this.setState({weatherData:thisState});
  } 
  
  render(){
    console.log(this.state)
    return (
      <div className="App">
        <header>
        <Header/>
        </header>
        <Switch>
          <Route path="/" exact render={routerProps => <Locations {...this.props}{...this.state}/>}/>
          <Route path="/base" render={routerProps => <AddBase {...this.props}{...this.state} addLocation={this.addLocation}/>}/>
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
