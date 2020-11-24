import React,{Component} from 'react';
import { Route, Link, Switch, Redirect} from 'react-router-dom';
import './Locations.css'


class Locations extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchLocation:'',
            cityArray:[],
            weatherData: []
        }
    }
    citySearch = (event) => {      
        console.log(event.target.value)
        this.props.weatherData.map((location,index) => {
            if (location.title.startsWith(event.target.value))  
            this.state.cityArray =this.props.weather
        })
        console.log(this.state.cityArray)
    }
    render() {
        let allLocations = this.props.weatherData.map((location,index)=>{
            console.log(this.state)
            return(
                <Link to={`/weather/${location.woeid}`}>
                    <div className="card" key={index}>
                        <h3>{location.title} <span id="woeid">(woeid:{location.woeid})</span></h3>
                        <p>Timezone: {location.timezone} <span>({location.timezone_name})</span></p>
                    </div>
                </Link>
            );
        })
        return(

        <div>
            <p>{this.state.cityArray.title}</p>
            <div>
                <header className="locations-header">
                    <h1>List of Locations</h1>
                    <form name='citySearch'>
                        <input type='text' placeholder='Search City' onChange={(event)=>this.citySearch(event)}></input>
                    </form>
                    <button type ="submit" placeholder="SearchCity" form="citySearch">Submit</button>
                    <p>{this.state.cityArray}</p>
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