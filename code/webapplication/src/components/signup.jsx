import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { signUp } from "../services/signUpService";
import { Link, withRouter } from "react-router-dom";
import "./signup.css";

class SignUpForm extends Form {
  state = {
    data: {
      name: "",
      username: "",
      password: "",
      email: "",
      contactNumber: "",
      address: "",
    },
    errors: {},
    successMessage: "",
  };

  schema = {
    name: Joi.string().required().label("Agency Name"),
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    email: Joi.string().required().label("Email"),
    contactNumber: Joi.string().required().label("Contact Number"),
    address: Joi.string().required().label("Address"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await signUp({
        name: data.name,
        username: data.username,
        password: data.password,
        email: data.email,
        contactNumber: data.contactNumber,
      });
      console.log("User added successfully!");
      this.props.history.push("/verify");
    } catch (error) {
      console.error("Error adding user:", error.message);
    }
  };

  render() {
    return (
      <div className="log-container">
        <div className="log-form">
          <form onSubmit={this.handleSubmit}>
            <h1>Sign Up</h1>
            {this.renderInput("name", "Agency Name")}
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("email", "Email")}
            {this.renderInput("contactNumber", "Contact Number")}
            {this.renderInput("address", "Address")} <br />
            {this.renderButton("Register")}
            <p1>
              {" "}
              Already have an account?
              <Link to="/loginForm"> Login</Link>
            </p1>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUpForm);
