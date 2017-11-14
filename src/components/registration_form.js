import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import NavBar from './nav_bar'
import SnackBar from './snackbar'

class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            authorized: false,
            logged_in: false,
            page: 'sign_up'
        };
    }

    render() {
        return (
            <div>
                <NavBar
                    username={this.state.username}
                    authorized={this.state.authorized}
                    logged_in={this.state.logged_in}
                    page={this.state.page} />

                <div className="register-wrapper">
                    <div className="card register-card drop-shadow">
                        <h3 className="title">Sign Up</h3>
                        <form id="sign_up_form_id" name="sign_up_form" action="/signup" method="post" className="register-form">

                            <input name="username" type="text" className="form-input form-control" placeholder="Username" />

                            <input name="email" type="email" className="form-input form-control" placeholder="Email" />

                            <input name="password" type="password" className="form-input form-control" placeholder="Password" />

                            <input name="confirm_password" type="password" className="form-input form-control" placeholder="Confirm Password" />

                            <Link to='/login'><button type="button" className="btn btn-form-submit">Finish</button></Link>
                        </form>
                    </div>
                </div>

                <SnackBar
                    class="success-snackbar"
                    message="Register Here" />
            </div>
        );
    }
}

export default RegistrationForm;