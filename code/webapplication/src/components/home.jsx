import React, { Component } from "react";
import banner from "../images/banner.jpg";
import AccidentAlers from "./accidentAlerts";
import "./components.css";
import "../index.css";
import map from "../images/map.png";
import home from "../images/home.jpeg";

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
                height: "400px",
                border: "none",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                backgroundImage: `url(${home})`, // Set the image as background
                backgroundSize: "cover", // Make the background image cover the whole card
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 0%, #FF8400 100%)", // Gradient color and direction
                  borderRadius: "20px", // Match the card's border radius
                }}
              ></div>
              <div
                class="card-body"
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "50%", // Center horizontally
                  transform: "translateX(-50%)", // Adjust for centering
                  color: "#fff",
                  textAlign: "center", // Center align text
                }}
              >
                {/* Your card content here */}
                <p
                  style={{
                    marginBottom: "5px",
                    fontWeight: "bold",
                    color: "#fefcd2",
                  }}
                >
                  "Ready to elevate the school transportation experience to the
                  next level of comfort and safety with SureWay"
                </p>
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
                height: "200px",
                border: "none",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                overflowY: "auto",
              }}
            >
              <AccidentAlers />
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
