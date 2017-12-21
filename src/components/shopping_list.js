import React, { Component } from 'react';
import ShoppingListItem from './shopping_list_item';
import Modal from './modal'
require("../utils/helpers");

class ShoppingList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            title: props.title,
            show_modal: false,
            modal_title: '',
            create: false,
            price: '',
            owner: '',
            msg: '',
            msg_type: '',
            shoppingListItems: []
        };

    }

    //Ensure that the component is mounted into view
    componentDidMount() {
        this._mounted = true;
        this.getShoppingListItems();
    };

    //Check if the component is yet to be mounted into view
    componentWillUnmount() {
        this._mounted = false;
    }

    //Get all shopping list items of the shopping list
    getShoppingListItems() {
        // global.showSpinner(this);
        global.clearMessages(this);
        //Make an HTTP request to the API to get all shopping list items of the shopping list
        global.callAPI('/shoppinglists/' + this.state.id + '/items/1000/1', 'GET')
            //Handle promise response
            .then((responseJson) => {
                if (responseJson.status && responseJson.status === "success") {
                    if (this._mounted) {
                        this.setState({
                            shoppingListItems: responseJson.shoppingListItems
                        });
                        global.dismissSpinner(this.props.home_component);
                    }
                }
            })
            //Handle errors
            .catch((error) => {
                global.dismissSpinner(this.props.home_component);
            });
    }

    //Handle the event of adding a shopping list item
    addShoppingListItem = (event) => {
        event.preventDefault();

        if (this._mounted) {
            this.setState({
                show_modal: true,
                modal_title: "Add Item to '" + this.state.title + "'",
                price: -1,
                owner: "add_shopping_list_item",
                first_input: '',
                create: true
            });
        }
    }

    //Handle the event of editing a shopping list
    editShoppingList = (event) => {
        event.preventDefault();

        if (this._mounted) {
            this.setState({
                show_modal: true,
                modal_title: "Edit '" + this.state.title + "'",
                price: '',
                owner: "edit_shopping_list",
                create: true,
                first_input: this.state.title
            });
        }
    }

    //Handle the event of deleting a shopping list
    deleteShoppingList = (event) => {
        event.preventDefault();

        if (this._mounted) {
            this.setState({
                show_modal: true,
                modal_title: "Are you sure you want to delete '" + this.state.title + "'?",
                price: '',
                owner: "delete_shopping_list",
                create: false,
                first_input: ''
            });
        }
    }

    //Handle the event for putting modal into view
    showModal(event) {
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
        let shoppingListItems, modal = null;
        let theClass = "card-container";

        //Render a shopping list item component for each of the items
        if (this.state.shoppingListItems) {
            shoppingListItems = this.state.shoppingListItems.map((item) => {
                return <ShoppingListItem
                    key={item.name}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    status={item.status}
                    searchTerm={this.state.searchTerm}
                    shopping_list_id={this.state.id}
                    shopping_list_title={this.state.title} />
            });
        }

        //Render modal if expected
        if (this.state.show_modal) {
            modal = <Modal
                title={this.state.modal_title}
                create={this.state.create}
                price={this.state.price}
                owner={this.state.owner}
                first_input={this.state.first_input}
                shopping_list_id={this.state.id}
                showModal={(event) => this.showModal(event)} />;
        }

        //Check if the shopping list is being searched for and highlight it if true
        if (global.localStorage.getItem("searchTerm") && this.state.title.substring(0, global.localStorage.getItem("searchTerm").length).toLowerCase() === global.localStorage.getItem("searchTerm").toLowerCase()) {
            theClass = theClass + " highlighted";
        }
        else {
            theClass = "card-container";
        }

        return (
            <div className={theClass}>

                <h3 className="item-text shopping-list-title">{this.state.title}</h3>
                <div className="card-icon-holder">
                    <a href="" title="Add Item" onClick={this.addShoppingListItem}>
                        <i className="icons fa-plus-circle"></i>
                    </a>

                    <a href="" title="Edit List" onClick={this.editShoppingList}>
                        <i className="icons fa-pencil"></i>
                    </a>

                    <a href="" title="Delete List" onClick={this.deleteShoppingList}>
                        <i className="icons fa-trash"></i>
                    </a>
                </div>
                <div className="shopping-list-items-wrapper">
                    {shoppingListItems}
                </div>
                {modal}
            </div>
        );
    }
}

export default ShoppingList;
