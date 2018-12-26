import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import Tickets from './Tickets/Tickets';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Tickets/>
      </div>
    );
  }
}

export default App;
