import React, { Component } from 'react';
import ShoppingList from './shopping_list';
import Modal from './modal'
import NavBar from './nav_bar'
import SnackBar from './snackbar'
import Pagination from './pagination'
import Spinner from './spinner'

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: global.localStorage.getItem("username"),
            authorized: ((global.localStorage.getItem("accessToken")) ? true : false),
            logged_in: global.localStorage.getItem("loggedIn"),
            new_shopping_list_title: '',
            msg: global.localStorage.getItem("message"),
            msg_type: global.localStorage.getItem("messageType"),
            page_limit: global.localStorage.getItem("pageLimit"),
            pageOfItems: [],
            total_lists: 0,
            show_modal: false,
            shoppingLists: [],
            searchTerm: ''
        };

        this.onChangePage = this.onChangePage.bind(this);

        this.verifyAuthorization();

        this.getShoppingLists();        
    }

    verifyAuthorization() {
        if (!(this.state.logged_in) || !(this.state.authorized)) {
            global.localStorage.setItem("message", "Please Login");
            global.localStorage.setItem("messageType", "danger");
            this.props.history.push('/login');

            return false;
        }
        return true;
    }

    componentDidMount() {
        this._mounted = true;
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    getShoppingLists() {
        if (this.verifyAuthorization()) {
            global.showSpinner(this);

            global.clearMessages(this);

            global.callAPI('/shoppinglists/' + this.state.page_limit + '/' + global.localStorage.getItem("currentPage"), "GET")
                .then((responseJson) => {
                    if (responseJson.status && responseJson.status === "success") {
                        this.setState({
                            total_lists: responseJson.total,
                            shoppingLists: responseJson.shoppingLists
                        });
                        global.dismissSpinner(this);
                    } else {
                        this.setState({
                            msg: "No Shopping Lists",
                            msg_type: "danger"
                        });
                        global.dismissSpinner(this);
                    }
                })
                .catch((error) => {
                    this.setState({
                        msg: error.message,
                        msg_type: "danger"
                    });
                    global.dismissSpinner(this);
                });
        }
    }

    onSearchTermChange(term) {
        global.localStorage.setItem("searchTerm", term);
        if (this.verifyAuthorization()) {
            if (term) {
                global.showSpinner(this);
                global.clearMessages(this);
                let newShoppingLists = [];

                global.callAPI('/shoppinglists/search/shoppinglist/' + term + '/1000/1', "GET")
                    .then((responseJson) => {
                        if (responseJson.status && responseJson.status === "success") {
                            responseJson.shoppingLists.forEach((shoppingList) => {
                                newShoppingLists.push(shoppingList);
                                this.setState({
                                    shoppingLists: newShoppingLists
                                });

                            });
                            global.dismissSpinner(this);
                        } else {
                            this.setState({
                                msg: "No Shopping Lists",
                                msg_type: "danger"
                            });
                            global.dismissSpinner(this);
                        }
                    })
                    .catch((error) => {
                        global.dismissSpinner(this);
                    });

                global.showSpinner(this);
                global.callAPI('/shoppinglists/search/item/' + term + '/1000/1', 'GET')
                    .then((responseJson) => {
                        if (responseJson.status && responseJson.status === "success") {
                            responseJson.shoppingListItems.forEach((shoppingListItem) => {

                                global.callAPI('/shoppinglists/' + shoppingListItem.shopping_list_id, "GET")
                                    .then((responseJson) => {
                                        if (responseJson.status && responseJson.status === "success") {
                                            let exists = false;
                                            newShoppingLists.forEach((shoppingList) => {
                                                if (shoppingList.id === responseJson.shoppingList.id) {
                                                    exists = true;
                                                }
                                            });
                                            if (!exists) {
                                                newShoppingLists.push(responseJson.shoppingList);
                                            }
                                            this.setState({
                                                shoppingLists: newShoppingLists
                                            });
                                            global.dismissSpinner(this);
                                        }
                                    })
                                    .catch((error) => {
                                    });
                            });
                        }
                    })
                    .catch((error) => {
                        global.dismissSpinner(this);
                    });

                this.onChangePage(newShoppingLists);
            }
            else {
                this.getShoppingLists();
            }
        }
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    showModal = (event) => {
        event.preventDefault();

        if (this.state.show_modal) {
            this.setState({
                show_modal: false
            });
        }
        else {
            this.setState({
                show_modal: true
            });
        }
    }

    render() {
        let shoppingLists, snackBar, modal = null;

        if (this.state.pageOfItems) {
            shoppingLists = this.state.pageOfItems.map((shoppingList) => {
                return <ShoppingList
                    key={shoppingList.id}
                    title={shoppingList.title}
                    id={shoppingList.id} />
            });
        }

        if (this.state.msg && this.state.msg_type) {
            snackBar = <SnackBar
                class={this.state.msg_type + "-snackbar"}
                message={this.state.msg} />;
        }

        if (this.state.show_modal) {
            modal = <Modal
                title="Create Shopping List"
                create={true}
                owner="add_shopping_list"
                showModal={(event) => this.showModal(event)} />;
        }

        return (
            <div>
                <NavBar
                    username={this.state.username}
                    authorized={this.state.authorized}
                    logged_in={this.state.logged_in}
                    page='home'
                    onSearchTermChange={term => { this.onSearchTermChange(term) }} />

                <Spinner ref={(spinner) => { this._spinner = spinner; }} />

                <div className="wrapper">
                    <div className="home-wrapper">
                        {shoppingLists}
                    </div>
                </div>

                <a href="" className="btn-fab round-button" onClick={this.showModal}>
                    <i className="fab-icon fa-plus"></i>
                </a>

                <Pagination
                    total_items={this.state.total_lists}
                    items={this.state.shoppingLists}
                    onChangePage={this.onChangePage} />

                {modal}

                {snackBar}
            </div>
        );
    }
}

export default HomePage;
