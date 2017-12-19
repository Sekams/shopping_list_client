import React, { Component } from 'react';
import SnackBar from './snackbar'
import Spinner from './spinner'
require("../utils/helpers");

class CheckBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: props.name,
            price: props.price,
            status: props.status,
            shopping_list_id: props.shopping_list_id,
            msg: '',
            msg_type: ''
        };
    }

    onInputChange(event, status) {
        this.setState({ status: status });
        this.toggleItemStatus(event);
    }

    toggleItemStatus = (event) => {
        global.showSpinner(this);

        global.clearMessages(this);

        let editShoppingListItemFormData = new FormData();

        editShoppingListItemFormData.append("new_name", this.state.name);
        editShoppingListItemFormData.append("new_price", this.state.price);
        editShoppingListItemFormData.append("new_status", !this.state.status);

        global.callAPI('/shoppinglists/' + this.state.shopping_list_id + "/items/" + this.state.id, "PUT", editShoppingListItemFormData)
            .then((responseJson) => {
                if (responseJson.status && responseJson.status === "success") {
                    this.setState({
                        msg: "Shopping List Item '" + responseJson.shoppingListItem.name + "' successfully " + (responseJson.shoppingListItem.status ? "checked" : "unchecked"),
                        msg_type: "success",
                        showing: false
                    });
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
        let snackBar = null;

        if (this.state.msg && this.state.msg_type) {
            snackBar = <SnackBar
                class={this.state.msg_type + "-snackbar"}
                message={this.state.msg} />;
        }

        return (
            <div>
                <Spinner ref={(spinner) => { this._spinner = spinner; }} />
                <input
                    id={this.props.id}
                    type="checkbox"
                    checked={this.state.status}
                    onChange={event => this.onInputChange(event, event.target.checked)} />
                {snackBar}
            </div>
        );
    }
}

export default CheckBox;