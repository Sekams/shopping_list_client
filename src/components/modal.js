import React, { Component } from 'react';
import SnackBar from './snackbar';
import Spinner from './spinner';
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

    //Change component state according to the old password input
    handleOldPassword(old_password) {
        this.setState({
            old_password: old_password
        });
    }
    //Change component state according to the new password input
    handleNewPassword(new_password) {
        this.setState({
            new_password: new_password
        });
    }

    //Change component state according to the first input element
    handleFirstInput(first_input) {
        this.setState({
            first_input: first_input
        });
    }

    //Change component state according to the old password input
    handlePrice(price) {
        this.setState({
            price: price
        });
    }

    //Make appropriate API calls according to the submitted form
    handleOnSubmit = (event) => {

        //Handle change password form submission
        if (this.props.owner === "change_password") {
            this.changePassword(event);
        }
        //Handle add shopping list form submission
        else if (this.props.owner === "add_shopping_list") {
            this.addShoppingList(event);
        }
        //Handle add shopping list item form submission
        else if (this.props.owner === "add_shopping_list_item") {
            this.addShoppingListItem(event);
        }
        //Handle edit shopping list form submission
        else if (this.props.owner === "edit_shopping_list") {
            this.editShoppingList(event);
        }
        //Handle delete shopping list form submission
        else if (this.props.owner === "delete_shopping_list") {
            this.deleteShoppingList(event);
        }
        //Handle edit shopping list item form submission
        else if (this.props.owner === "edit_shopping_list_item") {
            this.editShoppingListItem(event);
        }
        //Handle delete shopping list item form submission
        else if (this.props.owner === "delete_shopping_list_item") {
            this.deleteShoppingListItem(event);
        }

        //Prevent function from refreshing
        event.preventDefault();
    }

    //Handle event for adding shopping lists
    addShoppingList = (event) => {
        event.preventDefault();

        if (this.state.first_input) {
            global.showSpinner(this);

            global.clearMessages(this);

            let addShoppingListFormData = new FormData();

            addShoppingListFormData.append("title", this.state.first_input);

            //Make API request to add a shopping list
            global.callAPI('/shoppinglists/', "POST", addShoppingListFormData)
                //Handle promise response
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
                        global.dismissSpinner(this);
                    } else {
                        this.setState({
                            msg: "Shopping List '" + addShoppingListFormData["title"] + "' Not Created",
                            msg_type: "danger",
                        });
                        global.dismissSpinner(this);
                    }
                })
                //Handle any error
                .catch((error) => {
                    this.setState({
                        msg: error.message,
                        msg_type: "danger"
                    });
                    global.dismissSpinner(this);
                });
        }
        else {
            this.setState({
                msg: "Please enter the 'Title'",
                msg_type: "danger"
            });
        }
    }

    //Handle event for editing shopping lists
    editShoppingList = (event) => {
        event.preventDefault();

        if (this.state.first_input) {
            global.showSpinner(this);

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
                        global.dismissSpinner(this);
                    } else {
                        this.setState({
                            msg: "Shopping List '" + this.props.first_input + "' Not Edited",
                            msg_type: "danger",
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
        else {
            this.setState({
                msg: "Please enter the 'Title'",
                msg_type: "danger"
            });
        }
    }

    //Handle event for deleting shopping lists
    deleteShoppingList = (event) => {
        global.showSpinner(this);

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
                    global.dismissSpinner(this);
                } else {
                    this.setState({
                        msg: responseJson.message,
                        msg_type: "danger",
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

    //Handle event for changing a password
    changePassword = (event) => {
        global.showSpinner(this);

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
        else {
            this.setState({
                msg: "Please fill all fields",
                msg_type: "danger",
                showing: true
            });
            global.dismissSpinner(this);
        }
    }

    //Handle event for adding shopping list items
    addShoppingListItem = (event) => {
        global.showSpinner(this);

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
                global.dismissSpinner(this);
            })
            .catch((error) => {
                this.setState({
                    msg: error.message,
                    msg_type: "danger"
                });
                global.dismissSpinner(this);
            });
    };

    //Handle event for editing shopping list items
    editShoppingListItem = (event) => {
        event.preventDefault();

        if (this.state.first_input && this.state.price) {
            global.showSpinner(this);

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
                        global.dismissSpinner(this);
                    } else {
                        this.setState({
                            msg: responseJson.message,
                            msg_type: "danger",
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
        else {
            this.setState({
                msg: "Please fill all fields",
                msg_type: "danger"
            });
        }
    };

    //Handle event for deleting shopping list items
    deleteShoppingListItem = (event) => {
        global.showSpinner(this);

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
                    global.dismissSpinner(this);
                } else {
                    this.setState({
                        msg: responseJson.message,
                        msg_type: "danger",
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

    render() {
        let buttons, firstInput, secondInput, snackBar, placeHolder = null;

        //Render single submit button
        if (this.props.create || this.props.owner === "change_password") {
            buttons = <button className="btn btn-form-submit btn-modal-form-submit" type="submit">Save</button>;
        }
        //Render two buttons
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
    
        //Render two input fields
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
        // Render no inputs when deleting
        else if (this.props.owner === "delete_shopping_list" || this.props.owner === "delete_shopping_list_item") {

        }
        //Render single input
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

        //Render input for digits
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

        //Render Snackbar if there are messages to show
        if (this.state.msg && this.state.msg_type) {
            snackBar = <SnackBar
                class={this.state.msg_type + "-snackbar"}
                message={this.state.msg} />;
        }

        //Render modal if it is required
        if (this.state.showing) {
            return (
                <div className="card-modal" id="crud-div">

                    <Spinner ref={(spinner) => { this._spinner = spinner; }} />

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

    //Handle the event of removing the modal from view
    closeModal = (event) => {
        event.preventDefault();

        this.setState({ showing: false });
        if (this.props.showModal) {
            this.props.showModal(event);
        }
    }
}

export default Modal;