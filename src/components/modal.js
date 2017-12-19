import React, { Component } from 'react';
import SnackBar from './snackbar'
require("../utils/helpers");

class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showing: true,
            old_password: '',
            new_password: '',
            first_input: (props.first_input ? props.first_input : ''),
            price: (props.price ? props.price : 0),
            msg: '',
            msg_type: ''
        };

        this.handleFirstInput = this.handleFirstInput.bind(this);
        this.handleOldPassword = this.handleOldPassword.bind(this);
        this.handleNewPassword = this.handleNewPassword.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }


    handleOldPassword(old_password) {
        this.setState({
            old_password: old_password
        });
    }
    handleNewPassword(new_password) {
        this.setState({
            new_password: new_password
        });
    }

    handleFirstInput(first_input) {
        this.setState({
            first_input: first_input
        });
    }

    handlePrice(price) {
        this.setState({
            price: price
        });
    }

    handleOnSubmit = (event) => {

        if (this.props.owner === "change_password") {
            this.changePassword(event);
        }
        else if (this.props.owner === "add_shopping_list") {
            this.addShoppingList(event);
        }
        else if (this.props.owner === "add_shopping_list_item") {
            this.addShoppingListItem(event);
        }
        else if (this.props.owner === "edit_shopping_list") {
            this.editShoppingList(event);
        }
        else if (this.props.owner === "delete_shopping_list") {
            this.deleteShoppingList(event);
        }
        else if (this.props.owner === "edit_shopping_list_item") {
            this.editShoppingListItem(event);
        }
        else if (this.props.owner === "delete_shopping_list_item") {
            this.deleteShoppingListItem(event);
        }

        event.preventDefault();
    }

    addShoppingList = (event) => {
        event.preventDefault();

        if (this.state.first_input) {
            global.clearMessages(this);

            let addShoppingListFormData = new FormData();

            addShoppingListFormData.append("title", this.state.first_input);

            global.callAPI('/shoppinglists/', "POST", addShoppingListFormData)
                .then((responseJson) => {
                    if (responseJson.status && responseJson.status === "success") {
                        this.setState({
                            msg: "Shopping List '" + responseJson.shoppingList.title + "' Created",
                            msg_type: "success",
                            showing: false
                        });
                        global.localStorage.setItem("message", "Shopping List '" + responseJson.shoppingList.title + "' Created");
                        global.localStorage.setItem("messageType", "success");
                        window.location.reload();
                    } else {
                        this.setState({
                            msg: "Shopping List '" + addShoppingListFormData["title"] + "' Not Created",
                            msg_type: "danger",
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
            this.setState({
                msg: "Please enter the 'Title'",
                msg_type: "danger"
            });
        }
    }

    editShoppingList = (event) => {
        event.preventDefault();

        if (this.state.first_input) {
            global.clearMessages(this);

            let editShoppingListFormData = new FormData();

            editShoppingListFormData.append("new_title", this.state.first_input);

            global.callAPI('/shoppinglists/' + this.props.shopping_list_id, "PUT", editShoppingListFormData)
                .then((responseJson) => {
                    if (responseJson.status && responseJson.status === "success") {
                        this.setState({
                            msg: "Shopping List '" + this.props.first_input + "' Edited to '" + responseJson.shoppingList.title + "'",
                            msg_type: "success",
                            showing: false
                        });
                        global.localStorage.setItem("message", "Shopping List '" + this.props.first_input + "' Edited to '" + responseJson.shoppingList.title + "'");
                        global.localStorage.setItem("messageType", "success");
                        window.location.reload();
                    } else {
                        this.setState({
                            msg: "Shopping List '" + this.props.first_input + "' Not Edited",
                            msg_type: "danger",
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
            this.setState({
                msg: "Please enter the 'Title'",
                msg_type: "danger"
            });
        }
    }

    deleteShoppingList = (event) => {
        event.preventDefault();

        global.clearMessages(this);

        global.callAPI('/shoppinglists/' + this.props.shopping_list_id, "DELETE")
            .then((responseJson) => {
                if (responseJson.status && responseJson.status === "success") {
                    this.setState({
                        msg: responseJson.message,
                        msg_type: "success",
                        showing: false
                    });
                    global.localStorage.setItem("message", responseJson.message);
                    global.localStorage.setItem("messageType", "success");
                    window.location.reload();
                } else {
                    this.setState({
                        msg: responseJson.message,
                        msg_type: "danger",
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

    changePassword = (event) => {
        event.preventDefault();

        global.clearMessages(this);

        let changePasswordForm = this.state;
        let changePasswordFormData = new FormData();

        if (this.state.old_password && this.state.new_password) {
            changePasswordFormData.append("old_password", changePasswordForm.old_password);
            changePasswordFormData.append("new_password", changePasswordForm.new_password);

            global.callAPI('/auth/reset-password', "POST", changePasswordFormData)
                .then((responseJson) => {
                    if (responseJson.status && responseJson.status === "success") {
                        this.setState({
                            msg: responseJson.message,
                            msg_type: "success",
                            showing: false
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
            this.setState({
                msg: "Please fill all fields",
                msg_type: "danger",
                showing: true
            });
        }
    }

    addShoppingListItem = (event) => {
        event.preventDefault();

        global.clearMessages(this);

        let addShoppingListItemFormData = new FormData();

        addShoppingListItemFormData.append('name', this.state.first_input);
        addShoppingListItemFormData.append('price', (this.state.price && this.state.price > 0 ? this.state.price : ''));
        addShoppingListItemFormData.append('status', false);

        global.callAPI('/shoppinglists/' + this.props.shopping_list_id + '/items/', "POST", addShoppingListItemFormData)
            .then((responseJson) => {
                if (responseJson.status && responseJson.status === "success") {
                    this.setState({
                        msg: "Shopping List Item '" + responseJson.shoppingListItem.name + "' Created",
                        msg_type: "success",
                        showing: false
                    });
                    global.localStorage.setItem("message", "Shopping List Item '" + responseJson.shoppingListItem.name + "' Created");
                    global.localStorage.setItem("messageType", "success");
                    window.location.reload();
                }
            })
            .catch((error) => {
                this.setState({
                    msg: error.message,
                    msg_type: "danger"
                });
            });
    };

    editShoppingListItem = (event) => {
        event.preventDefault();

        if (this.state.first_input && this.state.price) {
            global.clearMessages(this);

            let editShoppingListItemFormData = new FormData();

            editShoppingListItemFormData.append("new_name", this.state.first_input);
            editShoppingListItemFormData.append("new_price", this.state.price);
            editShoppingListItemFormData.append("new_status", this.props.shopping_list_item_status);

            global.callAPI('/shoppinglists/' + this.props.shopping_list_id + "/items/" + this.props.shopping_list_item_id, "PUT", editShoppingListItemFormData)
                .then((responseJson) => {
                    if (responseJson.status && responseJson.status === "success") {
                        this.setState({
                            msg: responseJson.message,
                            msg_type: "success",
                            showing: false
                        });
                        global.localStorage.setItem("message", responseJson.message);
                        global.localStorage.setItem("messageType", "success");
                        window.location.reload();
                    } else {
                        this.setState({
                            msg: responseJson.message,
                            msg_type: "danger",
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
            this.setState({
                msg: "Please fill all fields",
                msg_type: "danger"
            });
        }
    };

    deleteShoppingListItem = (event) => {
        event.preventDefault();

        global.clearMessages(this);

        global.callAPI('/shoppinglists/' + this.props.shopping_list_id + "/items/" + this.props.shopping_list_item_id, "DELETE")
            .then((responseJson) => {
                if (responseJson.status && responseJson.status === "success") {
                    this.setState({
                        msg: responseJson.message,
                        msg_type: "success",
                        showing: false
                    });
                    global.localStorage.setItem("message", responseJson.message);
                    global.localStorage.setItem("messageType", "success");
                    window.location.reload();
                } else {
                    this.setState({
                        msg: responseJson.message,
                        msg_type: "danger",
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

    render() {
        let buttons, firstInput, secondInput, snackBar, placeHolder = null;

        if (this.props.create || this.props.owner === "change_password") {
            buttons = <button className="btn btn-form-submit btn-modal-form-submit" type="submit">Save</button>;
        }
        else {
            buttons = <div className="card-modal-button-wrapper">
                <div className="modal-left-button">
                    <button className="btn button btn-delete modal-left-button-btn" type="submit" >Delete</button>
                </div>
                <div className="modal-right-button">
                    <button className="btn modal-right-button-btn" onClick={this.closeModal}>Cancel</button>
                </div>
            </div>
        }

        if (this.props.owner === "change_password") {
            firstInput = <input
                id="old-password-id"
                name="old_password"
                type="password"
                className="form-control"
                value={this.state.old_password}
                onChange={event => this.handleOldPassword(event.target.value)}
                placeholder="Old Password" />;

            secondInput = <input
                id="new-password-id"
                name="new_password"
                type="password"
                className="form-input form-control"
                value={this.state.new_password}
                onChange={event => this.handleNewPassword(event.target.value)}
                placeholder="New Password" />;
        }
        else if (this.props.owner === "delete_shopping_list" || this.props.owner === "delete_shopping_list_item") {

        }
        else {
            if (this.props.owner === "add_shopping_list") {
                placeHolder = "Enter Title";
            }
            else if (this.props.owner === "add_shopping_list_item") {
                placeHolder = "Enter Name";
            }
            firstInput = <input
                id="first-input-id"
                name="first_input"
                type="text"
                className="form-control"
                value={this.state.first_input}
                onChange={event => this.handleFirstInput(event.target.value)}
                placeholder={placeHolder} />;
        }

        if (this.props.price) {
            secondInput = <input
                id="price_input"
                name="price"
                value={(this.state.price && this.state.price > 0 ? this.state.price : '')}
                onChange={event => this.handlePrice(event.target.value)}
                type="number"
                className="form-input form-control"
                placeholder="Enter Price" />
        }

        if (this.state.msg && this.state.msg_type) {
            snackBar = <SnackBar
                class={this.state.msg_type + "-snackbar"}
                message={this.state.msg} />;
        }

        if (this.state.showing) {
            return (
                <div className="card-modal" id="crud-div">
                    <div className="card crud-card drop-shadow">
                        <span className="close" onClick={this.closeModal}>&times;</span>
                        <h3 className="title crud-title">{this.props.title}</h3>
                        <form onSubmit={this.handleOnSubmit}>
                            {firstInput}
                            {secondInput}
                            {buttons}
                        </form>
                    </div>

                    {snackBar}
                </div>
            );
        }
        else if (snackBar) {
            return (
                snackBar
            );
        }
        else {
            return null;
        }
    }

    closeModal = (event) => {
        event.preventDefault();

        this.setState({ showing: false });
        if (this.props.showModal) {
            this.props.showModal(event);
        }
    }
}

export default Modal;