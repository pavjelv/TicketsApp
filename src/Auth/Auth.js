import axios from 'axios';

class Auth {
    constructor(props) {
        super(props);
        this.state = {
          user: null,
        };
    }

    async componentDidMount() {
        const user = (await axios.get(`http://localhost:5000/api/tickets/allTickets`)).data;
        this.setState({
            user,
        });
    }

    getToken() {
        return user.token;
    }

    
}