import React, { Component } from "react";
import { Route } from "react-router-dom";
import { getBuses } from "../services/busService";

class Track extends Component {
  state = {
    busses: [],
  };

  async componentDidMount() {
    try {
      const { data } = await getBuses();
      this.setState({ busses: data.registeredVehicles });
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  }

  handleCardClick = (bus) => {
    this.props.history.push("/LocationTracking", { bus });
  };

  render({ busses } = this.state) {
    return (
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {busses.map((bus) => (
          <div
            className="card"
            key={bus.vehicleID}
            onClick={() => this.handleCardClick(bus)}
            style={{
              margin: "20px",
              marginTop: "50px",
              padding: "15px",
              borderRadius: "10px",
              height: "155px",
              width: "350px",
              border: "none",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff",
              transition: "transform 0.2s, background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.backgroundColor = "#FFA500";
            }} // Scale up and change background color on hover
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.backgroundColor = "#ffffff";
            }} // Scale down and change background color on hover
          >
            <div className="card-body">
              <h5 className="card-title">Tracking {bus.vehicleID}</h5>
              {/* Any additional card content can go here */}
              <i
                class="fa fa-bus"
                aria-hidden="true"
                style={{
                  fontSize: "70px", // Increase the size of the icon
                  color: "#343434", // Change the color of the icon
                  margin: "auto", // Center both horizontally and vertically
                  display: "block", // Ensure the icon behaves as a block element
                }}
              ></i>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Track;
