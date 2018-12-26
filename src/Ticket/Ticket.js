import React, {Component} from 'react';
import axios from 'axios';

class Ticket extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ticket: null,
        };
      }

      async componentDidMount() {
        const { match: { params } } = this.props;
        const ticket = (await axios.get(`http://localhost:5000/api/getTicket/${params.id}`)).data;
        this.setState({
          ticket,
        });
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
                {!ticket.assignee && 
                    <p>No one has assigned to this ticket.. Yet </p>
                }
                {ticket.assignee &&
                    <p>Assignee: {ticket.assignee.firstName} {ticket.assignee.lastName}</p>
                }
                <p>Answer: {ticket.answer}</p>
                {/* {
                  question.answers.map((answer, idx) => (
                    <p className="lead" key={idx}>{answer.answer}</p>
                  ))
                } */}
              </div>
            </div>
          </div>
          )
      }

}

export default Ticket;