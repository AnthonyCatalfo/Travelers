import React from "react";
import { Redirect } from 'react-router'

class LoginPage extends React.Component {

  state = {
    toItineraries: false,
    message: ""
  };

  setName = event => {
    this.setState({ currentDestination: { name: event.target.value } });
  };

  login = event => {

    fetch('https://young-beyond-8772.herokuapp.com/auth', {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: this.state.currentDestination.name })
    })

      .then(response => response.json())

      .then((res) => {
        localStorage.id = res.id;
        localStorage.token = res.token;
        console.log(localStorage.getItem('id'))
        console.log(localStorage.getItem('token'))
        this.setState({ message: '' })
        //redirect to destination page
        this.setState({ toItineraries: true })
    


      })
      .catch(error => this.setState({ message: 'try again' }));


    event.preventDefault(); // prevent from refreshing the page
  };

  render() {
    if (this.state.toItineraries === true) {
      console.log("redirecting")
      return <Redirect to='/all-itineraries' />
    }
    return (
      <form onSubmit={this.login}>
        <h4>Login</h4>
        <div style={{ color: 'red' }}>{this.state.message}</div>
        <div className="row" style={{ marginTop: "40px" }}>
          <div className="col-md-5">
            <input
              type="text"
              value={this.state.name}
              style={{ width: "100%" }}
              placeholder="Enter your name here"
              onChange={this.setName}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5" style={{ marginTop: "15px" }}>
            <button type="submit">
              Login {this.state.name ? `as ${this.state.name}` : ''}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default LoginPage;