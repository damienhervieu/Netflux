import React, { Component } from 'react';
import { Link } from 'react-router';
import { login, logout, isLoggedIn } from '../utils/Authentication';
import '../App.css';

class Nav extends Component{

    render() {
        return(
            <nav className="navbar navbar-default">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/">Netflux</Link>
                </div>
                <ul className="nav navbar-nav">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        {
                            ( isLoggedIn() ) ? <Link to="/upload">Upload Videos</Link> : ''
                        }
                    </li>
                </ul>
                <ul>
                    <li>
                        {
                            ( isLoggedIn() ) ? ( <button className="btn btn-danger log" onClick={ () => logout() }>Logout</button> ) : ( <button className="btn btn-info log" onClick={ () => login() }>Log in</button> )
                        }
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Nav;