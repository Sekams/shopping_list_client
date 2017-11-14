import React, { Component } from 'react';
import ShoppingList from './shopping_list';
import Modal from './modal'
import NavBar from './nav_bar'
import SnackBar from './snackbar'

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'Sekams',
            authorized: true,
            logged_in: true,
            page: 'home',
            shoppingLists: []
        };
    }

    render() {
        var shoppingLists = null;
        if (this.state.shoppingLists) {
            const shoppingLists = this.state.shoppingLists.map((shoppingList) => {
                return <ShoppingList
                    key={shoppingList.title}
                    title={shoppingList.title}
                    shoppingListItems={shoppingList.shoppingListItems} />
            });
        }
        
        return (
            <div>
                <NavBar
                    username={this.state.username}
                    authorized={this.state.authorized}
                    logged_in={this.state.logged_in}
                    page={this.state.page} />

                <div className="wrapper">
                    <div className="home-wrapper">
                        {shoppingLists}
                    </div>
                </div>

                <a className="btn-fab round-button">
                    <i className="fab-icon fa-plus"></i>
                </a>

                <Modal
                    title="Modal"
                    create={true} />

                <SnackBar
                    class="success-snackbar"
                    message="Welcome to the Home Page" />
            </div>
        );
    }
}

export default HomePage;
