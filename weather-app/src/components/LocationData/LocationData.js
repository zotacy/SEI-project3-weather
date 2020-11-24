import React, { Component } from "react";
import "./LocationData.css";
import axios from 'axios';
// import images from './images';
import {Line,Bar} from 'react-chartjs-2';

class LocationData extends Component{
    constructor(props) {
        super(props)
        this.state = {
            testWeather: this.props.weatherData,
            allData:[],
            localWeather:[],
            accuLocation:'',
            accuData:[],
            days:[],
            wind:[],
            sunrise:'',
            sunset:'',
            labels:[],
            datasets: [
                    {
                        label: 'High Temp',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'red',
                        borderColor: 'red',
                        borderWidth: 4,
                        data: []
                    },{
                        label: 'Low Temp',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'blue',
                        borderColor: 'blue',
                        borderWidth: 4,
                        data: []
                    },
           ] 
        }
        this.bar = {
            labels: [],
            datasets: [
                {
                    label: '',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: '#C4DBF6',
                    borderColor: '#8590AA',
                    borderWidth: 2,
                    data: []
                }
            ]
        }
    }
    

    componentDidMount = async ()=> {
        const searchURL1= `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=2w7o5GdWgv60hcHi9C37ultmPq1dzEfi&q=${this.state.allData.title}`
        let response1 = await axios.get(`${searchURL1}`)
        // console.log(response1)
        this.setState({accuLocation:response1.data[0].Key})
        console.log(this.state.accuLocation)
        const searchURL2= `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.state.accuLocation}?apikey=2w7o5GdWgv60hcHi9C37ultmPq1dzEfi&details=true`
        let response2 = await axios.get(`${searchURL2}`)
        this.state.accuData.unshift(response2.data.DailyForecasts)
        console.log(response2.data)
        this.setState({accuData:this.state.accuData[0]})
        console.log(this.state.accuData);
        return
    }

    render(){
    
    this.state.testWeather.map((data,i) => {
        if(data.woeid == this.props.match.params.id){
            this.state.allData = data
            const weatherWeek = this.state.allData.consolidated_weather
            // console.log(weatherWeek);
            this.state.localWeather = weatherWeek
            // this.key(this.state.allData.title);
        }
    })
    
    function getDayOfWeek(date) {
        const dayOfWeek = new Date(date).getDay();    
        return isNaN(dayOfWeek) ? null : 
          ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    }

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

    this.state.accuData.map((rain,i) => {
        console.log(rain.Date)
        this.bar.datasets[0].data.push(rain.Day.RainProbability)
        this.bar.labels.push(rain.Date)
        console.log(this.bar.datasets[0].data)
        console.log(this.bar.labels)
    });


    this.state.localWeather.map((weather,i) => {
        this.state.labels.push(`${weather.applicable_date}`)
        console.log(this.state.localWeather)
        this.state.datasets[0].data.push(usaTemp(weather.max_temp))
        this.state.datasets[1].data.push(usaTemp(weather.min_temp))
        this.state.wind.push(limitNum(weather.wind_speed))
        if(i===0){this.state.days.push("Today")} else {this.state.days.push(getDayOfWeek(weather.applicable_date))}
        if(i===0){this.state.sunrise=sunshine(this.state.allData.sun_rise)}
        if(i===0){this.state.sunset=sunshine(this.state.allData.sun_set)}
    });
        
    const weekWeather = this.state.localWeather.map((weather,i) => {
       if(i===0){
            return(
                <div className="today">
                    <h2 id='todayDate' type='date'>{this.state.days[i]}</h2> 
                    <br></br>
                    <img src={'https://www.metaweather.com/static/img/weather/png/' + weather.weather_state_abbr + '.png'} alt='weather icon'></img>
                        <ul>
                            <div className='todayInfo'>
                                <li id='weather'>Weather:{weather.weather_state_name}</li>
                                <li id='temp' type='number'>Current Temp:{this.state.datasets[0].data[i]}</li>
                                <li id='high' maxLength={8}>High:{this.state.datasets[0].data[i]}</li>
                                <li id='low'>Low:{this.state.datasets[1].data[i]}</li>
                                <li id='wind'>Wind:{this.state.wind[i]}mph {weather.wind_direction_compass} </li>   
                            </div>
                        </ul>
                    <div className="sunshine">
                        <img key="uniqueId1" src={'https://image.flaticon.com/icons/png/512/728/728123.png'} alt='surise icon'></img>
                        <p className='sun'>Sunrise: {this.state.sunrise} AM</p>
                        <img key="uniqueId2" src={'https://www.flaticon.com/svg/static/icons/svg/362/362409.svg'} alt='sunset icon'></img>
                        <p className='sun'>Sunset: {this.state.sunset} PM</p>
                    </div>
                    
                    <br></br>
                </div>
            )
       } else {
            return(
                <div className="day">
                <h2 type='date'>{this.state.days[i]}</h2> 
                    <ul>
                        <img src={'https://www.metaweather.com/static/img/weather/png/' + weather.weather_state_abbr + '.png'} alt='weather icon'></img>
                        <ul className="dayInfo">
                            <li id='weather'>Weather:{weather.weather_state_name}</li>
                            {/* <li id='temp' type='number'>Average Temp:{this.state.datasets[0].data[i]}</li> */}
                            <li id='high' maxLength={8}>High:{this.state.datasets[0].data[i]}</li>
                            <li id='low'>Low:{this.state.datasets[1].data[i]}</li>
                            <li id='wind'>Wind:{this.state.wind[i]}mph {weather.wind_direction_compass} </li>
                        </ul>    
                    </ul>
                </div>
            )
       }        
    });

      return(
        <div className="App">
          <main className="App-main">
            <h1 className='location'>{this.state.allData.title}</h1>
            <button>Save to favorites</button>
            <div className='week'>
                {weekWeather}
            </div>
          </main>
            <div className='bigData'>
                <div className='chart'>
                    <Line
                        data={this.state}
                        options={{
                            title:{
                                display:true,
                                text:'Weekly Temperature',
                                fontSize:25
                            },
                            legend:{
                                display:true,
                                position:'right'
                            }
                        }}
                    />
            </div>
            <div className = "Bar">
                    <Bar
                    data={this.bar}
                    options={{
                        title:{
                        display:true,
                        text:'Chance of Rain',
                        fontSize:30
                        },
                        legend:{
                        display:true,
                        position:'right'
                        }
                    }}
                    />
                </div>
            </div>
        </div>
      )
    };
  }
  
  export default LocationData;