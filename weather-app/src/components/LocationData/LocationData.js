import React, { Component } from "react";
import "./LocationData.css";
import {Line,Bar} from 'react-chartjs-2';

class LocationData extends Component{
    constructor() {
        super()
        this.state = {
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
    
    const localWeather = this.props.locationData
    // const test = this.props.weatherData[0]
    // const test2 = this.props.weatherData.find(weatherData => weatherData.woeid === this.props.match.params.id)
    // let i;
    // let test2;
    // for(i=0; i<50; i++){
    //     if (this.props.weatherData[i].woeid === this.props.match){
    //         return(
    //             test2 = this.props.weatherData[i].consolidated_weather
    //         )
    //     }
    // }

    // console.log(this.props.match.params.id)
    // find(localWeather => weatherData.woeid === this.props.match.params.id)
    // console.log(test)
    // console.log(test2)


    // const localWeather = this.props.weatherData.find(localWeather => weatherData.woeid === this.props.match.params.id); 
    //^^^Will line about when more data points are in add lCan have it be weatherData.title or weatherData.woeid for search method
    // console.log(localWeather)
    
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

    localWeather.map((weather,i) => {
        this.state.labels.push(`${weather.applicable_date}`)

        this.state.datasets[0].data.push(usaTemp(weather.the_temp))
        this.state.datasets[1].data.push(usaTemp(weather.max_temp))
        this.state.datasets[2].data.push(usaTemp(weather.min_temp))
        this.bar.datasets[0].data.push(weather.predictability)
        this.bar.labels.push(weather.applicable_date)
        this.state.wind.push(limitNum(weather.wind_speed))
        this.state.days.push(getDayOfWeek(weather.applicable_date))
     });
        
    const weekWeather = localWeather.map((weather,i) => {
       
        return(
            <div className="day">
            <h2 type='date'>{this.state.days[i]}</h2> 
                <ul>
                    <img src={'https://www.metaweather.com/static/img/weather/png/' + weather.weather_state_abbr + '.png'}></img>
                    <li id='weather'>Weather:{weather.weather_state_name}</li>
                    <li id='temp' type='number'>Average Temp:{this.state.datasets[0].data[i]}</li>
                    <li id='high' maxLength={8}>High:{this.state.datasets[1].data[i]}</li>
                    <li id='low'>Low:{this.state.datasets[2].data[i]}</li>
                    <li id='wind'>Wind:{this.state.wind[i]}mph {weather.wind_direction_compass} </li>
                </ul>
            </div>
        )
        
    });


    
      return(
        <div className="App">
          <main className="App-main">
            <h1 className='location'>San Antonio</h1> {/* Update this when we pull actual data */}
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