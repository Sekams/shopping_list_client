import React, { Component } from 'react';
import SnackBar from './snackbar'

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

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        } else {
            return response.json().then((responseJSON) => {
                throw responseJSON;
            })
        }
    }

    clearMessages = () => {
        this.setState({
            msg: '',
            msg_type: ''
        });
    }

    onInputChange(event, status) {
        this.setState({ status });
        this.toggleItemStatus(event);
    }

    toggleItemStatus = (event) => {

        this.clearMessages();

        let editShoppingListItemFormData = new FormData();

        editShoppingListItemFormData.append("new_name", this.state.name);
        editShoppingListItemFormData.append("new_price", this.state.price);
        editShoppingListItemFormData.append("new_status", !this.state.status);

        fetch(global.localStorage.getItem("baseUrl") + '/shoppinglists/' + this.state.shopping_list_id + "/items/" + this.state.id, {
            method: 'PUT',
            body: editShoppingListItemFormData,
            headers: {
                "Authorization": "Bearer " + global.localStorage.getItem("accessToken")
            }
        })
            .then(this.checkStatus)
            .then((responseJson) => {
                if (responseJson.status && responseJson.status === "success") {
                    this.setState({
                        msg: "Shopping List Item '" + responseJson.shoppingListItem.name + "' successfully " + (responseJson.shoppingListItem.status ? "checked" : "unchecked"),
                        msg_type: "success",
                        showing: false
                    });
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

        event.preventDefault();
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