import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import SubmitAnswer from '../Ticket/AddAnswer'

class Ticket extends Component {
    constructor(props) {
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

      async submitAnswer(userAnswer) {
        await axios.post(`http://localhost:5000/api/tickets/answer`, {
          ticketId : this.state.ticket._id,
          answer: userAnswer, 
        }, {
          headers: { 'Authorization':  JSON.parse(localStorage.getItem('credentials')).credentials.token}
        });

        await this.refreshTicket();
      }

      async resolve() {
        await axios.post(`http://localhost:5000/api/tickets/resolve`, {
          ticketId : this.state.ticket._id,
        }, {
          headers: { 'Authorization':  JSON.parse(localStorage.getItem('credentials')).credentials.token}
        });

        await this.refreshTicket();
      }

      render() {
          const {ticket} = this.state;
          if(ticket === null) return <p>Loading ...</p>;
          return (
            <div className="container">
            <div className="row">
              <div className="jumbotron col-12">
                <h1 className="display-3">{ticket.title}</h1>
                { localStorage.getItem('credentials') &&
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
                {localStorage.getItem('credentials') && ticket.assignee &&
                    <Link to={`/user/${ticket.assignee._id}`}>
                    <p>Assignee: {ticket.assignee.firstName} {ticket.assignee.lastName}</p>
                    </Link>
                }
                <p>Answer: {ticket.answer}</p>
                {localStorage.getItem('credentials') && ticket.assignee && ticket.assignee._id === JSON.parse(localStorage.getItem('credentials')).credentials.id && !ticket.isResolved  
                  ||localStorage.getItem('credentials') && !ticket.isResolved && ticket.reporter._id === JSON.parse(localStorage.getItem('credentials')).credentials.id &&
                    <p className="lead">                  
                      <button type="button" class="btn btn-success" onClick={() => {this.resolve()}}>Resolve</button>
                    </p> 
                }   
              </div>
            </div>   
          </div>
          )
      }

}

export default Ticket;