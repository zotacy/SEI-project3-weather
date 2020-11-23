import React,{Component} from 'react';
import './Locations.css'

class Locations extends Component{
    render(){
        // console.log(this.props.weatherData)
        let allLocations = this.props.weatherData.map((location,index)=>{
            return(
              <div className="card" key={index}>
                  <h3>{location.title} <span id="woeid">(woeid:{location.woeid})</span></h3>
                  <p>Timezone: {location.timezone}</p>
                  {/* <span>({location.time})</span> */}
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
            </div>
        </div>
        )
    }
}

export default Locations;