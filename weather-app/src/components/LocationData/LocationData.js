import React, { Component } from "react";
import "./LocationData.css";
import testLocations from '../App/testLocations.json';
// import images from './images';
import {Line,Bar} from 'react-chartjs-2';

class LocationData extends Component{
    constructor(props) {
        super(props)
        this.state = {
            testWeather: testLocations,
            allData:[],
            localWeather:[],
            days:[],
            wind:[],
            labels: [],
            datasets: [
                    {
                        label: 'Ave. Temperature',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: []
                    }, {
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
    
    render(){

    this.state.testWeather.map((test,i) => {
        if(test.woeid == this.props.match.params.id){
            this.state.allData = test
            const weatherWeek = this.state.allData.consolidated_weather
            console.log(weatherWeek);
            this.state.localWeather = weatherWeek
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

    this.state.localWeather.map((weather,i) => {
        this.state.labels.push(`${weather.applicable_date}`)

        this.state.datasets[0].data.push(usaTemp(weather.the_temp))
        this.state.datasets[1].data.push(usaTemp(weather.max_temp))
        this.state.datasets[2].data.push(usaTemp(weather.min_temp))
        this.bar.datasets[0].data.push(weather.predictability)
        this.bar.labels.push(weather.applicable_date)
        this.state.wind.push(limitNum(weather.wind_speed))
        if(i===0){this.state.days.push("Today")} else {this.state.days.push(getDayOfWeek(weather.applicable_date))}
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
                                <li id='temp' type='number'>Average Temp:{this.state.datasets[0].data[i]}</li>
                                <li id='high' maxLength={8}>High:{this.state.datasets[1].data[i]}</li>
                                <li id='low'>Low:{this.state.datasets[2].data[i]}</li>
                                <li id='wind'>Wind:{this.state.wind[i]}mph {weather.wind_direction_compass} </li>   
                            </div>
                        </ul>
                    <br></br>
                </div>
            )
       } else {
            return(
                <div className="day">
                <h2 type='date'>{this.state.days[i]}</h2> 
                    <ul>
                        <img src={'https://www.metaweather.com/static/img/weather/png/' + weather.weather_state_abbr + '.png'} alt='weather icon'></img>
                        <li id='weather'>Weather:{weather.weather_state_name}</li>
                        <li id='temp' type='number'>Average Temp:{this.state.datasets[0].data[i]}</li>
                        <li id='high' maxLength={8}>High:{this.state.datasets[1].data[i]}</li>
                        <li id='low'>Low:{this.state.datasets[2].data[i]}</li>
                        <li id='wind'>Wind:{this.state.wind[i]}mph {weather.wind_direction_compass} </li>
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