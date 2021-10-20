import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {userService} from "../Services/UserService";


class AssignUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignee: '',
      users: [],
      credentials: null,
    };
  }

  assign(value) {
    this.setState({
      assignee: value,
    });
  }

  submit() {
    this.props.assign(this.state.assignee);

    this.setState({
      assignee: '',
    });
  }

  async componentDidMount() {
    const users = (await axios.get(`http://localhost:5000/api/user/getAllUsers`, {
        headers: { 'Authorization':  userService.getCredentials().credentials.token}
    })).data;

    this.setState({
        users,
        credentials: userService.getCredentials(),
        assignee: users[0]._id,
    });
  }

  render() {
    if (!userService.isAuthenticated()) return null;
    else if (userService.hasRole("Admin")) return null;
    return (
      <Fragment>
        <div className="form-group text-center">
          <label for="exampleSelect1">Assignee:</label>
          <select class="form-control" id="exampleSelect1"
            onChange={(e) => {this.assign(e.target.value)}}>
          {this.state.users === null && <p>Loading users... </p>}
            {
             this.state.users && this.state.users.map(user => (
                <option value={user._id} >{user.firstName} {user.lastName}</option>
             ))
            }
          </select>
        </div>
        <button
          className="btn btn-success"
          onClick={() => {this.submit()}}>
          Assign
        </button>
        <hr className="my-4" />
      </Fragment>
    )
  }
}

export default withRouter(AssignUser);
