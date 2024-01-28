import React, { Component } from "react";
import { getUnasignedChildren, rejectRequest } from "../services/busService";
import Select from "./common/select";

class AssignBusses extends Component {
  state = {
    children: [],
    busses: [],
  };

  async componentDidMount() {
    try {
      const { data } = await getUnasignedChildren();
      this.setState({ children: data.childDetails });
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  }

  handleRejectRequest = async (child) => {
    try {
      await rejectRequest(child);
      // Update state to remove the deleted child
      this.setState((prevState) => ({
        children: prevState.children.filter((c) => c !== child),
      }));
    } catch (error) {
      console.error("Error rejecting request:", error.message);
    }
  };

  render({ children } = this.state) {
    return (
      <>
        <h1>Assign busses for the new users</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">School</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {children &&
              children.map((child) => (
                <tr key={child.parent_username}>
                  <td>{child.name}</td>
                  <td>{child.school}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => this.handleRejectRequest(child)}
                    >
                      Reject
                    </button>
                  </td>
                  <td>
                    <Select
                      options={["Bus 1", "Bus 2", "Bus 3"]}
                      label="Choose a vehicle"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default AssignBusses;
