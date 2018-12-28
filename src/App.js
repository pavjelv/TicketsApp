import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Tickets from './Tickets/Tickets';
import Ticket from './Ticket/Ticket';
import {LoginPage} from './LoginPage/LoginPage'
// import User from './Auth/Auth';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
       
        <Route exact path='/' component={Tickets}/>
        <Route exact path='/ticket/:id' component={Ticket}/>
        <Route path="/login" component={LoginPage} />
        {/* <Route exact path='/user' component={User}/> */}

      </div>
    );
  }
}

export default App;
