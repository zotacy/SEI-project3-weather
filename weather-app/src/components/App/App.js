import React, { Component } from 'react';
// import axios from 'axios';
import './App.css';
import Header from '../Header/Header';
import LocationData from '../LocationData/LocationData'
import Locations from '../Locations/Locations';
import testLocations from './testLocations.json';
import practiceData from './PracticeData.json'
import { Route, Link, Switch, Redirect } from 'react-router-dom';

class App extends Component{
  constructor(props){
    super(props);
    
    this.state={
      weatherData:[],
      locationData:[]
    }
    // console.log(this.state)
    // console.log(this.props)
  }
  componentDidMount = async () => {
    // const weatherURL = "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/"
    // let response = await axios.get(weatherURL)
    // this.setState({weatherData: response.data});
    this.setState({
      weatherData: testLocations,
      locationData: practiceData
    })
  }
  
  render(){
    console.log(this.state.weatherData)
    return (
      <div className="App">
        <Header/>
        <Switch>
        <Route path="/" exact render={routerProps => <Locations {...this.props}{...this.state}/>}/>
          <Route path="/weather/:id" exact render={routerProps => <LocationData {...routerProps} {...this.state} />}/>
        </Switch>
        <main className="App-main">

        </main>
      </div>
    )
  };
}

export default App;
