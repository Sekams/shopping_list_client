import React, { Component } from 'react';
import ShoppingList from './shopping_list';
import Modal from './modal'
import NavBar from './nav_bar'
import SnackBar from './snackbar'
import Pagination from './pagination'

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: localStorage.getItem("username"),
            authorized: ((localStorage.getItem("accessToken")) ? true : false),
            logged_in: localStorage.getItem("loggedIn"),
            new_shopping_list_title: '',
            msg: localStorage.getItem("message"),
            msg_type: localStorage.getItem("messageType"),
            page_limit: localStorage.getItem("pageLimit"),
            pageOfItems: [],
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
            localStorage.setItem("message", "Please Login");
            localStorage.setItem("messageType", "danger");
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

    clearMessages = () => {
        if (this._mounted) {
            this.setState({
                msg: '',
                msg_type: ''
            });
        }
    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        } else {
            return response.json().then((responseJSON) => {
                throw responseJSON;
            })
        }
    }

    getShoppingLists() {
        if (this.verifyAuthorization()) {
            this.clearMessages();

            fetch(localStorage.getItem("baseUrl") + '/shoppinglists/' + this.state.page_limit + '/' + localStorage.getItem("currentPage") , {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("accessToken")
                }
            })
                .then(this.checkStatus)
                .then((responseJson) => {
                    if (responseJson.status && responseJson.status === "success") {
                        if (this._mounted) {
                            this.setState({
                                shoppingLists: responseJson.shoppingLists
                            });
                        }
                    } else {
                        if (this._mounted) {
                            this.setState({
                                msg: "No Shopping Lists",
                                msg_type: "danger"
                            });
                        }
                    }
                })
                .catch((error) => {
                    if (this._mounted) {
                        this.setState({
                            msg: error.message,
                            msg_type: "danger"
                        });
                    }
                });
        }
    }

    onSearchTermChange(term) {
        localStorage.setItem("searchTerm", term);
        if (this.verifyAuthorization()) {
            if (term) {
                this.clearMessages();
                let newShoppingLists = [];

                fetch(localStorage.getItem("baseUrl") + '/shoppinglists/search/shoppinglist/' + term + '/' + this.state.page_limit + '/' + localStorage.getItem("currentPage"), {
                    method: 'GET',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("accessToken")
                    }
                })
                    .then(this.checkStatus)
                    .then((responseJson) => {
                        if (responseJson.status && responseJson.status === "success") {

                            responseJson.shoppingLists.forEach((shoppingList) => {

                                let exists = false;
                                if (!newShoppingLists) {
                                    newShoppingLists.push(shoppingList);
                                }
                                newShoppingLists.forEach((newShoppingList) => {
                                    if (newShoppingList.id === shoppingList.id) {
                                        exists = true;
                                    }
                                });
                                if (!exists) {
                                    newShoppingLists.push(shoppingList);
                                }
                                if (this._mounted) {
                                    this.setState({
                                        shoppingLists: newShoppingLists,
                                    });
                                }

                            });

                        } else {
                            if (this._mounted) {
                                this.setState({
                                    msg: "No Shopping Lists",
                                    msg_type: "danger"
                                });
                            }
                        }
                    })
                    .catch((error) => {
                        this.setState({
                            msg: error.message,
                            msg_type: "danger"
                        });
                    });

                fetch(localStorage.getItem("baseUrl") + '/shoppinglists/search/item/' + term + '/' + this.state.page_limit + '/' + localStorage.getItem("currentPage"), {
                    method: 'GET',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("accessToken")
                    }
                })
                    .then(this.checkStatus)
                    .then((responseJson) => {
                        if (responseJson.status && responseJson.status === "success") {
                            responseJson.shoppingListItems.forEach((shoppingListItem) => {
                                fetch(localStorage.getItem("baseUrl") + '/shoppinglists/' + shoppingListItem.shopping_list_id, {
                                    method: 'GET',
                                    headers: {
                                        "Authorization": "Bearer " + localStorage.getItem("accessToken")
                                    }
                                })
                                    .then(this.checkStatus)
                                    .then((responseJson) => {
                                        if (responseJson.status && responseJson.status === "success") {
                                            let exists = false;
                                            if (!newShoppingLists) {
                                                newShoppingLists.push(responseJson.shoppingList);
                                            }
                                            newShoppingLists.forEach((shoppingList) => {
                                                if (shoppingList.id === responseJson.shoppingList.id) {
                                                    exists = true;
                                                }
                                            });
                                            if (!exists) {
                                                newShoppingLists.push(responseJson.shoppingList);
                                            }
                                            if (this._mounted) {
                                                this.setState({
                                                    shoppingLists: newShoppingLists,
                                                });
                                            }
                                        }
                                    })
                                    .catch((error) => { });
                            });
                        }
                    })
                    .catch((error) => {
                        this.setState({
                            msg: error.message,
                            msg_type: "danger"
                        });
                    });
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

        if (this._mounted) {
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
    }

    render() {
        let shoppingLists, snackBar, modal = null;

        if (this.state.shoppingLists) {
            shoppingLists = this.state.pageOfItems.map((shoppingList) => {
                return <ShoppingList
                    key={shoppingList.id}
                    title={shoppingList.title}
                    id={shoppingList.id}
                    clearMessages={() => this.clearMessages()} />
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
                clearMessages={() => this.clearMessages()}
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

                <div className="wrapper">
                    <div className="home-wrapper">
                        {shoppingLists}
                    </div>
                </div>

                <a href="" className="btn-fab round-button" onClick={this.showModal}>
                    <i className="fab-icon fa-plus"></i>
                </a>

                <Pagination
                items={this.state.shoppingLists}
                onChangePage={this.onChangePage} />

                {modal}

                {snackBar}
            </div>
        );
    }
}

export default HomePage;
