import React, {Component} from 'react';
import axios from 'axios';
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
                <p className="lead">Reporter: {ticket.reporter.firstName} {ticket.reporter.lastName}</p>
                <p className="lead">{ticket.description}</p>
                <hr className="my-4" />
                {!ticket.answer &&
                <SubmitAnswer ticketId={ticket._id} submitAnswer={this.submitAnswer} />
                }
                {!ticket.assignee && 
                    <p>No one has assigned to this ticket... Yet </p>
                }
                {ticket.assignee &&
                    <p>Assignee: {ticket.assignee.firstName} {ticket.assignee.lastName}</p>
                }
                <p>Answer: </p>
                <p> {ticket.answer}</p>
                {localStorage.getItem('credentials') && ticket.assignee && ticket.assignee._id === JSON.parse(localStorage.getItem('credentials')).credentials.id && !ticket.isResolved &&
                    <div>
                      <button type="button" class="btn btn-success" onClick={() => {this.resolve()}}>Resolve</button>
                    </div>
                }   
              </div>
            </div>   
          </div>
          )
      }

}

export default Ticket;