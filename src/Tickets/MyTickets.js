import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class MyTickets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tickets: null,
            credentials: {},
        };
    }

    async componentDidMount() {
        if (JSON.parse(localStorage.getItem('credentials')).credentials.role == "User") {
        const tickets = (await axios.post(`http://localhost:5000/api/tickets/getMyTickets`, {
             id : JSON.parse(localStorage.getItem('credentials')).credentials.id,
        }, {
          headers: { 'Authorization':  JSON.parse(localStorage.getItem('credentials')).credentials.token}
        })).data;

        this.setState({
            tickets,
            credentials: JSON.parse(localStorage.getItem('credentials')),
        });
        }

        else if (JSON.parse(localStorage.getItem('credentials')).credentials.role == "Worker"){
            const tickets = (await axios.post(`http://localhost:5000/api/tickets/getAssignedTickets`, {
                id : JSON.parse(localStorage.getItem('credentials')).credentials.id,
             }, {
                 headers: { 'Authorization':  JSON.parse(localStorage.getItem('credentials')).credentials.token}
             })).data;

        this.setState({
            tickets,
            credentials: JSON.parse(localStorage.getItem('credentials')),
        });
        }

        else {
            const tickets = (await axios.post(`http://localhost:5000/api/tickets/getUnassignedUnresolved`, {
                id : JSON.parse(localStorage.getItem('credentials')).credentials.id,
            }, {
                 headers: { 'Authorization':  JSON.parse(localStorage.getItem('credentials')).credentials.token}
            })).data;

            this.setState({
                tickets,
                credentials: JSON.parse(localStorage.getItem('credentials')),
            });
        }
    }

    render() {
        return (
            <div className="container">
                 { this.state.credentials && this.state.credentials.credentials && this.state.credentials.credentials.role == 'User' &&
                    <div className= "float-right"> 
                    <Link to='/newTicket'>
                            <button type="button" className="btn btn-primary btn-lg">New ticket</button>
                    </Link>
                    </div>
                }
                <div className="row">
                    {this.state.tickets === null && <p>Loading tickets... </p>}
                    {
                        this.state.tickets && this.state.tickets.map(ticket => (
                            <div key={ticket._id} className="col-sm-12 col-md-4 col-lg-3">
                            <Link to={`/ticket/${ticket._id}`}>
                             <div className={"card text-white" + (!ticket.isResolved ? ' bg-danger mb-3' : ' bg-success mb-3')}>
                                <div className="card-header">Reporter: {ticket.reporter.firstName} {ticket.reporter.lastName}</div>
                                <div className="card-body">
                                <h2 className="card-title">{ticket.title}</h2>
                                <h4 className="card-text">{ticket.description}</h4>
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

export default MyTickets;