import React,{Component} from 'react';
import { Route, Link, Switch, Redirect} from 'react-router-dom';
import './Locations.css'

class Locations extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cityArray:[],
            weatherData: []
        }
    }
    citySearch = (event) => {
        // let cityArray = [];

        console.log(event.target.value)
        this.props.weatherData.map((location,index) => {
            if (location.title.startsWith(event.target.value)) {
                this.setState({
                    cityArray: location
                })
                console.log(this.state.cityArray)
            }})
        }
        // cityArray.push(this.props.weatherData[index])
       
        // this.state.weatherData = cityArray
        // console.log(this.state.weatherData)
        // return (
        //     <p>{this.state.weatherData[0].title}</p>
        // )
    

    render() {
         console.log(this.state)
         console.log(this.props.inputValue)
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
        });
        return(
            <div>
                <p>{this.state.weatherData.title}</p>
                <header className="locations-header">
                    <div className="citySearch">
                        <Link to="/search"><button id="searchLocations">Find New Location</button></Link>
                        <form name='citySearch'>
                            <input type='text' placeholder='Search City' onChange={(event) => this.citySearch(event)}></input>
                        </form>
                        <button type ="submit" form="citySearch" onClick={this.citySearch}>Submit</button>
                    </div>

                    <p>{this.state.cityArray.title}</p>
                        <h1>Your Locations</h1>
                </header>
            <div className="locations-grid">
                {/* {newLocation} */}
                {allLocations}
            </div>
        </div>
        )
    }
}
export default Locations;