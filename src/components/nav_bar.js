import React from 'react';
import NavBarOptions from './nav_bar_options'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
    return (
        <nav className="navbar navbar-fixed-top drop-shadow" id="home-navbar">
            <div className="container">
                <div className="navbar-header">
                    <Link to='/' className="navbar-brand">Shopping List</Link>
                </div>
                <div className="collapse navbar-collapse">
                    <NavBarOptions 
                        username={props.username}
                        authorized={props.authorized}
                        logged_in={props.logged_in}
                        page={props.page}
                        onSearchTermChange={term => { props.onSearchTermChange(term) }} />
                </div>
            </div>
        </nav>
    );
}

export default NavBar;