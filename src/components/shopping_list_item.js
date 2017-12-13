import React, { Component } from 'react';
import CheckBox from './check_box'
import Modal from './modal'

class ShoppingListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: props.name,
            price: props.price,
            status: props.status,
            shopping_list_id: props.shopping_list_id,
            shopping_list_title: props.shopping_list_title,
            showModal: false,
            modal_title: '',
            create: false,
            owner: '',
            msg: '',
            msg_type: '',
        };
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

    editShoppingListItem = (event) => {
        event.preventDefault();

        if (this._mounted) {
            this.setState({
                show_modal: true,
                modal_title: "Edit '" + this.state.name + "' from '" + this.state.shopping_list_title + "'",
                price: this.state.price,
                owner: "edit_shopping_list_item",
                create: true,
                first_input: this.state.name 
            });
        }
    }

    deleteShoppingListItem = (event) => {
        event.preventDefault();

        if (this._mounted) {
            this.setState({
                show_modal: true,
                modal_title: "Are you sure you want to delete '" + this.state.name + "' from '" + this.state.shopping_list_title + "'?",
                price: '',
                owner: "delete_shopping_list_item",
                create: false,
                first_input: '', 
            });
        }
    }

    render() {
        let modal = null;
        let theClass = "list-card";

        if (this.state.show_modal) {
            modal = <Modal
                title={this.state.modal_title}
                create={this.state.create}
                price={this.state.price}
                owner={this.state.owner}
                first_input={this.state.first_input}
                shopping_list_id={this.state.shopping_list_id}
                shopping_list_item_id={this.state.id}
                shopping_list_item_status={this.state.status}
                clearMessages={() => this.clearMessages()}
                showModal={(event) => this.showModal(event)} />;
        }

        if (global.localStorage.getItem("searchTerm") && this.state.name.substring(0, global.localStorage.getItem("searchTerm").length).toLowerCase() === global.localStorage.getItem("searchTerm").toLowerCase()) {
            theClass = theClass + " highlighted-item";
        }
        else {
            theClass = "list-card";
        }

        return (
            <div className={theClass}>
                <div className="item-container">
                    <div className="item-text">
                        <div>
                            <h4 className="item-name">{this.state.name}</h4>
                        </div>

                        <div>
                            <h6>
                                SHS {this.state.price}
                            </h6>
                        </div>
                    </div>
                    <div className="item-icon-holder">
                        <a href="" title="Edit Item" onClick={this.editShoppingListItem}>
                            <i className="item-icons fa-pencil"></i>
                        </a>

                        <a href="" title="Delete Item" onClick={this.deleteShoppingListItem}>
                            <i className="item-icons fa-trash"></i>
                        </a>
                    </div>
                </div>

                <CheckBox
                    id={this.state.id}
                    name={this.state.name}
                    price={this.state.price}
                    status={this.state.status}
                    shopping_list_id={this.state.shopping_list_id} />

                {modal}
            </div>
        );
    }
}

export default ShoppingListItem;