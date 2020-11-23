import React, { Component } from 'react';
import { Route, Link, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Header from '../Header/Header';
import LocationData from '../LocationData/LocationData'
import Locations from '../Locations/Locations';
import AddLocations from "../LocationsAdd/AddLocations";
import testLocations from './testLocations.json';
import practiceData from './PracticeData.json';

class App extends Component{
  constructor(props){
    super(props);
    
    this.state={
      weatherData:[],
      locationData:[],
    }
  }

  componentDidMount = async () => {
    this.setState({
      weatherData: testLocations,
      locationData: practiceData,
    })
  }
  addNewLocation = async () => {
    let thisState = this.state.weatherData;
    const locationURL = "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/"
    const woeid = "2487796";
    let response = await axios.get(`${locationURL}${woeid}`)
    thisState.unshift(response.data)
    this.setState({weatherData: thisState});
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
          <Route path="/new" exact render={routerProps => <AddLocations addNewLocation={this.addNewLocation}/>}/>
          <Route path="/weather/:id" exact render={routerProps => <LocationData {...routerProps} {...this.state} />}/>
        </Switch>
        <main className="App-main">

        </main>
      </div>
    )
  };
}

export default App;
