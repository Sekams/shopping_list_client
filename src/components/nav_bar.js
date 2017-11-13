import React from 'react';
import NavBarOptions from './nav_bar_options'

const NavBar = (props) => {
    return (
        <nav className="navbar navbar-fixed-top drop-shadow" id="home-navbar">
            <div className="container">
                <div className="navbar-header">
                    <a className="navbar-brand">Shopping List</a>
                </div>
                <div className="collapse navbar-collapse">
                    <NavBarOptions 
                        username={props.username}
                        authorized={props.authorized}
                        logged_in={props.logged_in}
                        page={props.page} />
                </div>
            </div>
        </nav>
    );
}

export default NavBar;