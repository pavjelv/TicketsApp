import React, {Component} from 'react';
import axios from 'axios';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: null,
          profile: null
        };
    }

    async componentDidMount() {
        const user = (await axios.post(`http://localhost:5000/api/users/login`, {
            email: "1234@123.com",
            password: "test"
        })).data; //then((response)=>{
        //     console.log(response)
        // });
        this.setState({
            user,
        });
        const AuthStr = 'Token ' + user.user.token;
        const profile = (await axios.get(`http://localhost:5000/api/users/current`, { headers: { Authorization: AuthStr } })).data;
        this.setState({
            user,
            profile,
        });
        
    }

    render (){
        return(
             <p>Loading...</p> 
        );
    }

    getToken() {
        return this.user.token;
    }

    isAuthenticated(){
        if (!this.user || !this.profile || !this.user.token) return false;
        else return true;
    }

    getProfile() {
        if(this.user){
            return this.profile;
        }
    }


}

//const User = new Auth();
export default User;