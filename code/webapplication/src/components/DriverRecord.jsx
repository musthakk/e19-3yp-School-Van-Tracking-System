import React, { Component } from "react";
import SearchBox from "./common/searchBox";
import { getDrivers } from "../services/driverRecordsservices";
import userbanner from "../images/userbanner.jpg";

class DriverRecord extends Component {
  state = {
    drivers: [],
    selectedDriver: "",
    searchQuery: "",
  };

  async componentDidMount() {
    try {
      const { data } = await getDrivers();
      this.setState({ drivers: data.gettingDrivers });
      this.setState({ selectedDriver: data.gettingDrivers[0] });
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  }

  handleUserSelect = (user) => {
    this.setState({ selectedDriver: user });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  filterUsers = () => {
    const { drivers, searchQuery } = this.state;
    if (!searchQuery) return drivers;

    const filtereddrivers = drivers.filter((user) =>
      user.nicD.includes(searchQuery)
    );

    const remainingdrivers = drivers.filter(
      (user) => !filtereddrivers.includes(user)
    );

    return [...filtereddrivers, ...remainingdrivers];
  };

  render({ selectedDriver, searchQuery } = this.state) {
    const filteredDrivers = this.filterUsers();
    return (
      <>
        <div className="row">
          <div className="col-3">
            <ul className="list-group" style={{ marginTop: 16 }}>
              {filteredDrivers.map((user) => (
                <li
                  key={user._id}
                  className={
                    user === selectedDriver
                      ? "list-group-item active"
                      : "list-group-item"
                  }
                  onClick={() => this.handleUserSelect(user)}
                >
                  {user.firstName}
                </li>
              ))}
            </ul>
          </div>

          <div className="col">
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <div class="card mb-3" style={{ maxWidth: "540px" }}>
              <div class="row g-0">
                <div class="col-md-4">
                  <img
                    src={userbanner}
                    class="img-fluid rounded-start"
                    alt="..."
                  />{" "}
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">{selectedDriver.firstName}</h5>
                    <p class="card-text">
                      UserName: {selectedDriver.userName} <br />
                      Contact Number: {selectedDriver.contactNumber} <br />
                      Email: {selectedDriver.email} <br />
                      Address: {selectedDriver.address} <br />
                      NIC: {selectedDriver.NIC} <br />
                      Licence Number: {selectedDriver.licenseNumber} <br />
                      Bus: {selectedDriver.assignedVehicle} <br />
                    </p>
                    {/* <p class="card-text">
                    <small class="text-body-secondary">
                      Last updated 3 mins ago
                    </small>
                  </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DriverRecord;
