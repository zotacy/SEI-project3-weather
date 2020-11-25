import React,{Component} from 'react';
import './AddBase.css';

class AddBase extends Component{
    render(){
        console.log(this.props.baseCities);
        let baseCities = this.props.baseCities.map((location,index)=>{
            this.props.addLocation(location.woeid)
        })
        return(
            <div>{baseCities}</div>
        )
    }
}

export default AddBase;