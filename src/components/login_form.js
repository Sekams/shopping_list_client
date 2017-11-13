import React from 'react';

const LoginForm = (props) => {
    return (
        <div className="login-wrapper">
            <div className="card login-card drop-shadow">
                <h3 className="title">Login</h3>
                <form id="login_form_id" name="login_form" action="/login" method="post" className="register-form">
                    <input name="username" type="text" className="form-input form-control" placeholder="Username" />

                    <input name="password" type="password" className="form-input form-control" placeholder="Password"/>

                    <button className="btn btn-form-submit btn-login-submit" type="button" >Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;