import React, { Component } from 'react';
import NavBar from './nav_bar';
import SnackBar from './snackbar';
import Spinner from './spinner';

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

    //Change state username according to the username input
    handleUsername(username) {
        this.setState({
            username: username,
            msg: ''
        });
    }
    //Change state password according to the password input
    handlePassword(password) {
        this.setState({
            password: password,
            msg: ''
        });
    }
    //Change state email according to the email input
    handleEmail(email) {
        this.setState({
            email: email,
            msg: ''
        });
    }
    //Change state confirm password according to the confirm password input
    handleConfirmPassword(confirm_password) {
        this.setState({
            confirm_password: confirm_password,
            msg: ''
        });
    }

    //Check that an email address is valid
    verifyEmail(email) {
        if (!(email.includes("@")) || !(email.split("@")[1].includes(".")) || (email.replace("@", "").includes("@")) || email.includes("@.")) {
            return false;
        }
        return true;
    }

    //Check that 2 passwords match
    matchPasswords(password, confirm_password) {
        if (password === confirm_password) {
            return true;
        }
        return false
    }

    //Handle the event of signing up
    handleSignUp = (event) => {
        global.showSpinner(this);

        event.preventDefault();

        let signUpForm = this.state;
        let formData = new FormData();

        global.clearMessages(this);

        if (signUpForm.username && signUpForm.password && signUpForm.email && signUpForm.confirm_password) {
            formData.append('username', signUpForm.username);
            if (this.verifyEmail(signUpForm.email)) {
                formData.append('email', signUpForm.email);
                if (this.matchPasswords(signUpForm.password, signUpForm.confirm_password)) {
                    formData.append('password', signUpForm.password);
                    //Make an HTTP request to the API to register a user
                    global.callAPI('/auth/register', "POST", formData)
                        //Handle promise response
                        .then((responseJson) => {

                            if (responseJson.status && responseJson.status === "success") {
                                this.setState({
                                    msg: responseJson.message,
                                    msg_type: 'success'
                                });
                                global.localStorage.setItem("message", responseJson.message);
                                global.localStorage.setItem("messageType", "success");
                                this.props.history.push('/login');
                                global.dismissSpinner(this);
                            } else {
                                this.setState({
                                    msg: responseJson.message,
                                    msg_type: 'danger'
                                });
                                global.dismissSpinner(this);
                            }
                        })
                        //Handle errors
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
                        msg: 'Passwords don\'t match!',
                        msg_type: 'danger'
                    });
                    global.dismissSpinner(this);
                }
            }
            else {
                this.setState({
                    msg: 'Invalid email address!',
                    msg_type: 'danger'
                });
                global.dismissSpinner(this);
            }
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

        //Render Snackbar if there are any messages
        if (this.state.msg && this.state.msg_type) {
            snackBar = <SnackBar
                class={this.state.msg_type + "-snackbar"}
                message={this.state.msg} />;
        }

        return (
            <div>
                <NavBar
                    page='sign_up' />

                <Spinner ref={(spinner) => { this._spinner = spinner; }} />

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