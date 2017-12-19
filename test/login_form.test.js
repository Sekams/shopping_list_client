import React from 'react';
import LoginForm from '../src/components/login_form'

test("renders the login_form component", () => {
    const wrapper = shallow(
        <LoginForm />
    );
    expect(wrapper).toMatchSnapshot();
});

test("handles inputs", () => {
    const term = 'food';
    const wrapper = shallow(
        <LoginForm />
    );
    wrapper.find('input').map((input) => {
        input.simulate(('change'), {
            target: { term },
        });
    });
    wrapper.instance().handleLogin({ preventDefault() {} })
    expect(wrapper).toMatchSnapshot();
});

test("handles login", () => {
    const term = 'food';
    fetch.mockResponseOnce(JSON.stringify(
        {
            "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTM3MDc0OTEsImlhdCI6MTUxMzYyMTA5MSwic3ViIjoxfQ.9jyOGbBDTYmcvWELtmZetXyn3euOBQGVLnnKog9lbUs",
            "message": "You logged in successfully.",
            "status": "success",
        }),
        {
            status: 200,
            ok: true,
        }
    );
    const wrapper = shallow(
        <LoginForm />
    );
    wrapper.instance().setState({
        username: 'user',
        password: '123456'
    });
    wrapper.update();
    wrapper.instance().handleLogin({ preventDefault() {} })
    expect(wrapper).toMatchSnapshot();
});

test("handles unsuccessful login", () => {
    const term = 'food';
    fetch.mockResponseOnce(JSON.stringify(
        {
            "message": "Login not successful.",
            "status": "fail",
        }),
        {
            status: 200,
            ok: true,
        }
    );
    const wrapper = shallow(
        <LoginForm />
    );
    wrapper.instance().setState({
        username: 'user',
        password: '123456'
    });
    wrapper.update();
    wrapper.instance().handleLogin({ preventDefault() {} })
    expect(wrapper).toMatchSnapshot();
});