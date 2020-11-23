import React,{Component} from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import './Header.css'

class Header extends Component{
    render(){
        return(
            <div>
                <header className="App-header">
                    <h1>Weather App Header</h1>
                    <Link to ="/"><h3 id="header-link">Weather Home</h3></Link>
                    <Link to="/weather/2487956"><h5 id="header-link">Weekly Forecast</h5></Link>
                    <Link to="/new"><button id="newLocation">Add New Location</button></Link>
                </header>
            </div>
        )
    }
}

export default Header;