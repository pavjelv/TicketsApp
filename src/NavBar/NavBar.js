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
            
            { localStorage.getItem('credentials') && JSON.parse(localStorage.getItem('credentials')).credentials.role == "User" &&
                 <div>
                    <Link to={`/myTickets`}>
                        <a className="mr-2 text-white ">Reported tickets</a>
                    </Link>
                </div>
            }
            { localStorage.getItem('credentials') && JSON.parse(localStorage.getItem('credentials')).credentials.role == "Worker" &&
                 <div>
                    <Link to={`/myTickets`}>
                        <a className="mr-2 text-white ">Assigned tickets</a>
                    </Link>
                </div>
            }
            { localStorage.getItem('credentials') && JSON.parse(localStorage.getItem('credentials')).credentials.role == "Admin" &&
                 <div>
                    <Link to={`/myTickets`}>
                        <a className="mr-2 text-white ">Unresolved and unassigned tickets</a>
                    </Link>
                </div>
            }
            { !localStorage.getItem('credentials') &&
            <Link to="/login">         
                <button className="btn btn-dark">
                    Sign In
                </button>
            </Link>
            }
            { localStorage.getItem('credentials') &&
                 <div> 
                    <Link to={`/user/${JSON.parse(localStorage.getItem('credentials')).credentials.id}`}>
                        <a className="mr-2 text-white ">{JSON.parse(localStorage.getItem('credentials')).credentials.firstName}</a>
                    </Link>
                    <Link to="/login">
                    <button className="btn btn-dark"onClick={() => {userService.logout(); }}>Sign Out</button>
                    </Link>
                 </div>
            }
        </nav>
    );
}

export default NavBar;