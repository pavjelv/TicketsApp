import React, {Component, ReactElement} from 'react';
import axios from 'axios';
import {OrderModel} from "@pavo/shared-services-shared/src";
import {userService} from "../Services/UserService";
import {api_url} from "../environment";

class OrderDetailsPage extends Component<any, {order: OrderModel}> {
    constructor(props: unknown) {
        super(props);
        this.state = {
          order: null,
        };

        this.submitAnswer = this.submitAnswer.bind(this);
      }

      async componentDidMount() {
        await this.refreshTicket();
      }

      async refreshTicket() {
        const { match: { params } } = this.props;
        const order = (await axios.get(`${api_url}/orders/getOrder/${params.id}`)).data;
        this.setState({
          order,
        });
      }

      async submitAnswer(userAnswer: string) {
        await axios.post(`${api_url}/tickets/answer`, {
          ticketId : this.state.order._id,
          answer: userAnswer, 
        }, {
          headers: { 'Authorization':  userService.getCredentials().token}
        });

        await this.refreshTicket();
      }

      async assign(assignee: string) {
        await axios.post(`${api_url}/tickets/assign`, {
          ticketId : this.state.order._id,
          id: assignee, 
        }, {
          headers: { 'Authorization':  userService.getCredentials().token}
        });

        await this.refreshTicket();
      }

      async resolve() {
        await axios.post(`${api_url}/tickets/resolve`, {
          ticketId : this.state.order._id,
        }, {
          headers: { 'Authorization':  userService.getCredentials().token}
        });

        await this.refreshTicket();
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
                <hr className="my-4" />
                {/*{!ticket.answer &&*/}
                {/*  <SubmitAnswer ticketId={ticket._id} submitAnswer={this.submitAnswer} />*/}
                {/*}*/}
                {/*{!ticket.assignee && */}
                {/*    <p>No one has assigned to this ticket... Yet </p>    */}
                {/*}*/}
                {/*{userService.isAuthenticated() && !ticket.assignee &&*/}
                {/*  <AssignUser ticketId={ticket._id} assign={this.assign.bind(this)}/> */}
                {/*}*/}
                {/*{userService.isAuthenticated() && ticket.assignee &&*/}
                {/*    <Link to={`/user/${ticket.assignee._id}`}>*/}
                {/*    <p>Assignee: {ticket.assignee.firstName} {ticket.assignee.lastName}</p>*/}
                {/*    </Link>*/}
                {/*}*/}
                {/*<p>Answer: {ticket.answer} </p>*/}
                {/*{ userService.isAuthenticated() && ticket.assignee && ticket.assignee._id === userService.getCredentials()._id && !ticket.isResolved  &&*/}
                {/*    <p className="lead">                  */}
                {/*      <button type="button" className="btn btn-success" onClick={() => {this.resolve()}}>Resolve</button>*/}
                {/*    </p> */}
                {/*}*/}
                {/*{ userService.isAuthenticated() && !ticket.isResolved && ticket.reporter._id === userService.getCredentials()._id  &&*/}
                {/*  <p className="lead">                  */}
                {/*      <button type="button" className="btn btn-success" onClick={() => {this.resolve()}}>Resolve</button>*/}
                {/*  </p> */}
                {/*}   */}
              </div>
            </div>   
          </div>
          )
      }

}

export default OrderDetailsPage;
