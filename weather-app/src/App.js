import React, { Component } from 'react';
import './App.css';
import Header from './Header.js';
import axios from 'axios';

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
        <main className="App-main">
          {this.state.weatherData.title}
        </main>
      </div>
    )
  };
}

export default App;
