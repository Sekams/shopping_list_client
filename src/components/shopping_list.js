import React, { Component } from 'react';
import ShoppingListItem from './shopping_list_item';
import Modal from './modal'

class ShoppingList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            title: props.title,
            showModal: false,
            modal_title: '',
            create: false,
            price: '',
            owner: '',
            msg: '',
            msg_type: '',
            shoppingListItems: []
        };

        this.getShoppingListItems();
    }

    componentDidMount() {
        this._mounted = true;
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    clearMessages() {
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

    getShoppingListItems() {
        this.clearMessages();

        fetch(global.localStorage.getItem("baseUrl") + '/shoppinglists/' + this.state.id + '/items/1000/1', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + global.localStorage.getItem("accessToken")
            }
        })
            .then(this.checkStatus)
            .then((responseJson) => {
                if (responseJson.status && responseJson.status === "success") {
                    if (this._mounted) {
                        this.setState({
                            shoppingListItems: responseJson.shoppingListItems
                        });
                    }
                }
            })
            .catch((error) => {
                
            });
    }

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

        if (this.state.show_modal) {
            modal = <Modal
                title={this.state.modal_title}
                create={this.state.create}
                price={this.state.price}
                owner={this.state.owner}
                first_input={this.state.first_input}
                shopping_list_id={this.state.id}
                clearMessages={() => this.clearMessages()}
                showModal={(event) => this.showModal(event)} />;
        }

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
