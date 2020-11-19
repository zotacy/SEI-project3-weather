import React, { Component } from "react";
import{Link, Render} from "react-router-dom";
import Header from "../Header/Header"
import "./LocationData.css";
import axios from 'axios';

class LocationData extends Component{
    
    render(){
        
    const localWeather = this.props.weatherData
    // const localWeather = this.props.weatherData.find(localWeather => weatherData.woeid === this.props.match.params.id); 
    //^^^Will line about when more data points are in add lCan have it be weatherData.title or weatherData.woeid for search method
    console.log(localWeather)

    const weekWeather = localWeather.map((weather,i) => (

        <div className="column">
                <h2>{weather.consolidated_weather.applicable_date}</h2>
                <ul>
                    <li>{weather.consolidated_weather.weather_state_name}</li>
                    <li>{weather.consolidated_weather.the_temp}</li>
                    <li>{weather.consolidated_weather.max_temp}</li>
                    <li>{weather.consolidated_weather.humidity}</li>
                    <li>{weather.consolidated_weather.wind_speed}  {weather.consolidated_weather.wind_direction_compass} </li>
                </ul>
                
        </div>
    ));

      return(
        <div className="App">
          <main className="App-main">
            {weekWeather}
          </main>
        </div>
      )
    };
  }
  
  export default LocationData;