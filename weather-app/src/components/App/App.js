import React, { Component } from 'react';
import { Route, Link, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import LocationData from '../LocationData/LocationData'
import Locations from '../Locations/Locations';
import AddLocations from "../LocationsAdd/AddLocations";
import testLocations from './testLocations.json';
import practiceData from './PracticeData.json';

class App extends Component{
  constructor(props){
    super(props);
    
    this.state={
      weatherData:[],
      locationData:[],
      metaWeatherData:[]
    }
    // console.log(this.state)
    // console.log(this.props)
  }

  componentDidMount = async () => {
    this.setState({
      weatherData: testLocations,
      locationData: practiceData,
      // metaWeatherData: this.props.metaWeatherData,
    })
  }
  
  render(){
    return (
      <div className="App">
        <header>
        <Header/>
        </header>
        <Switch>
          <Route path="/" exact render={routerProps => <Locations {...this.props}{...this.state}/>}/>
          <Route path="/new" exact render={routerProps => <AddLocations/>}/>
          <Route path="/weather/:id" exact render={routerProps => <LocationData {...routerProps} {...this.state} />}/>
        </Switch>
        <main className="App-main">

        </main>
      </div>
    )
  };
}

export default App;
