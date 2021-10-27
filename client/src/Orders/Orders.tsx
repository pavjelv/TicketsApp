import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {userService} from "../Services/UserService";
import {TicketsState} from "@pavo/shared-services-shared/src";
import {api_url} from "../environment";

class Orders extends Component<unknown, TicketsState> {
    constructor(props: unknown) {
        super(props);

        this.state = {
            tickets: null,
            credentials: null,
        };
    }

    async componentDidMount() {
        const tickets = (await axios.get(`${api_url}/orders/allOrders`)).data;
        this.setState({
            tickets,
            credentials: userService.getCredentials(),
        });
    }

    render() {
        return (
            <div className="container">
                 { this.state.credentials && this.state.credentials && this.state.credentials.role === 'User' &&
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

export default Orders;
