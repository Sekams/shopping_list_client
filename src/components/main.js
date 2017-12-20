import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LoginFrom from './login_form'
import RegistrationForm from './registration_form'
import HomePage from './home_page'

const Main = () => (
    <main role="main">
        {/* Handle all the routes that are in the application*/}
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/login' component={LoginFrom} />
            <Route path='/register' component={RegistrationForm} />
        </Switch>
    </main>
)

export default Main;