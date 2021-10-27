import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {userService} from "../Services/UserService";
import {OrdersState} from "@pavo/shared-services-shared/src";
import {api_url} from "../environment";

class Orders extends Component<unknown, OrdersState> {
    constructor(props: unknown) {
        super(props);

        this.state = {
            orders: null,
            credentials: null,
        };
    }

    async componentDidMount() {
        const orders = (await axios.get(`${api_url}/orders/allOrders`)).data;
        this.setState({
            orders,
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
                    {this.state.orders === null && <p>Loading tickets... </p>}
                    {
                        this.state.orders && this.state.orders.map(order => (
                            <div key={order._id} className="col-sm-12 col-md-4 col-lg-3">
                            <Link to={`/ticket/${order._id}`}>
                             <div className={"card text-white" + (!order.isResolved ? ' bg-danger mb-3' : ' bg-success mb-3')}>
                                <div className="card-header">Reporter: {order.reporter.firstName} {order.reporter.lastName}</div>
                                <div className="card-body">
                                <h2 className="card-title">{order.title}</h2>
                                <h4 className="card-text">{order.description}</h4>
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
