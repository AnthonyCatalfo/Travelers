import React from "react";

class Itineraries extends React.Component {
  state = {
    data: []
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
        this.setState({ data: res })
        console.log(this.state.data)
      })
      .catch(error => console.log('No Data Found'));
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12" style={{ marginTop: "30px" }}>
          <h4> Destinations</h4>
        </div>
        {this.state.data.map((e) => (
          <div
            key={e.id}
            className="col-md-3"
            style={{ backgroundColor: "#eeeeee", margin: "10px", padding: "5px" }}>
            <h4>{e.name}</h4>

            <div>
              {e.destinations.map((d) => (
                <div key={d.name}>{d.name} <span>{d.visited ? "yes" : "no"}</span></div>

              ))}
            </div>
          </div>
        ))}

        <div className="row">
          <div className="col-md-12" style={{ fontSize: "16px", padding: "30px", color: "grey" }}>
            {this.state.data.length === 0 && (<i>No data is available! </i>)}
          </div>
        </div>
      </div>
    );
  }
}


export default Itineraries;