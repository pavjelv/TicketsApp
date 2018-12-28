import React from 'react';
import {Link} from 'react-router-dom';
import User from '../Auth/Auth'

function NavBar() {
    return (
        <nav className="navbar navbar-dark bg-primary fixed-top">
            <Link className="navbar-brand" to="/">
                Ticket app
            </Link>           
                <button className="btn btn-dark">
                    <Link to="/login"> Sign In </Link>
                </button>
        
                {/* // <div> */}
                    {/* <label className="mr-2 text-white">{User.getProfile().firstName}</label> */}
                    {/* <button className="btn btn-dark">Sign Out</button> */}
                {/* // </div> */}
            
        </nav>
    );
}

export default NavBar;