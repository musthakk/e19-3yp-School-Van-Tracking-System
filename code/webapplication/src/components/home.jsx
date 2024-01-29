import React, { Component } from "react";
import banner from "../images/banner.jpg";
import AccidentAlers from "./accidentAlerts";
import "./components.css";
import "../index.css";
import map from "../images/map.png";

class Home extends Component {
  state = {};

  render() {
    return (
      <>
        <div class="row row-cols-1 row-cols-md-2 ">
          <div class="col">
            <div
              class="card"
              style={{
                marginTop: "20px",
                marginLeft: "20px",
                marginRight: "0px",
                marginBottom: "10px",
                padding: "0px",
                borderRadius: "20px",
                height: "350px",
                border: "none",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div class="card-body">
                <div className="card text-bg-dark">
                  <img src={banner} className="card-img" alt="..." />
                  <div className="card-img-overlay">
                    {/* <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p className="card-text">
              <small>Last updated 3 mins ago</small>
            </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div
              class="card"
              style={{
                marginTop: "20px",
                marginLeft: "0px",
                marginRight: "20px",
                marginBottom: "10px",
                padding: "15px",
                borderRadius: "20px",
                height: "400px",
                border: "none",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fefcd2",
              }}
            >
              <div class="card-body">
                <div class="row row-cols-1 row-cols-md-2 g-4">
                  <div class="col">
                    <a href="/Bus" style={{ textDecoration: "none" }}>
                      <div
                        class="card"
                        style={{
                          margin: "0px",
                          padding: "15px",
                          borderRadius: "10px",
                          height: "155px",
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
                        <div class="card-body" style={{ textAlign: "center" }}>
                          <h5
                            className="card-title"
                            style={{ fontWeight: "bold", fontSize: "19px" }}
                          >
                            VEHICLES
                          </h5>
                          <div
                            style={{ textAlign: "center", lineHeight: "1px" }}
                          >
                            <i
                              class="fa fa-bus"
                              aria-hidden="true"
                              style={{
                                fontSize: "70px", // Increase the size of the icon
                                color: "#007D09", // Change the color of the icon
                                margin: "auto", // Center both horizontally and vertically
                                display: "block", // Ensure the icon behaves as a block element
                              }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div class="col">
                    <a href="/RegisterUser" style={{ textDecoration: "none" }}>
                      <div
                        class="card"
                        style={{
                          margin: "0px",
                          padding: "15px",
                          borderRadius: "10px",
                          height: "155px",
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
                        <div class="card-body" style={{ textAlign: "center" }}>
                          <h5
                            className="card-title"
                            style={{ fontWeight: "bold", fontSize: "19px" }}
                          >
                            REGISTRATIONS
                          </h5>
                          <div
                            style={{ textAlign: "center", lineHeight: "1px" }}
                          >
                            <i
                              class="fa fa-address-book"
                              aria-hidden="true"
                              style={{
                                fontSize: "70px", // Increase the size of the icon
                                color: "#E13D00", // Change the color of the icon
                                margin: "auto", // Center both horizontally and vertically
                                display: "block", // Ensure the icon behaves as a block element
                              }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  <div class="col">
                    <a href="/UserRecord" style={{ textDecoration: "none" }}>
                      <div
                        class="card"
                        style={{
                          marginTop: "0px",
                          padding: "15px",
                          borderRadius: "10px",
                          height: "155px",
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
                        <div class="card-body" style={{ textAlign: "center" }}>
                          <h5
                            className="card-title"
                            style={{ fontWeight: "bold", fontSize: "19px" }}
                          >
                            USERS
                          </h5>
                          <div
                            style={{ textAlign: "center", lineHeight: "1px" }}
                          >
                            <i
                              class="fa fa-users"
                              aria-hidden="true"
                              style={{
                                fontSize: "70px", // Increase the size of the icon
                                color: "#00029D", // Change the color of the icon
                                margin: "auto", // Center both horizontally and vertically
                                display: "block", // Ensure the icon behaves as a block element
                              }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div class="col">
                    <a href="/DriverRecord" style={{ textDecoration: "none" }}>
                      <div
                        class="card"
                        style={{
                          margin: "0px",
                          padding: "15px",
                          borderRadius: "10px",
                          height: "155px",
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
                        <div class="card-body" style={{ textAlign: "center" }}>
                          <h5
                            className="card-title"
                            style={{ fontWeight: "bold", fontSize: "19px" }}
                          >
                            DRIVERS
                          </h5>
                          <div
                            style={{ textAlign: "center", lineHeight: "1px" }}
                          >
                            <i
                              class="fa fa-id-card"
                              aria-hidden="true"
                              style={{
                                fontSize: "70px", // Increase the size of the icon
                                color: "#820089", // Change the color of the icon
                                margin: "auto", // Center both horizontally and vertically
                                display: "block", // Ensure the icon behaves as a block element
                              }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div
              class="card"
              style={{
                marginTop: "10px",
                marginLeft: "20px",
                marginRight: "0px",
                marginBottom: "20px",
                padding: "20px",
                borderRadius: "20px",
                height: "400px",
                border: "none",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div class="card-body">
                <div class="row row-cols-1 row-cols-md-1 g-2">
                  <div class="col">
                    <div class="card">
                      <div class="card-body">
                        <h5 className="card-title">Driver records</h5>
                        <p className="card-text">
                          You can see records of all your drivers' here
                        </p>
                        <a href="/DriverRecord" className="btn btn-primary">
                          Driver Records
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <div class="card-body">
                        <h5 className="card-title">Driver records</h5>
                        <p className="card-text">
                          You can see records of all your drivers' here
                        </p>
                        <a href="/DriverRecord" className="btn btn-primary">
                          Driver Records
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <a href="/Track" style={{ textDecoration: "none" }}>
              <div
                class="card card-with-bg"
                style={{
                  marginTop: "10px",
                  marginLeft: "0px",
                  marginRight: "10px",
                  marginBottom: "20px",
                  padding: "15px",
                  borderRadius: "20px",
                  height: "200px",
                  border: "none",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  backgroundImage: { map },
                  transition: "transform 0.2s, background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.backgroundColor = "#FFA500";
                }} // Scale up and change background color on hover
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.backgroundColor = "#ffffff";
                }} // Scale down and change background color on hover
              >
                <div class="card-body">
                  <h5
                    className="card-title"
                    style={{
                      fontWeight: "bold",
                      fontSize: "40px",
                      color: "#444444",
                    }}
                  >
                    Vehicle Tracking
                  </h5>
                  <i
                    class="fa fa-map-marker"
                    aria-hidden="true"
                    style={{
                      fontSize: "90px",
                      paddingLeft: "30px",
                      color: "#D80000",
                    }}
                  ></i>
                </div>
              </div>
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
