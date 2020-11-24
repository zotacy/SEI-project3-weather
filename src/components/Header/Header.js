import React,{Component} from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import './Header.css'

class Header extends Component{
    render(){
        return(
            <div>
                <header className="App-header">
                    <h1></h1>
                    <Link to ="/"><h1 id="header-link">Whistling Weather Report</h1></Link>
                    {/* <Link to="/weather/44418"><h5 id="header-link">Weekly Forecast</h5></Link> */}
                    {/* <Link to="/new"><button id="newLocation">Add New Location</button></Link> */}
                    {/* <Link to="/search"><button id="searchLocations">Find New Location</button></Link> */}
                </header>
            </div>
        )
    }
}

export default Header;