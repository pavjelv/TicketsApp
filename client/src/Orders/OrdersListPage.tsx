import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {userService} from "../Services/UserService";
import {OrdersState} from "@pavo/shared-services-shared/src";
import axiosInstance from "../Auth/AxiosInstance";

class Orders extends Component<unknown, OrdersState> {
    constructor(props: unknown) {
        super(props);

        this.state = {
            orders: null,
            credentials: null,
        };
    }

    async componentDidMount() {
        axiosInstance.get(`/orders/allOrders`).then((response) => {
            this.setState({
                orders: response.data,
                credentials: userService.getCredentials(),
            });
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.orders === null && <p>Loading orders... </p>}
                    {
                        this.state.orders && this.state.orders.map(order => (
                            <div key={order._id} className="col-sm-12 col-md-4 col-lg-3">
                            <Link to={`/order/${order._id}`}>
                             <div className={"card text-white bg-success mb-3"}>
                                <div className="card-header">{order.product?.title}</div>
                                <div className="card-body">
                                    <h2 className="card-title">{order.product?.description}</h2>
                                    <h4 className="card-text">{order.product?.price}</h4>
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
