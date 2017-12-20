import React, { Component } from 'react';

class NavBarDropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            owner: props.owner
        };
    }

    //Handle the event of placing the modal into view
    showModal = (event) => {
        event.preventDefault();
        this.props.showModal(event);
    }

    //Set the page limit of the application
    setLimit6 = (event) => {
        global.localStorage.setItem("pageLimit", 6);
        this.props.setPageLimit(event);
    }
    setLimit12 = (event) => {
        global.localStorage.setItem("pageLimit", 12);
        this.props.setPageLimit(event);
    }
    setLimit24 = (event) => {
        global.localStorage.setItem("pageLimit", 24);
        this.props.setPageLimit(event);
    }
    setLimit48 = (event) => {
        global.localStorage.setItem("pageLimit", 48);
        this.props.setPageLimit(event);
    }

    render() {
        //Render dropdown for changing password
        if (this.state.owner === "change_password") {
            return (
                <ul id="account-navbar-dropdown" className="dropdown-menu show">
                    <li className="dropdown-header">Account</li>
                    <li><a href="" onClick={this.showModal}>Change Password</a></li>
                </ul>
            );
        }
        //Render dropdown for setting the page limit
        else if (this.state.owner === "page_limit") {
            return (
                <ul id="page-limit-navbar-dropdown" className="dropdown-menu show">
                    <li className="dropdown-header">Page Limit</li>
                    <li><a href="" onClick={this.setLimit6}>6</a></li>
                    <li className="divider"></li>
                    <li><a href="" onClick={this.setLimit12}>12</a></li>
                    <li className="divider"></li>
                    <li><a href="" onClick={this.setLimit24}>24</a></li>
                    <li className="divider"></li>
                    <li><a href="" onClick={this.setLimit48}>48</a></li>                    
                </ul>
            );
        }
        return null;
    }
}

export default NavBarDropdown;