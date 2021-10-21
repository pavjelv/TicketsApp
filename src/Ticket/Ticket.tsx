import React, {Component, ReactElement} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import SubmitAnswer from '../Ticket/AddAnswer'
import AssignUser from '../Ticket/AssignUser'
import {TicketModel} from "../model/tickets.model";
import {userService} from "../Services/UserService";

class Ticket extends Component<any, {ticket: TicketModel}> {
    constructor(props: unknown) {
        super(props);
        this.state = {
          ticket: null,
        };

        this.submitAnswer = this.submitAnswer.bind(this);
      }

      async componentDidMount() {
        await this.refreshTicket();
      }

      async refreshTicket() {
        const { match: { params } } = this.props;
        const ticket = (await axios.get(`http://localhost:5000/api/tickets/getTicket/${params.id}`)).data;
        this.setState({
          ticket,
        });
      }

      async submitAnswer(userAnswer: string) {
        await axios.post(`http://localhost:5000/api/tickets/answer`, {
          ticketId : this.state.ticket._id,
          answer: userAnswer, 
        }, {
          headers: { 'Authorization':  userService.getCredentials().token}
        });

        await this.refreshTicket();
      }

      async assign(assignee: string) {
        await axios.post(`http://localhost:5000/api/tickets/assign`, {
          ticketId : this.state.ticket._id,
          id: assignee, 
        }, {
          headers: { 'Authorization':  userService.getCredentials().token}
        });

        await this.refreshTicket();
      }

      async resolve() {
        await axios.post(`http://localhost:5000/api/tickets/resolve`, {
          ticketId : this.state.ticket._id,
        }, {
          headers: { 'Authorization':  userService.getCredentials().token}
        });

        await this.refreshTicket();
      }

      render(): ReactElement {
          const {ticket} = this.state;
          if(ticket === null) return <p>Loading ...</p>;
          return (
            <div className="container">
            <div className="row">
              <div className="jumbotron col-12">
                <h1 className="display-3">{ticket.title}</h1>
                { userService.isAuthenticated() &&
                <Link to={`/user/${ticket.reporter._id}`}>
                <p className="lead">Reporter: {ticket.reporter.firstName} {ticket.reporter.lastName}</p>
                </Link>
                }
                <p className="lead">{ticket.description}</p>
                <hr className="my-4" />
                {!ticket.answer &&
                  <SubmitAnswer ticketId={ticket._id} submitAnswer={this.submitAnswer} />
                }
                {!ticket.assignee && 
                    <p>No one has assigned to this ticket... Yet </p>    
                }
                {userService.isAuthenticated() && !ticket.assignee &&
                  <AssignUser ticketId={ticket._id} assign={this.assign.bind(this)}/> 
                }
                {userService.isAuthenticated() && ticket.assignee &&
                    <Link to={`/user/${ticket.assignee._id}`}>
                    <p>Assignee: {ticket.assignee.firstName} {ticket.assignee.lastName}</p>
                    </Link>
                }
                <p>Answer: {ticket.answer} </p>
                { userService.isAuthenticated() && ticket.assignee && ticket.assignee._id === userService.getCredentials().id && !ticket.isResolved  &&
                    <p className="lead">                  
                      <button type="button" className="btn btn-success" onClick={() => {this.resolve()}}>Resolve</button>
                    </p> 
                }
                { userService.isAuthenticated() && !ticket.isResolved && ticket.reporter._id === userService.getCredentials().id  &&
                  <p className="lead">                  
                      <button type="button" className="btn btn-success" onClick={() => {this.resolve()}}>Resolve</button>
                  </p> 
                }   
              </div>
            </div>   
          </div>
          )
      }

}

export default Ticket;
