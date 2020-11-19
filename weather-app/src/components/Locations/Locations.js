import React,{Component} from 'react';
import './Locations.css'

class Locations extends Component{
    render(){
        console.log(this.props)
        // let allLocations = this.props.weatherData.map((location,index)=>{
        //     return(
        //       <div key={index}>
        //           <h1>{location.title}</h1>
        //     </div>
        //     );
        // });
        return(
            <div classname="location-list">
                <h1>List of Locations</h1>
            </div>
        )
    }
}

export default Locations;