import React, { Component } from "react";
import { getUsers } from "../services/userRecordsService";
import userbanner from "../images/userbanner.jpg";
import SearchBox from "./common/searchBox";

class UserRecord extends Component {
  state = {
    users: [],
    selectedUser: "",
    children: [
      {
        name: "John Doe",
        age: 5,
        school: "St. Mary's",
        address: "123 Main St",
        vehicle: "AA-1234",
      },
      {
        name: "John Doe",
        age: 5,
        school: "St. Mary's",
        address: "123 Main St",
        vehicle: "AA-1234",
      },
    ],
    searchQuery: "",
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

  handleUserSelect = (user) => {
    this.setState({ selectedUser: user });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  filterUsers = () => {
    const { users, searchQuery } = this.state;
    if (!searchQuery) return users;

    const filteredUsers = users.filter((user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const remainingUsers = users.filter(
      (user) => !filteredUsers.includes(user)
    );

    return [...filteredUsers, ...remainingUsers];
  };

  render({ users, selectedUser, children, searchQuery } = this.state) {
    const filteredUsers = this.filterUsers();

    return (
      <div className="row">
        <div className="col-3">
          <ul className="list-group">
            {filteredUsers.map((user) => (
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
          <div>
            {children.map((child) => (
              <div class="card mb-3" style={{ maxWidth: "540px" }}>
                <div class="row g-0">
                  <div class="col-md-4">
                    <img
                      src={userbanner}
                      class="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">{child.name}</h5>
                      <p class="card-text">
                        Name: {child.name} <br />
                        Age: {child.age} <br />
                        School: {child.school} <br />
                        Address: {child.address} <br />
                        Vehicle: {child.vehicle} <br />
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
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default UserRecord;
