import React from "react";

class YourDestinations extends React.Component {
  state = {
    destinations: [],
    newDestination: "",
    message: ""
  };

  componentDidMount() {
    fetch('https://young-beyond-8772.herokuapp.com/travelers/', {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token token=${localStorage.token}`
      },
    })
      .then(response => response.json())
      .then((res) => {

        let data = res.filter(e => e.id.toString() === localStorage.id.toString())
        let dest = data.map((e) => e.destinations.map(f => f))[0]

        this.setState({ destinations: dest })

        console.log('d= ', JSON.stringify({ destinations: dest }))
        this.updateAPI()
      })
      .catch(error => console.log('No Data Found'));
  }
  updateAPI = () => {
    console.log(JSON.stringify({ destinations: this.state.destinations }))
    //console.log("EP+ ", `https://young-beyond-8772.herokuapp.com/travelers/${localStorage.id.toString()}`)
    fetch(`https://young-beyond-8772.herokuapp.com/travelers/${localStorage.id.toString()}`, {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token token=${localStorage.token}`
      },

      body: JSON.stringify({ destinations: this.state.destinations })
    })
      
      




      .then(response => response.json())
      .then((res) => {
        if(res.status==='503'){
          this.setState({ message: "We are experiencing overload. Please try again later." })
        }
        console.log('res ', res)
        console.log('dest', this.state.destinations)
        // let d = res.filter(e => e.id == localStorage.id)
        // this.setState({ data: d })
        // console.log(localStorage.id)
        //  console.log(d)
      })
      .catch(error => console.log('Patch error',error));
  }
  
  handleCheck = (name) => {
    console.log("inside handle Check", name)
    let updatedDestinations =
      this.state.destinations.map((e) => {
        if (e.name === name) {
          e.visited = !e.visited
        }
        return e
      })
    console.log('hcu', updatedDestinations)
    this.setState({ destinations: updatedDestinations, message: "" }, this.updateAPI)
  }

  handleDelete = (name) => {
    console.log("inside  handleDelete", name)
    let updatedDestinations =
      this.state.destinations.filter((e) => e.name !== name)
    this.setState({ destinations: updatedDestinations, message: "" }, this.updateAPI)

  }

  handleAdd = () => {
    console.log("in add")
    let result = this.state.destinations.filter(item => item.name === this.state.newDestination)[0]
    console.log("result", result)
    if (result !== undefined) {
      this.setState({ message: "Destination already exists" })
    } else {
      let d = { "name": this.state.newDestination, visited: false }
      let updatedDestinations = [...this.state.destinations, d]
      console.log('in add 2', updatedDestinations)
      this.setState({ destinations: updatedDestinations }, this.updateAPI)
      this.setState({ newDestination: "", message: "" })
      //this.updateAPI();
    }

  }

  handleInputChange = (evt) => {
    this.setState({ newDestination: evt.target.value })
  }

  render() {
    return (
      <div className="row">


        <h4>My Destinations</h4>
        <div className="col-md-12" style={{ marginTop: "30px" }}>
          <div style={{ color: 'red' }}>{this.state.message}</div>
          <table>
            <thead><tr><th>Destinations</th><th>Visited?</th><th></th></tr></thead>
            <tbody>
              {this.state.destinations.map((e) => (
                <tr key={e.name}>
                  <td>
                    {e.name}
                  </td>
                  <td>
                    {/* {e.visited ? "yes" : "no"} */}
                    {/* {e.visited ? <input type="checkbox" defaultChecked></input> : <input type="checkbox" ></input>} */}
                    <input type="checkbox" checked={e.visited} onChange={() => this.handleCheck(e.name)}></input>
                  </td>
                  <td> <button onClick={() => this.handleDelete(e.name)}>x</button></td>
                  <td>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div><input type="text" value={this.state.newDestination} onChange={this.handleInputChange}></input></div>
          <div><button onClick={() => this.handleAdd()}>+</button></div>
        </div>

        <div className="row">
          <div className="col-md-12" style={{ fontSize: "16px", padding: "30px", color: "grey" }}>
            {this.state.destinations.length === 0 && (<i>No data is available! </i>)}
          </div>
        </div>
      </div>
    );
  }
}


export default YourDestinations;