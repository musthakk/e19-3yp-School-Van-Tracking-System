import React from "react";
import { Link } from "react-router-dom";
//import logo from "../images/logo.png";
import S from "../images/S.png";
import "./components.css";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          <div
            className="cardlogo d-flex align-items-center"
            style={{
              backgroundColor: "#E56717",
              border: "none",
              hover: "true",
            }}
          >
            <img src={S} alt="SureWay Logo" height="30" />
          </div>
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item d-flex align-items-center">
              <Link className="nav-link" to="/Track">
                TRACKING
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center">
              <Link className="nav-link" to="/Bus">
                VEHICLES
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center">
              <Link className="nav-link" to="/RegisterUser">
                REGISTRATIONS
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center">
              <Link className="nav-link" to="/UserRecord">
                USERS
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center">
              <Link className="nav-link" to="/DriverRecord">
                DRIVERS
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center">
              <Link className="nav-link" to="/ExtraService">
                SERVICES
              </Link>
            </li>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item ml-auto">
                <Link className="nav-link" to="/adminDetails">
                  {/* {user.username} */}
                  <i
                    class="fa fa-user-circle"
                    aria-hidden="true"
                    style={{ fontSize: "30px" }}
                  ></i>
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center">
                <Link className="nav-link" to="/logout">
                  <i
                    class="fa fa-sign-out"
                    aria-hidden="true"
                    style={{ fontSize: "30px" }}
                  ></i>
                </Link>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
