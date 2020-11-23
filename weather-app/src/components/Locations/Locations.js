import React,{Component} from 'react';
import { Route, Link, Switch, Redirect} from 'react-router-dom';
import './Locations.css'

class Locations extends Component{
    render(){
        // console.log(this.props.weatherData)
        let allLocations = this.props.weatherData.map((location,index)=>{
            return(
                <Link to={`/weather/${location.woeid}`}>
                    <div className="card" key={index}>
                        <h3>{location.title} <span id="woeid">(woeid:{location.woeid})</span></h3>
                        <p>Timezone: {location.timezone} <span>({location.timezone_name})</span></p>
                    </div>
                </Link>

            );
        });
    return(
        <div >
        <header className="locations-header">
            <h1>List of Locations</h1>
        </header>
            <div className="locations-grid">
                {allLocations} 
            </div>
        </div>
        )
    }
}

export default Locations;