import React, { Component } from "react";
import { getUsers } from "../services/userRecordsService";
import { Link } from "react-router-dom";
import userbanner from "../images/userbanner.jpg";

class UserRecord extends Component {
  state = {
    users: [],
    selectedUser: "",
  };

  handleUserSelect = (user) => {
    this.setState({ selectedUser: user });
    <Link to="/DriverRecord" />;
  };

  async componentDidMount() {
    try {
      const { data } = await getUsers();
      this.setState({ users: data.users });
      this.setState({ selectedUser: data.users[0] });
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  }

  render({ users, selectedUser } = this.state) {
    return (
      <div className="row">
        <div className="col-3">
          <ul className="list-group">
            {users.map((user) => (
              <li
                key={user._id}
                className={
                  user === selectedUser
                    ? "list-group-item active"
                    : "list-group-item"
                }
                onClick={() => this.handleUserSelect(user)}
              >
                {user.fullName}
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
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
                  <h5 class="card-title">{selectedUser.fullName}</h5>
                  <p class="card-text">
                    Username: {selectedUser.username} <br />
                    Contact Number: {selectedUser.contactNumber} <br />
                    Email: {selectedUser.email} <br />
                    Children:{" "}
                    {/* {selectedUser.children.map((child, index) => (
                      <React.Fragment key={child._id}>
                        {child.name}
                        {index < selectedUser.children.length - 1 && ", "}
                      </React.Fragment>
                    ))}
                    <br /> */}
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
    );
  }
}

export default UserRecord;
