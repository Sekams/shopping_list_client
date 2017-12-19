import React from 'react';
import RegistrationForm from '../src/components/registration_form'

test("renders the registration_form component", () => {
    const wrapper = shallow(
        <RegistrationForm />
    );
    expect(wrapper).toMatchSnapshot();
});

test("handles inputs", () => {
    const term = 'food';
    const wrapper = shallow(
        <RegistrationForm />
    );
    wrapper.find('input').map((input) => {
        input.simulate(('change'), {
            target: { term },
        });
    });
    wrapper.instance().handleSignUp({ preventDefault() { } })
    expect(wrapper).toMatchSnapshot();
});

test("handles sign up", () => {
    const term = 'food';
    const props = {
        history: []
    }
    fetch.mockResponses(
        [JSON.stringify(
            {
                "message": "You registered successfully.",
                "status": "success",
            }),
        {
            status: 200,
            ok: true,
        }],
        [JSON.stringify(
            {
                "message": "Registration not yet processed.",
                "status": "fail",
            }),
        {
            status: 202,
            ok: true,
        }],
        [JSON.stringify(
            {
                "message": "Registration failed.",
                "status": "fail",
            }),
        {
            status: 400,
            ok: false,
        }]
    );
    const wrapper = shallow(
        <RegistrationForm {...props} />
    );
    wrapper.instance().setState({
        username: 'user',
        password: '123456',
        email: 'user@example.com',
        confirm_password: '123456'
    });
    wrapper.update();
    wrapper.instance().handleSignUp({ preventDefault() { } });
    wrapper.instance().handleSignUp({ preventDefault() { } });
    wrapper.instance().handleSignUp({ preventDefault() { } });
    wrapper.instance().setState({
        username: 'user',
        password: '123456',
        email: 'user@example.com',
        confirm_password: '12345'
    });
    wrapper.update();
    wrapper.instance().handleSignUp({ preventDefault() { } });
    wrapper.instance().setState({
        username: 'user',
        password: '123456',
        email: 'userexample.com',
        confirm_password: '123456'
    });
    wrapper.update();
    wrapper.instance().handleSignUp({ preventDefault() { } });
    wrapper.instance().setState({
        username: '',
        password: '123456',
        email: 'userexample.com',
        confirm_password: '123456'
    });
    wrapper.update();
    wrapper.instance().handleSignUp({ preventDefault() { } });
    expect(wrapper).toMatchSnapshot();
});