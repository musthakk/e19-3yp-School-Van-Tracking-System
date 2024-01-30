import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { addNewBus } from "../services/busService";
import { getBuses } from "../services/busService";

class Bus extends Form {
  state = {
    data: {
      vehicleNumber: "",
      School: "",
      SchoolAddress: "",
      seats: "",
      ThingName: "",
    },
    errors: {},
    busses: [],
  };

  schema = {
    vehicleNumber: Joi.string().required().min(6).max(7).label("Licence Plate"),
    School: Joi.string().required().label("School"),
    SchoolAddress: Joi.string().required().label("SchoolAddress"),
    seats: Joi.number().required().label("Seats"),
    ThingName: Joi.string().required().length(6).label("ThingName"),
  };

  async componentDidMount() {
    try {
      const { data } = await getBuses();
      this.setState({ busses: data.registeredVehicles });
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await addNewBus({
        vehicleNumber: data.vehicleNumber,
        School: data.School,
        SchoolAddress: data.SchoolAddress,
        seats: data.seats,
        ThingName: data.ThingName,
      });
      // Optionally, you can redirect the user or perform other actions after the bus is successfully added.
      console.log("Bus added successfully!");
    } catch (error) {
      console.error("Error adding bus:", error.message);
    }
  };

  render({ busses } = this.state) {
    return (
      <div className="row">
        <div className="col-4">
          <div
            className="card"
            style={{
              marginTop: "20px",
              marginLeft: "20px",
              marginRight: "10px",
              marginBottom: "20px",
              width: "450px",
              padding: "30px",
              borderRadius: "20px",
              height: "470px",
              border: "none",
              backgroundColor: "#fefcd2",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h1>Add a new bus</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("vehicleNumber", "Licence Plate")}
              {this.renderInput("School", "School")}
              {this.renderInput("SchoolAddress", "School Address")}
              {this.renderInput("seats", "Seats")}
              {this.renderInput("ThingName", "SureWay Serial Number")}
              <br />
              {this.renderButton("Save")}
            </form>{" "}
            <br />
          </div>
          <a href="/assignBusses" style={{ textDecoration: "none" }}>
            <div
              className="card"
              style={{
                marginTop: "10px",
                marginLeft: "20px",
                marginRight: "10px",
                marginBottom: "20px",
                width: "450px",
                padding: "15px",
                borderRadius: "20px",
                height: "120px",
                border: "none",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s, background-color 0.2s",
                backgroundColor: "#fefcd2",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.backgroundColor = "#FCD12A";
              }} // Scale up and change background color on hover
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "#fefcd2";
              }} //
            >
              <div className="card-body">
                <h5 className="card-title" style={{ color: "#343434" }}>
                  Assign Busses To new Children
                </h5>
                <i
                  class="fa fa-address-card"
                  aria-hidden="true"
                  style={{
                    fontSize: "40px", // Increase the size of the icon
                    color: "#DD0000", // Change the color of the icon
                    margin: "auto", // Center both horizontally and vertically
                    display: "block", // Ensure the icon behaves as a block element
                  }}
                ></i>
              </div>
            </div>
          </a>
        </div>

        <div className="col">
          <div
            className="card"
            style={{
              marginTop: "20px",
              marginLeft: "50px",
              marginRight: "10px",
              marginBottom: "20px",
              width: "810px",
              height: "610px",
              padding: "30px",
              borderRadius: "20px",
              backgroundColor: "#fefcd2",
              border: "none",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h1>Busses</h1>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Licence Plate</th>
                  <th scope="col">School</th>
                  <th scope="col">Seats</th>
                  <th scope="col">Seats filled</th>
                  <th scope="col">Driver</th>
                  <th scope="col">Serial Number</th>
                </tr>
              </thead>
              <tbody>
                {busses.map((bus) => (
                  <tr key={bus.licencePlate}>
                    <td>{bus.vehicleID}</td>
                    <td>{bus.School}</td>
                    <td>{bus.seats}</td>
                    <td>{bus.seatsFilled}</td>
                    <td>{bus.Driver}</td>
                    <td>{bus.ThingName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Bus;
