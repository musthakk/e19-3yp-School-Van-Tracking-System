import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { addNewBus } from "../services/busService";

class Bus extends Form {
  state = {
    data: {
      licencePlate: "",
      school: "",
      sheets: "",
    },
    errors: {},
    busses: [
      {
        licencePlate: "AA-1234",
        school: "St. Mary's",
        sheets: 10,
        assignedChildren: 10,
        assignedDriver: "John Doe",
      },
      {
        licencePlate: "AB-1234",
        school: "St. Mary's",
        sheets: 10,
        assignedChildren: 10,
        assignedDriver: "John Doe",
      },
    ],
  };

  schema = {
    licencePlate: Joi.string().required().label("Licence Plate"),
    school: Joi.string().required().label("School"),
    sheets: Joi.number().required().label("Sheets"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await addNewBus({
        licencePlateNumber: data.licencePlate,
        school: data.school,
        sheets: data.sheets,
        SheetsFilled: 0,
        Driver: "",
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
          <h1>Add New Bus</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("licencePlate", "Licence Plate")}
            {this.renderInput("school", "School")}
            {this.renderInput("sheets", "Sheets")} <br />
            {this.renderButton("Save")}
          </form>
        </div>
        <div className="col">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Licence Plate</th>
                <th scope="col">School</th>
                <th scope="col">Sheets</th>
                <th scope="col">Sheets filled</th>
                <th scope="col">Driver</th>
              </tr>
            </thead>
            <tbody>
              {busses.map((bus) => (
                <tr key={bus.licencePlate}>
                  <td>{bus.licencePlate}</td>
                  <td>{bus.school}</td>
                  <td>{bus.sheets}</td>
                  <td>{bus.assignedChildren}</td>
                  <td>{bus.assignedDriver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Bus;
