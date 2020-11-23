import React,{Component} from 'react';
// import { Route, Link, Switch, Redirect} from 'react-router-dom';
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
            // console.log(cityArray)
            // console.log(event.target.value)
            
        })

        this.setState({
            weatherData: cityArray,
        })

    }

    render() {

        // console.log(this.state)
        // console.log(this.props.inputValue)
        let allLocations = this.props.weatherData.map((location,index)=>{
            console.log(this.state)
            return(
                

              <div className="card" key={index}>
                  <h3>{location.title} <span id="woeid">(woeid:{location.woeid})</span></h3>
                  <p>Timezone: {location.timezone} <span>({location.timezone_name})</span></p>
                  
                  

            </div>
            
            );
        });
       
        
        return(

        <div>

            <p>{this.state.weatherData.title}</p>
           
        <div>
        <header className="locations-header">
            <h1>List of Locations</h1>
            <form name='citySearch'>
            <input type='text' placeholder='Search City' onChange={this.citySearch}></input>
            </form>

            <button type ="submit" placeholder="searchcity" form="citySearch">Submit</button>
          
        </header>
            <div className="locations-grid">
                {/* {newLocation} */}
                {allLocations} 
            </div>
        </div>
        </div>
        )
    }
}

export default Locations;