import React,{Component} from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import './Header.css'

class Header extends Component{
    render(){
        return(
            <div>
                <header className="App-header">
                    <h1>Weather App Header</h1>
                    <Link to="/LocationData"><h3>Weekly Forecast</h3></Link>
                </header>
            </div>
        )
    }
}

export default Header;