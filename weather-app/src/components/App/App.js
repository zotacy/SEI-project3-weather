import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import axios from 'axios';
import LocationData from '../LocationData/LocationData'
import { Route, Link, Switch, Redirect } from 'react-router-dom';

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
    const weatherURL = "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/2487796/"
    let response = await axios.get(weatherURL)
    this.setState({weatherData: response.data});
  }
  
  render(){
    return (
      <div className="App">
        <Header/>
        <Route path="/weather/:id" exact render={routerProps => <LocationData {...routerProps} {...this.state} />}/>
        <main className="App-main">
          {this.state.weatherData.title}
        </main>
      </div>
    )
  };
}

export default App;
