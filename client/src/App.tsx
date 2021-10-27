import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Orders from './Orders/Orders';
import Ticket from './Order/Ticket';
import {LoginPage} from './LoginPage/LoginPage'
import { PrivateRoute } from './Auth/PrivateRoute';
import NewTicket from './Order/NewTicket'
import UserPage from './UserPage/UserPage'
import MyOrders from './Orders/MyOrders'
import {RegistrationForm} from "./Registration/RegistrationForm";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
       
        <PrivateRoute path='/myTickets' component={MyOrders}/>
        <Route exact path='/' component={Orders}/>
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
