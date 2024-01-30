import React from "react";

const RegisterUsers = () => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      <a href="/driverRegisterForm" style={{ textDecoration: "none" }}>
        <div
          className="card"
          style={{
            margin: "50px",
            padding: "15px",
            borderRadius: "10px",
            height: "200px",
            border: "none",
            width: "400px",
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
          }}
        >
          <div className="card-body">
            <h5
              className="card-title"
              style={{ fontWeight: "bold", fontSize: "30px" }}
            >
              Driver Registration
            </h5>
            <p
              className="card-text"
              style={{ fontWeight: "bold", fontSize: "20px" }}
            >
              You can register drivers here
            </p>
          </div>
        </div>
      </a>
      <a href="/driverRegisterForm" style={{ textDecoration: "none" }}>
        <div
          className="card"
          style={{
            margin: "50px",
            padding: "15px",
            borderRadius: "10px",
            height: "200px",
            border: "none",
            width: "400px",
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
          }}
        >
          <div className="card-body">
            <h5
              className="card-title"
              style={{ fontWeight: "bold", fontSize: "30px" }}
            >
              Ambulance Service Registraion
            </h5>
            <p
              className="card-text"
              style={{ fontWeight: "bold", fontSize: "20px" }}
            >
              You can register ambulance services here
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default RegisterUsers;
