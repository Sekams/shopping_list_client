import React, { Component } from 'react';
import NavBar from './nav_bar'
import SnackBar from './snackbar'

class LoginForm extends Component {
    constructor(props) {
        super(props);

        //msg_type can be 'danger' or 'success'
        this.state = {
            username: '',
            password: '',
            msg: '',
            msg_type: ''
        };
    }

    handleUsername(username) {
        this.setState({
            username: username,
            msg: ''
        });
    }
    handlePassword(password) {
        this.setState({
            password: password,
            msg: ''
        });
    }

    handleLogin = (event) => {
        event.preventDefault();

        let loginForm = this.state;
        let formData = new FormData();

        if (loginForm.username && loginForm.password) {
            formData.append('username', loginForm.username);
            formData.append('password', loginForm.password);

            this.clearPassword();

            fetch(localStorage.getItem("baseUrl") + '/auth/login', {
                method: 'POST',
                body: formData
            })
                .then((response) => response.json())
                .then((responseJson) => {

                    this.clearMessages();

                    if (responseJson.status && responseJson.status === "success" && responseJson.access_token) {
                        this.setState({
                            msg: responseJson.message,
                            msg_type: 'success'
                        });
                        this.props.history.push('/');
                    } else {
                        this.setState({
                            msg: responseJson.message,
                            msg_type: 'danger'
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    clearMessages() {
        this.setState({
            msg: '',
            msg_type: ''
        });
    }

    clearPassword() {
        this.setState({
            password: ''
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
                <NavBar
                    page='login' />

                <div className="login-wrapper">
                    <div className="card login-card drop-shadow">
                        <h3 className="title">Login</h3>
                        <form onSubmit={this.handleLogin}>
                            <input
                                value={this.state.username}
                                type="text"
                                className="form-input form-control"
                                placeholder="Username"
                                onChange={event => this.handleUsername(event.target.value)} />

                            <input
                                value={this.state.password}
                                type="password"
                                className="form-input form-control"
                                placeholder="Password"
                                onChange={event => this.handlePassword(event.target.value)} />

                            <button className="btn btn-form-submit btn-login-submit" type="submit" >Login</button>
                        </form>
                    </div>
                </div>

                {snackBar}
            </div>
        );
    }
}

export default LoginForm;