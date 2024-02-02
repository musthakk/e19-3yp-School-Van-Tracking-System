import React, { Component } from "react";
import userbanner from "../images/userbanner.jpg";
import auth from "../services/authService";

class AdminDetails extends Component {
  state = {
    user: { username: "Anonymous" },
  };

  componentDidMount() {
    if (auth.getCurrentUser()) {
      const user = auth.getCurrentUser().user;
      this.setState({ user });
    }
  }

  render() {
    const { user } = this.state;
    return (
      <div
        className="card"
        style={{
          margin: "30px",
          padding: "15px",
          borderRadius: "10px",
          height: "250px",
          border: "none",
          width: "600px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
          transition: "transform 0.2s, background-color 0.2s",
        }}
      >
        {/* <img src={userbanner} className="card-img-top" alt="..." /> */}
        <div className="card-body">
          <h5
            className="card-title"
            style={{ fontWeight: "bold", fontSize: "40px" }}
          >
            {" "}
            {user.name}
          </h5>
          <p
            className="card-text"
            style={{ fontWeight: "bold", fontSize: "20px" }}
          >
            Email: {user.email} <br />
            Contact Number: {user.contactNumber}
          </p>
        </div>
      </div>
    );
  }
}

export default AdminDetails;
