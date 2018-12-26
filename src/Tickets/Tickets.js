import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Tickets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tickets: null,
        };
    }

    async componentDidMount() {
        const tickets = (await axios.get('http://localhost:5000/api/allTickets')).data;
        this.setState({
            tickets,
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.tickets === null && <p>Loading tickets...</p>}
                    {
                        this.state.tickets && this.state.tickets.map(ticket => (
                            <div key={ticket._id} className="col-sm-12 col-md-4 col-lg-3">
                            <Link to={'/ticket/${ticket.id}'}>
                                <div className="card text-white bg-success mb-3">
                                    <div className="card-header">Answer: {ticket.answer}</div>
                                    <div className="card-body">
                                    <h4 className="card-title">{ticket.title}</h4>
                                    <p className="card-text">{ticket.description}</p>
                                    </div>
                                </div>
                            </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Tickets;