import React from 'react';
import NavBarOptionItem from '../src/components/nav_bar_option_item'

test("renders the nav_bar_option_item component", () => {
    const wrapper = shallow(
        <NavBarOptionItem />
    );
    expect(wrapper).toMatchSnapshot();
});

test("renders the nav bar option items for the home page", () => {
    const props = {
        logged_in: true,
        authorized: true,
        page: 'home',
        name: 'search',
        onSearchTermChange: jest.fn(),
    };
    const wrapper = shallow(
        <NavBarOptionItem {...props} />
    );
    wrapper.find('a').map((anchor) => {
        anchor.simulate('click', { preventDefault() { } });
    });
    wrapper.props().children[0].props.children.props.onSearchTermChange();
    wrapper.props().children[1].props.children[1].props.setPageLimit();
    wrapper.props().children[1].props.children[1].props.showModal({ preventDefault() { } })
    expect(wrapper).toMatchSnapshot();
});

test("renders the nav bar option items for the home page greeting", () => {
    const props = {
        logged_in: true,
        authorized: true,
        page: 'home',
        name: 'greeting',
        username: 'atom',
    };
    const wrapper = shallow(
        <NavBarOptionItem {...props} />
    );
    wrapper.instance().showModal({ preventDefault() { } });
    wrapper.update();
    wrapper.find('a').map((anchor) => {
        anchor.simulate('click', { preventDefault() { } });
    });
    expect(wrapper).toMatchSnapshot();
});

test("renders the nav bar option items for the home page logout", () => {
    const props = {
        logged_in: true,
        authorized: true,
        page: 'home',
        name: 'link',
    };
    const wrapper = shallow(
        <NavBarOptionItem {...props} />
    );
    wrapper.find('a').map((anchor) => {
        anchor.simulate('click', { preventDefault() { } });
    });
    expect(wrapper).toMatchSnapshot();
});

test("renders the nav bar option items for the sign up page", () => {
    const props = {
        logged_in: true,
        authorized: true,
        page: 'sign_up',
        name: 'link',
    };
    const wrapper = shallow(
        <NavBarOptionItem {...props} />
    );
    expect(wrapper).toMatchSnapshot();
});

test("renders the nav bar option items for the login page", () => {
    const props = {
        logged_in: true,
        authorized: true,
        page: 'login',
        name: 'link',
    };
    const wrapper = shallow(
        <NavBarOptionItem {...props} />
    );
    expect(wrapper).toMatchSnapshot();
});

test("renders the nav bar option items for the home page logout", () => {
    fetch.mockResponseOnce(JSON.stringify(
        {
            "message": "You successfully logged out.",
            "status": "success",
        }),
        {
            status: 200,
            ok: true,
        }
    );
    const props = {
        logged_in: true,
        authorized: true,
        page: 'home',
        name: 'link',
    };
    const wrapper = shallow(
        <NavBarOptionItem {...props} />
    );
    wrapper.find('a').map((anchor) => {
        anchor.simulate('click', { preventDefault() { } });
    });
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
});