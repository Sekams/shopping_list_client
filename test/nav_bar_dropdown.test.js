import React from 'react';
import NavBarDropdown from '../src/components/nav_bar_dropdown'

test("renders the nav_bar_dropdown component", () => {
    const wrapper = shallow(
        <NavBarDropdown />
    );
    expect(wrapper).toMatchSnapshot();
});

test("renders dropdown for changing password", () => {
    const term = 'food';
    const props = {
        owner: 'change_password',
    };
    const wrapper = shallow(
        <NavBarDropdown {...props} />
    );
    expect(wrapper).toMatchSnapshot();
});

test("renders dropdown for setting page limit", () => {
    const term = 'food';
    const props = {
        owner: 'page_limit',
    };
    const wrapper = shallow(
        <NavBarDropdown {...props} />
    );
    expect(wrapper).toMatchSnapshot();
});

test("calls showModal function", () => {
    const term = 'food';
    const props = {
        showModal: jest.fn(),
        owner: 'change_password',
    };
    const wrapper = shallow(
        <NavBarDropdown {...props} />
    );
    wrapper.find('a').simulate('click', { preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
});

test("calls setLimit functions", () => {
    const term = 'food';
    const props = {
        setPageLimit: jest.fn(),
        owner: 'page_limit',
    };
    const wrapper = shallow(
        <NavBarDropdown {...props} />
    );
    wrapper.find('a').map((anchor) => {
        anchor.simulate('click');
    });
    expect(wrapper).toMatchSnapshot();
});