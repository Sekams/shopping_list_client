import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './search_bar';
import NavBarDropdown from './nav_bar_dropdown';
import Modal from './modal';
require("../utils/helpers");

class NavBarOptionItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show_dropdown: false,
            show_modal: false,
            dropdown_owner: '',
            page_limit: global.localStorage.getItem("pageLimit")
        };
    }

    //Handle the event of showing/hiding the change password dropdown menu
    toggleDropDownChangePw = (event) => {
        event.preventDefault();

        if (this.state.show_dropdown) {
            this.setState({
                show_dropdown: false,
                show_modal: false,
                dropdown_owner: "change_password"
            });
        }
        else {
            this.setState({
                show_dropdown: true,
                show_modal: false,
                dropdown_owner: "change_password"
            });
        }
    }

    //Handle the event of showing/hiding the page limit dropdown menu
    toggleDropDownPageLimit = (event) => {
        event.preventDefault();

        if (this.state.show_dropdown) {
            this.setState({
                show_dropdown: false,
                show_modal: false,
                dropdown_owner: "page_limit"
            });
        }
        else {
            this.setState({
                show_dropdown: true,
                show_modal: false,
                dropdown_owner: "page_limit"
            });
        }
    }

    //Handle the event for setting the page limit
    setPageLimit = (event) => {
        this.setState({
            page_limit: global.localStorage.getItem("pageLimit")
        });
        global.localStorage.setItem("currentPage", 1);
    }

    //Handle the event of putting the modal into view
    showModal = (event) => {
        event.preventDefault();

        this.setState({
            show_modal: true,
            show_dropdown: false
        });
    }

    //Handle the logout event
    handleLogout = (event) => {
        event.preventDefault();

        if (global.localStorage.getItem("accessToken")) {
            //Make an HTTP request to the API to logout the user
            global.callAPI('/auth/logout', "POST")
                //Handle promise response
                .then((responseJson) => {
                    if (responseJson.status && responseJson.status === "success") {
                        global.localStorage.setItem("accessToken", "");
                        global.localStorage.setItem("username", global.localStorage.getItem("username"));
                        global.localStorage.setItem("loggedIn", false);
                        global.localStorage.setItem("message", responseJson.message);
                        global.localStorage.setItem("messageType", "success");
                    } else {
                        global.localStorage.setItem("message", responseJson.message);
                        global.localStorage.setItem("messageType", "danger");
                    }
                })
                //Handle errors
                .catch((error) => {
                });
        }
        else {
            global.localStorage.setItem("message", "Please Login");
            global.localStorage.setItem("messageType", "danger");
        }
        //Load the login page
        window.location = "/login";
    }

    render() {
        let dropdown, modal = null;

        // Render the dropdown menu on the NavBar if expected
        if (this.state.show_dropdown) {
            dropdown = <NavBarDropdown
                owner={this.state.dropdown_owner}
                showModal={(event) => this.showModal(event)}
                setPageLimit={(event) => this.setPageLimit(event)} />;
        }

        // Render the modal on the NavBar if expected
        if (this.state.show_modal) {
            modal = <Modal
                title="Change Password"
                owner="change_password" />;
        }

        //Render search bar and page limit drop down
        if (this.props.logged_in && this.props.authorized && this.props.page === 'home' && this.props.name === 'search') {
            return (
                <li>
                    <div className="navbar-input-divs">
                        <SearchBar
                            onSearchTermChange={term => { this.props.onSearchTermChange(term) }} />
                    </div>
                    <div className="navbar-input-divs navbar-serch-limit">
                        <h5 className="nav-text"><a href="" className="navbar-link" onClick={this.toggleDropDownPageLimit}>{this.state.page_limit}<b className="caret"></b></a> Lists per page</h5>
                        {dropdown}
                    </div>
                </li>
            );
        }
        //Render greeting and account dropdown
        if (this.props.username && this.props.name === 'greeting') {
            return (
                <li>
                    <h5 className="nav-text">Hi <a href="" onClick={this.toggleDropDownChangePw} className="navbar-link" >{this.props.username}<b className="caret"></b></a></h5>
                    {dropdown}
                    {modal}
                </li>
            );
        }
        //Render logout link
        if (this.props.logged_in && this.props.authorized && this.props.page === 'home' && this.props.name === 'link') {
            return (
                <li>
                    <a href="" onClick={this.handleLogout} className="navbar-link">Logout</a>
                </li>
            );
        }
        // Render login link
        else if (this.props.page === 'sign_up' && this.props.name === 'link') {
            return (
                <li>
                    <Link to='/login' className="navbar-link">Login</Link>
                </li>
            );
        }
        //Render sign up link
        else if (this.props.page === 'login' && this.props.name === 'link') {
            return (
                <li>
                    <Link to='/register' className="navbar-link">Sign Up</Link>
                </li>
            );
        }
        return null;
    }
}

export default NavBarOptionItem;
