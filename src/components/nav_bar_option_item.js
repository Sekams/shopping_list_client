import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import SearchBar from './search_bar'
import NavBarDropdown from './nav_bar_dropdown'
import Modal from './modal'

class NavBarOptionItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show_dropdown: false,
            show_modal: false,
            dropdown_owner: '',
            page_limit: localStorage.getItem("pageLimit")
        };
    }

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

    setPageLimit = (event) => {
        this.setState({
            page_limit: localStorage.getItem("pageLimit")
        });
    }

    showModal = (event) => {
        event.preventDefault();

        this.setState({
            show_modal: true,
            show_dropdown: false
        });
    }

    handleLogout = (event) => {
        event.preventDefault();

        if (localStorage.getItem("accessToken")) {
            fetch(localStorage.getItem("baseUrl") + '/auth/logout', {
                method: 'POST',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("accessToken")
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.status && responseJson.status === "success") {
                        localStorage.setItem("accessToken", "");
                        localStorage.setItem("username", localStorage.getItem("username"));
                        localStorage.setItem("loggedIn", false);
                        localStorage.setItem("message", responseJson.message);
                        localStorage.setItem("messageType", "success");
                    } else {
                        localStorage.setItem("message", responseJson.message);
                        localStorage.setItem("messageType", "danger");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else {
            localStorage.setItem("message", "Please Login");
            localStorage.setItem("messageType", "danger");
        }
        window.location = "/login";
    }

    render() {
        let dropdown, modal = null;

        if (this.state.show_dropdown) {
            dropdown = <NavBarDropdown
                owner={this.state.dropdown_owner}
                showModal={(event) => this.showModal(event)}
                setPageLimit={(event) => this.setPageLimit(event)} />;
        }

        if (this.state.show_modal) {
            modal = <Modal
                title="Change Password"
                owner="change_password" />;
        }

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
        if (this.props.username && this.props.name === 'greeting') {
            return (
                <li>
                    <h5 className="nav-text">Hi <a href="" onClick={this.toggleDropDownChangePw} className="navbar-link" >{this.props.username}<b className="caret"></b></a></h5>
                    {dropdown}
                    {modal}
                </li>
            );
        }
        if (this.props.logged_in && this.props.authorized && this.props.page === 'home' && this.props.name === 'link') {
            return (
                <li>
                    <a href="" onClick={this.handleLogout} className="navbar-link">Logout</a>
                </li>
            );
        }
        else if (this.props.page === 'sign_up' && this.props.name === 'link') {
            return (
                <li>
                    <Link to='/login' className="navbar-link">Login</Link>
                </li>
            );
        }
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
