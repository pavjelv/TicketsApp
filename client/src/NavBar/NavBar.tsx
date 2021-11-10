import React, {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {userService} from '../Services/UserService';

function NavBar(): ReactElement {
    return (
        <nav className="navbar navbar-dark bg-primary fixed-top">
            <Link className="navbar-brand" to="/">
                Together Cheaper
            </Link>
            { userService.hasRole("Worker") &&
                 <div>
                    <Link to={`/myTickets`}>
                        <span className="mr-2 text-white ">Assigned tickets</span>
                    </Link>
                </div>
            }
            { (userService.hasRole("Admin") || userService.hasRole("User")) &&
                 <div>
                    <Link to={`/products`}>
                        <span className="mr-2 text-white ">All Products</span>
                    </Link>
                </div>
            }
            { !userService.isAuthenticated() &&
                <Link to="/login">
                    <button className="btn btn-dark">
                        Sign In
                    </button>
                </Link>
            }
            { !userService.isAuthenticated() &&
                <Link to="/register">
                    <button className="btn btn-dark">
                        Sign Up
                    </button>
                </Link>
            }
            { userService.isAuthenticated() &&
                 <div> 
                    <Link to={`/user/${userService.getCredentials()._id}`}>
                        <span className="mr-2 text-white ">{userService.getCredentials().firstName}</span>
                    </Link>
                    <Link to="/login">
                    <button className="btn btn-dark" onClick={() => {userService.logout(); }}>Sign Out</button>
                    </Link>
                 </div>
            }
        </nav>
    );
}

export default NavBar;
