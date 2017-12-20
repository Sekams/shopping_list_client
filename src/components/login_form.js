import React, { Component } from 'react';
import NavBar from './nav_bar';
import SnackBar from './snackbar';
import Spinner from './spinner';

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

    //Change component state according to the username input
    handleUsername(username) {
        this.setState({
            username: username
        });
    }

    //Change component state according to the password input
    handlePassword(password) {
        this.setState({
            password: password
        });
    }

    //Send login infomation to the API
    handleLogin = (event) => {
        global.showSpinner(this);

        event.preventDefault();

        let loginForm = this.state;
        let formData = new FormData();

        global.clearMessages(this);

        if (loginForm.username && loginForm.password) {
            //Populate formdata with the credentials
            formData.append('username', loginForm.username);
            formData.append('password', loginForm.password);

            //Make API request to login
            global.callAPI('/auth/login', "POST", formData)
                //Handle promise response
                .then((responseJson) => {
                    if (responseJson.status && responseJson.status === "success" && responseJson.access_token) {
                        this.setState({
                            msg: responseJson.message,
                            msg_type: 'success'
                        });
                        global.dismissSpinner(this);
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
                        global.dismissSpinner(this);
                    }
                })
                //Handle any error
                .catch((error) => {
                    this.setState({
                        msg: error.message,
                        msg_type: 'danger'
                    });
                    global.dismissSpinner(this);
                });
        }
        else {
            this.setState({
                msg: 'Please fill in all the fields',
                msg_type: 'danger'
            });
            global.dismissSpinner(this);
        }
    }

    render() {
        let snackBar = null;

        //Render snackbar if there are any messages
        if (this.state.msg && this.state.msg_type) {
            snackBar = <SnackBar
                class={this.state.msg_type + "-snackbar"}
                message={this.state.msg} />;
        }

        return (
            <div>
                <NavBar
                    page='login' />

                <Spinner ref={(spinner) => { this._spinner = spinner; }} />

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