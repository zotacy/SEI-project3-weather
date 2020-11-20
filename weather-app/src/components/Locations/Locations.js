import React,{Component} from 'react';
import { Route, Link, Switch, Redirect} from 'react-router-dom';
import './Locations.css'

class Locations extends Component{
    render(){
        console.log(this.props)
        let allLocations = this.props.weatherData.map((location,index)=>{
            return(
              <div className="card" key={index}>
                  <h3>{location.title} <span id="woeid">(woeid:{location.woeid})</span></h3>
                  <p>Timezone: {location.timezone} <span>({location.timezone_name})</span></p>
            </div>
            );
        });
        console.log(this.props.metaWeatherData)
        let newLocation = this.props.metaWeatherData.map((newlocation,index)=>{
            return(
              <div className="card" key={index}>
                  <h3>{newlocation.title} <span id="woeid">(woeid:{newlocation.woeid})</span></h3>
                  <p>Timezone: {newlocation.timezone} <span>({newlocation.timezone_name})</span></p>
            </div>
            );
        });
    return(
        <div >
        <header className="locations-header">
            <h1>List of Locations</h1>
        </header>
            <div className="locations-grid">
                {allLocations}
                {newLocation}
            </div>
        </div>
        )
    }
}

export default Locations;