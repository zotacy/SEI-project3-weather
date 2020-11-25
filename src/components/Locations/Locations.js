import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './Locations.css'

class Locations extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchValue:'',
            cityArray:[],
            weatherData: [],
            searchResult:[],
        }
    }

    searchValue=(event)=>{
        this.setState({
            searchValue: event.target.value
        })
    }

    citySearch = (event) => {
        console.log(this.state.searchValue)
        this.props.weatherData.map((location,index) => {
            // console.log(event.target.value)
            if (location.title.startsWith(this.state.searchValue)) {
                this.setState({
                    cityArray: location
                })
                this.render()
                console.log(this.state.cityArray)  
        }})
    }
    render() {
        function usaTemp(temp) {
            const murica = limitNum((temp*1.8)+32);
            return murica
        }
    
        function limitNum(num){
            const short = num.toFixed(0);
            return short
        }
    
        function sunshine(time){
            const hours = ((time.substring(11,13)+11) % 11 + 1)
            const min = time.substring (14,16)
            time = hours + ':' + min
            return time 
        }
    
        function icon(state){
            if(state == 'sn'){
                return 'snowy-5'
            } else if (state == 'sl') {
                return 'snowy-4'
            } else if (state == 'h') {
                return 'rainy-7'
            } else if (state == 't') {
                return 'thunder'
            } else if (state == 'hr') {
                return 'rainy-6'
            } else if (state =='lr') {
                return 'rainy-5'
            } else if (state == 's') {
                return 'rainy-3'
            } else if (state == 'hc') {
                return 'cloudy'
            } else if (state == 'lc') {
                return 'cloudy-day-1'
            } else { return 'day' }}

        let allLocations = this.props.weatherData.map((location,index)=>{
            return(
                <Link to={`/weather/${location.woeid}`}>
                    <div className="card" key={index}>
                        <h3>{location.title} <span id="woeid">(woeid:{location.woeid})</span></h3>
                        <p>Timezone: {location.timezone}</p>
                    </div>
                </Link>
            );
        });

        if(this.state.cityArray !=''){
           this.state.searchResult = this.state.cityArray.consolidated_weather.map((weather,i) => {
                let city = this.state.cityArray
                if(i===0){
                    return(
                        <Link to={`/weather/${city.woeid}`}>
                          <div className="today">
                            <div className="locations-today-left">
                                <h2 id='todayDate' type='date'>{city.title} Weather</h2> 
                                <img src={'https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/' + icon(weather.weather_state_abbr) + '.svg'} alt='weather icon'></img>
                            </div>
                            <div className="today-right">
                                <ul>
                                    <div className='todayInfo'>
                                        <li id='weather'><span>Weather:</span>{weather.weather_state_name}</li>
                                        <li id='temp' type='number'><span>Current Temp:</span>{usaTemp(weather.the_temp)}</li>
                                        <li id='high' maxLength={8}><span>High:</span>{usaTemp(weather.max_temp)}</li>
                                        <li id='low'><span>Low:</span>{usaTemp(weather.min_temp)}</li>
                                        <li id='wind'><span>Wind:</span>{limitNum(weather.wind_speed)}mph {weather.wind_direction_compass} </li>   
                                    </div>
                                </ul>
                                <div className="sunshine">
                                    <div classname="sunrise">
                                        <img key="uniqueId1" src={'https://image.flaticon.com/icons/png/512/728/728123.png'} alt='surise icon'></img>
                                        <p className='sun'>Sunrise: {sunshine(city.sun_rise)} AM</p>
                                    </div>
                                    <div classname="sunset">
                                        <img key="uniqueId2" src={'https://www.flaticon.com/svg/static/icons/svg/362/362409.svg'} alt='sunset icon'></img>
                                        <p className='sun'>Sunset: {sunshine(city.sun_set)} PM</p>
                                    </div>
                                </div>
                            </div>
                          </div>
                        </Link>
                    )
                }
            })
        }

        return(
            <div>
            <p>{this.state.weatherData.title}</p>
            <header className="locations-header">
                <div className="citySearch">
                    <Link to="/search"><button id="searchLocations">Find New Location</button></Link>
                    <form name='citySearch'>
                        <input type='text' placeholder='Search City' onChange={(event) => this.searchValue(event)}></input>
                    </form>
                    <button type ="submit" form="citySearch" onClick={(event) => this.citySearch(event)}>Submit</button>
                </div>
                <div>
                    {this.state.searchResult}
                </div>
                <h1>Your Locations</h1>
            </header>
            <div className="locations-grid">
                {allLocations} 
            </div>
        </div>
        )
    }
}

export default Locations;