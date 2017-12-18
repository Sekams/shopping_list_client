import React from 'react';
import NavBarOptions from '../src/components/nav_bar_options'

test("renders the nav_bar_options component", () => {
    const wrapper = shallow(
        <NavBarOptions />
    );
    expect(wrapper).toMatchSnapshot();
});

test("calls the onSearchTermChanged", () => {
    const props = {
        onSearchTermChange: jest.fn(),
    };
    const wrapper = shallow(
        <NavBarOptions {...props} />
    );
    wrapper.props().children.map((child) => {
        child.props.onSearchTermChange();
    });
    expect(wrapper).toMatchSnapshot();
});