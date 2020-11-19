import React, { Component } from 'react';
// import axios from 'axios';
import './App.css';
import Header from '../Header/Header';
import Locations from '../Locations/Locations';
import testLocations from './testLocations.json';

class App extends Component{
  constructor(props){
    super(props)
    
    this.state={
      weatherData:[]
    }
    // console.log(this.state)
    // console.log(this.props)
  }
  componentDidMount = async () => {
    // const weatherURL = "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/"
    // let response = await axios.get(weatherURL)
    // this.setState({weatherData: response.data});
    this.setState({weatherData: testLocations})
  }
  
  render(){
    console.log(this.state.weatherData)
    return (
      <div className="App">
        <Header/>
        <main className="App-main">
        <Locations {...this.props}{...this.state}/>
        </main>
      </div>
    )
  };
}

export default App;
