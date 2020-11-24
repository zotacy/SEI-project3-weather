import React,{Component} from 'react';
import { Route, Link, Switch, Redirect} from 'react-router-dom';
import './Locations.css'


class Locations extends Component {
    constructor(props) {
        super(props)

        this.state = {
            weatherData: []
        }
    }
    citySearch = (event) => {
        let cityArray = [];
      
        console.log(event.target.value)
        this.props.weatherData.map((location,index) => {
            if (location.title.startsWith(event.target.value))  
            cityArray.push(this.props.weatherData[index])  
        })
        this.setState({
            weatherData: cityArray,
        })
    }
    render() {
        let allLocations = this.props.weatherData.map((location,index)=>{
            // console.log(this.state)
            return(
                <Link to={`/weather/${location.woeid}`}>
                    <div className="card" key={index}>
                        <h3>{location.title} <span id="woeid">(woeid:{location.woeid})</span></h3>
                        <p>Timezone: {location.timezone}</p>
                    </div>
                </Link>
            );
        })
        return(

        <div>
            <p>{this.state.weatherData.title}</p>
        <div>
        <header className="locations-header">
            <div className="citySearch">
            <Link to="/search"><button id="searchLocations">Find New Location</button></Link>
                <form name='citySearch'>
                    <input type='text' placeholder='Search Saved Cities' onChange={this.citySearch}></input>
                </form>
                <button type ="submit" form="citySearch">Submit</button>
            </div>
            <h1>Your Locations</h1>
        </header>
            <div className="locations-grid">
                {allLocations} 
            </div>
        </div>
        </div>
        )
    }
}

export default Locations;