import React from "react";
import { Link, Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import "./login.css";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login({ username: data.username, password: data.password });

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/home";
    } catch (ex) {
      if (ex.response) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/home" />;

    return (
      <div className="login-container">
        <div className="login-form">
          <form onSubmit={this.handleSubmit}>
            <h1>Login</h1>
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")} <br />
            {this.renderButton("Login")} <br />
            <p1>
              {" "}
              Don't have an account?
              <Link to="/signup"> Sign Up</Link>
            </p1>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
