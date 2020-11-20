import React, { Component } from "react";
import{Link, Render} from "react-router-dom";
import Header from "../Header/Header"
import "./LocationData.css";
// import images from '../../../public/Images';
import axios from 'axios';

class LocationData extends Component{
    
    render(){
        
    const localWeather = this.props.locationData
    // const localWeather = this.props.weatherData.find(localWeather => weatherData.woeid === this.props.match.params.id); 
    //^^^Will line about when more data points are in add lCan have it be weatherData.title or weatherData.woeid for search method
    console.log(localWeather)

    const weekWeather = localWeather.map((weather,i) => (

        <div className="day">
        <h2 type='date'>Date:{weather.applicable_date}</h2>
            <img src={'https://www.metaweather.com/static/img/weather/png/' + weather.weather_state_abbr + '.png'}></img>
            <ul>
                <li id='weather'>Weather:{weather.weather_state_name}</li>
                <li id='theTemp' type='number' maxLength='4'>Current Temp:{weather.the_temp}</li>
                <li id='high'>Today's High:{weather.max_temp}</li>
                <li id='low'>Today's Low:{weather.humidity}</li>
                <li id='wind'>Wind:{weather.wind_speed}mph {weather.wind_direction_compass} </li>
            </ul>
        </div>
    ));

      return(
        <div className="App">
          <main className="App-main">
            <h1>San Antonio</h1> {/* Update this when we pull actual data */}
            <button>Save to favorites</button>
            <div className='week'>
                {weekWeather}
            </div>
          </main>
        </div>
      )
    };
  }
  
  export default LocationData;