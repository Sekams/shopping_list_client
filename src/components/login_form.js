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
            msg: global.localStorage.getItem("message"),
            msg_type: global.localStorage.getItem("messageType")
        };
    }

    handleUsername(username) {
        this.setState({
            username: username
        });
    }
    handlePassword(password) {
        this.setState({
            password: password
        });
    }

    handleLogin = (event) => {
        event.preventDefault();

        let loginForm = this.state;
        let formData = new FormData();

        global.clearMessages(this);

        if (loginForm.username && loginForm.password) {
            formData.append('username', loginForm.username);
            formData.append('password', loginForm.password);

            global.callAPI('/auth/login', "POST", formData)
                .then((responseJson) => {
                    if (responseJson.status && responseJson.status === "success" && responseJson.access_token) {
                        this.setState({
                            msg: responseJson.message,
                            msg_type: 'success'
                        });
                        global.localStorage.setItem("accessToken", responseJson.access_token);
                        global.localStorage.setItem("username", loginForm.username);
                        global.localStorage.setItem("loggedIn", true);
                        global.localStorage.setItem("message", responseJson.message);
                        global.localStorage.setItem("messageType", "success");
                        this.props.history.push('/');
                    } else {
                        this.setState({
                            msg: responseJson.message,
                            msg_type: 'danger'
                        });
                    }
                })
                .catch((error) => {
                });
        }
        else {
            this.setState({
                msg: 'Please fill in all the fields',
                msg_type: 'danger'
            });
        }
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