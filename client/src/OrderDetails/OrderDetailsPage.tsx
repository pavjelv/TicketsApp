import React, {Component, ReactElement} from 'react';
import axios from 'axios';
import {OrderModel} from "@pavo/shared-services-shared/src";
import {userService} from "../Services/UserService";
import {api_url} from "../environment";
import axiosInstance from "../Auth/AxiosInstance";

class OrderDetailsPage extends Component<any, {order: OrderModel}> {
    constructor(props: unknown) {
        super(props);
        this.state = {
          order: null,
        };

        this.submitAnswer = this.submitAnswer.bind(this);
      }

      async componentDidMount() {
        await this.refreshOrder();
      }

      refreshOrder(): void {
        const { match: { params } } = this.props;
        axiosInstance.get(`/orders/getOrder/${params.id}`).then((response) => {
          this.setState({
            order: response.data,
          });
        });
      }

      async submitAnswer(userAnswer: string) {
        await axios.post(`${api_url}/tickets/answer`, {
          ticketId : this.state.order._id,
          answer: userAnswer, 
        }, {
          headers: { 'Authorization':  userService.getCredentials().token}
        });

        await this.refreshOrder();
      }

      participate(): void {
        axiosInstance.put("/orders/addParticipant", {
          orderId : this.state.order._id,
        }).then(() => {
          return this.refreshOrder()
        });
      }

      async resolve() {
        await axios.post(`${api_url}/tickets/resolve`, {
          ticketId : this.state.order._id,
        }, {
          headers: { 'Authorization':  userService.getCredentials().token}
        });

        await this.refreshOrder();
      }

      render(): ReactElement {
          const {order} = this.state;
          if(order === null) return <p>Loading ...</p>;
          return (
            <div className="container">
            <div className="row">
              <div className="jumbotron col-12">
                <h1 className="display-3">{order.product.title}</h1>
                <p className="lead">{order.product.description}</p>
                <p className="lead">{order.product.price}</p>
                <hr className="my-4" />
                { userService.isAuthenticated() &&
                  <p className="lead">
                      <button type="button" className="btn btn-success" onClick={() => {this.participate()}}>Participate</button>
                  </p>
                }
              </div>
            </div>   
          </div>
          )
      }

}

export default OrderDetailsPage;
