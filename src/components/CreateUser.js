import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  state = {
    user: [],
    username: ""
  };
  async componentDidMount() {
    this.getUser();
    // console.log(this.state.user);
  }

  getUser = async () => {
    const res = await axios.get("http://localhost:4000/api/users");
    this.setState({ user: res.data });
  };

  onChangeUsername = e => {
    // console.log(e.target.value);
    this.setState({ username: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:4000/api/users", {
      username: this.state.username
    });
    this.setState({ username: "" });
    this.getUser();
  };
  deleteUser = async id => {
    await axios.delete("http://localhost:4000/api/users/" + id);
    this.getUser();
    // console.log(id);
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
          {/* from user */}
        </div>
        <div className="col-md-8">
          <ul className="list-group">
            {this.state.user.map(user => (
              <li
                className="list-group-item list-group-item-action"
                key={user._id}
                onDoubleClick={() => this.deleteUser(user._id)}
              >
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
