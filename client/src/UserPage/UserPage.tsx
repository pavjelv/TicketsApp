import React, {Component} from 'react';
import axios from 'axios';
import {userService} from "../Services/UserService";
import {api_url} from "../environment";

class UserPage extends Component<any, {user: any}> {
    constructor(props: unknown) {
        super(props);
        this.state = {
          user: null,
        };
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const user = (await axios.post(`${api_url}/user/getUser`, {
          id: params.id,
        }, {
          headers: { 'Authorization':  userService.getCredentials().token}
        })).data;
        console.log(user)
        this.setState({
            user,
        });
    }

    render() {
        const {user} = this.state;
        if(user === null) return <p>Loading ...</p>;
        return (
          <div className="container">
          <div className="row">
            <div className="jumbotron col-12">
              <h1 className="display-3">{user.firstName} {user.lastName}</h1>
              <p className="lead">Phone: {user.phone}</p>
              <p className="lead">Email: {user.email}</p>
              <p className="lead">Role: {user.role}</p>
            </div>
          </div>   
        </div>
        )
    }
}

export default UserPage;
