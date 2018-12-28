import React from 'react';
import {Link} from 'react-router-dom';
import {UserServise, userService} from '../Services/UserService';
import Tickets from '../Tickets/Tickets';

function NavBar() {
    return (
        <nav className="navbar navbar-dark bg-primary fixed-top">
            <Link className="navbar-brand" to="/">
                Ticket app
            </Link>
            { !localStorage.getItem('credentials') &&
            <Link to="/login">         
                <button className="btn btn-dark">
                    Sign In
                </button>
            </Link>
            }
            { localStorage.getItem('credentials') &&
                 <div> 
                    <label className="mr-2 text-white">{JSON.parse(localStorage.getItem('credentials')).credentials.firstName}</label>
                    <Link to="/login">
                    <button className="btn btn-dark"onClick={() => {userService.logout(); }}>Sign Out</button>
                    </Link>
                 </div>
            }
        </nav>
    );
}

export default NavBar;