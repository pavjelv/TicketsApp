import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Tickets from './Tickets/Tickets';
import Ticket from './Ticket/Ticket';
import {LoginPage} from './LoginPage/LoginPage'
import { PrivateRoute } from './Auth/PrivateRoute';
import NewTicket from './Ticket/NewTicket'
import UserPage from './UserPage/UserPage'
import MyTickets from './Tickets/MyTickets'
import {RegistrationForm} from "./Registration/RegistrationForm";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
       
        <PrivateRoute path='/myTickets' component={MyTickets}/>
        <Route exact path='/' component={Tickets}/>
        <Route exact path='/ticket/:id' component={Ticket}/>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path='/newTicket' component={NewTicket} />
        <PrivateRoute path='/user/:id' component={UserPage}/>
        <Route path="/register" component={RegistrationForm} />
        {/* <Route exact path='/user' component={User}/> */}

      </div>
    );
  }
}

export default App;
