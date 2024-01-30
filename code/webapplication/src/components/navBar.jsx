import React from "react";
import { Link } from "react-router-dom";
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
            }}
          >
            <img src={S} alt="SureWay Logo" height="30" />
          </div>
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/Track">
                TRACKING
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Bus">
                VEHICLES
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/RegisterUser">
                REGISTRATIONS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/UserRecord">
                USERS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/DriverRecord">
                DRIVERS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ExtraService">
                SERVICES
              </Link>
            </li>
          </ul>

          <div className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/logout">
                <i
                  className="fa fa-sign-out"
                  aria-hidden="true"
                  style={{ fontSize: "30px" }}
                ></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/adminDetails">
                <i
                  className="fa fa-user-circle"
                  aria-hidden="true"
                  style={{ fontSize: "30px" }}
                ></i>
              </Link>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
