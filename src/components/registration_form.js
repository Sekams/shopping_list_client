import React, { Component } from 'react';
import NavBar from './nav_bar'
import SnackBar from './snackbar'

class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        //msg_type can be 'danger' or 'success'
        this.state = {
            username: '',
            email: '',
            password: '',
            confirm_password: '',
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
    handleEmail(email) {
        this.setState({
            email: email,
            msg: ''
        });
    }
    handleConfirmPassword(confirm_password) {
        this.setState({
            confirm_password: confirm_password,
            msg: ''
        });
    }

    verifyEmail(email) {
        if (!(email.includes("@")) || !(email.split("@")[1].includes(".")) || (email.replace("@", "").includes("@")) || email.includes("@.")) {
            return false;
        }
        return true;
    }

    matchPasswords(password, confirm_password) {
        if (password === confirm_password) {
            return true;
        }
        return false
    }

    handleSignUp = (event) => {
        event.preventDefault();

        let signUpForm = this.state;
        let formData = new FormData();

        this.clearMessages();

        if (signUpForm.username && signUpForm.password && signUpForm.email && signUpForm.confirm_password) {
            formData.append('username', signUpForm.username);
            if (this.verifyEmail(signUpForm.email)) {
                formData.append('email', signUpForm.email);
                if (this.matchPasswords(signUpForm.password, signUpForm.confirm_password)) {
                    formData.append('password', signUpForm.password);
                    global.callAPI('/auth/register', "POST", formData)
                        .then((responseJson) => {

                            if (responseJson.status && responseJson.status === "success") {
                                this.setState({
                                    msg: responseJson.message,
                                    msg_type: 'success'
                                });
                                global.localStorage.setItem("message", responseJson.message);
                                global.localStorage.setItem("messageType", "success");
                                this.props.history.push('/login');
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
                        msg: 'Passwords don\'t match!',
                        msg_type: 'danger'
                    });
                }
            }
            else {
                this.setState({
                    msg: 'Invalid email address!',
                    msg_type: 'danger'
                });
            }
        }
        else {
            this.setState({
                msg: 'Please fill in all the fields',
                msg_type: 'danger'
            });
        }
    }

    clearMessages() {
        this.setState({
            msg: '',
            msg_type: ''
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
                    page='sign_up' />

                <div className="register-wrapper">
                    <div className="card register-card drop-shadow">
                        <h3 className="title">Sign Up</h3>
                        <form onSubmit={this.handleSignUp}>

                            <input
                                value={this.state.username}
                                type="text"
                                className="form-input form-control"
                                onChange={event => this.handleUsername(event.target.value)}
                                placeholder="Username" />

                            <input
                                value={this.state.email}
                                type="email"
                                className="form-input form-control"
                                onChange={event => this.handleEmail(event.target.value)}
                                placeholder="Email" />

                            <input
                                value={this.state.password}
                                type="password"
                                className="form-input form-control"
                                onChange={event => this.handlePassword(event.target.value)}
                                placeholder="Password" />

                            <input
                                value={this.state.confirm_password}
                                type="password"
                                className="form-input form-control"
                                onChange={event => this.handleConfirmPassword(event.target.value)}
                                placeholder="Confirm Password" />

                            <button type="submit" className="btn btn-form-submit">Finish</button>
                        </form>
                    </div>
                </div>

                {snackBar}
            </div>
        );
    }
}

export default RegistrationForm;