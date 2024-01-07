import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { addNewBus } from "../services/busService";

class Bus extends Form {
  state = {
    data: {
      licencePlate: "",
      school: "",
    },
    errors: {},
  };

  schema = {
    licencePlate: Joi.string().required().label("Licence Plate"),
    school: Joi.string().required().label("School"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await addNewBus({
        licencePlateNumber: data.licencePlate,
        school: data.school,
      });
      // Optionally, you can redirect the user or perform other actions after the bus is successfully added.
      console.log("Bus added successfully!");
    } catch (error) {
      console.error("Error adding bus:", error.message);
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-4">
          <h1>Add New Bus</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("licencePlate", "Licence Plate")}
            {this.renderInput("school", "School")}
            {this.renderButton("Save")}
          </form>
        </div>
      </div>
    );
  }
}

export default Bus;
