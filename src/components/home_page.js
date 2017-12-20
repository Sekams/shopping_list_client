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

    //Check if the user was successfully logged in
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

    //Obtain shopping lists from the API
    getShoppingLists() {
        if (this.verifyAuthorization()) {
            global.showSpinner(this);

            global.clearMessages(this);

            //Make API request to get all shopping lists for the user
            global.callAPI('/shoppinglists/' + this.state.page_limit + '/' + global.localStorage.getItem("currentPage"), "GET")
            //Handle promise response
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
                //Handle any errors thrown
                .catch((error) => {
                    this.setState({
                        msg: error.message,
                        msg_type: "danger"
                    });
                    global.dismissSpinner(this);
                });
        }
    }

    //Handle search events
    onSearchTermChange(term) {
        global.localStorage.setItem("searchTerm", term);
        if (this.verifyAuthorization()) {
            if (term) {
                global.showSpinner(this);
                global.clearMessages(this);
                let newShoppingLists = [];

                //Make API request to get all shopping lists whose title starts with the search term
                global.callAPI('/shoppinglists/search/shoppinglist/' + term + '/1000/1', "GET")
                //Handle promise response    
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
                    //Handle any errors if any
                    .catch((error) => {
                        global.dismissSpinner(this);
                    });

                global.showSpinner(this);
                //Make API request to get all shopping list items whose name starts with the search term
                global.callAPI('/shoppinglists/search/item/' + term + '/1000/1', 'GET')
                //Handle promise response
                    .then((responseJson) => {
                        if (responseJson.status && responseJson.status === "success") {
                            //Loop through all the returned items
                            responseJson.shoppingListItems.forEach((shoppingListItem) => {
                                //Make API request to get the shopping lists for the items returned
                                global.callAPI('/shoppinglists/' + shoppingListItem.shopping_list_id, "GET")
                                    //Handle promise response
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
                                    //Handle errors if any
                                    .catch((error) => {
                                    });
                            });
                        }
                    })
                    //Handle errors if any
                    .catch((error) => {
                        global.dismissSpinner(this);
                    });

                //Update pages with searched for shopping lists
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

    //Change state to show CRUD modal
    showModal = (event) => {
        //Prevent method from refresshing
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

        //Check if there are any shopping lists and render them
        if (this.state.pageOfItems) {
            //Loop through all shopping lists and render each individually
            shoppingLists = this.state.pageOfItems.map((shoppingList) => {
                return <ShoppingList
                    key={shoppingList.id}
                    title={shoppingList.title}
                    id={shoppingList.id} />
            });
        }

        //Render Snackbar if there are any messages
        if (this.state.msg && this.state.msg_type) {
            snackBar = <SnackBar
                class={this.state.msg_type + "-snackbar"}
                message={this.state.msg} />;
        }

        //Render modal if the state indicates that it should be rendered
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
