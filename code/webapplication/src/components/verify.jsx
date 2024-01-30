import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { verify } from "../services/signUpService";
import { Link, withRouter } from "react-router-dom";
import "./login.css";

class verifyForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      verificationCode: "",
    },
    errors: {},
    successMessage: "",
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    verificationCode: Joi.string().required().label("Verification Code"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await verify({
        username: data.username,
        password: data.password,
        verificationCode: data.verificationCode,
      });
      // Optionally, you can redirect the user or perform other actions after the bus is successfully added.
      console.log("User verified successfully!");
      this.props.history.push("/loginForm");
    } catch (error) {
      console.error("Error verifying user:", error.message);
    }
  };

  render() {
    return (
      <>
        <div className="login-container">
          <div className="login-form">
            <form onSubmit={this.handleSubmit}>
              <h1>Verify</h1>
              {this.renderInput("username", "Username")}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("verificationCode", "Verification Code")} <br />
              {this.renderButton("Verify")} <br />
              <p1>
                {" "}
                Already have an account?
                <Link to="/loginForm"> Login</Link>
              </p1>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(verifyForm);
