import React from 'react';

const RegistrationForm = (props) => {
    return (
        <div className="register-wrapper">
        <div className="card register-card drop-shadow">
            <h3 className="title">Sign Up</h3>
            <form id="sign_up_form_id" name="sign_up_form" action="/signup" method="post" className="register-form">
                
                <input name="username" type="text" className="form-input form-control" placeholder="Username"/>

                <input name="email" type="email" className="form-input form-control" placeholder="Email"/>

                <input name="password" type="password" className="form-input form-control" placeholder="Password"/>

                <input name="confirm_password" type="password" className="form-input form-control" placeholder="Confirm Password"/>

                <button type="button" className="btn btn-form-submit">Finish</button>
            </form>
        </div>
    </div>
    );
}

export default RegistrationForm;