import React from 'react';
import { Link } from 'react-router-dom'
import SearchBar from './search_bar'

const NavBarOptionItem = (props) => {
    if (props.logged_in && props.authorized && props.page === 'home' && props.name === 'search') {
        return(
            <li>
                <SearchBar />
            </li>
        );
    }
    if (props.username && props.name === 'greeting'){
        return (
            <li>
                <h5 className="nav-text">Hi {props.username}</h5>
            </li>
        );
    }
    if (props.logged_in && props.authorized && props.page === 'home' && props.name === 'link') {
        return(
            <li>
                <Link to='/login' className="navbar-link">Logout</Link>
            </li>
        );
    }
    else if (props.page === 'sign_up' && props.name === 'link') {
        return(
            <li>
                <Link to='/login' className="navbar-link">Login</Link>
            </li>
        );
    }
    else if (props.page === 'login' && props.name === 'link') {
        return(
            <li>
                <Link to='/register' className="navbar-link">Sign Up</Link>
            </li>
        );
    }
    return null;
}

export default NavBarOptionItem;
