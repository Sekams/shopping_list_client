import React from 'react';
import LoginForm from '../src/components/login_form'

test("renders the login_form component", () => {
    const wrapper = shallow(
        <LoginForm />
    );
    expect(wrapper).toMatchSnapshot();
});