import React, {Component} from 'react';
import {BrowserRouter, NavLink, Route, Switch} from "react-router-dom";

import './App.css';
import LoginPage from "./components/LoginPage";
import Itineraries from "./components/Itineraries";
import YourDestinations from "./components/YourDestinations";

class App extends Component {

  /*constructor(props) {
    super(props);
    // props.actions.getSmurfData();
  }*/

  render() {
    return (
      <BrowserRouter>
        <div className="App container">
          <div className="sidenav">
            <h3>Nabis</h3>
            <NavLink to="/">Login</NavLink>
            <NavLink to="/all-itineraries">All Itineraries</NavLink>
            <NavLink to="/your-destinations">Your Destinations</NavLink>
          </div>
          <div className="main">
            <Switch>
              <Route exact path="/" component={LoginPage}/>
              <Route path="/all-itineraries" component={Itineraries}/>
              <Route path="/your-destinations" component={YourDestinations}/>
              {/*<Route component={NotFoundPage}/>*/}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
