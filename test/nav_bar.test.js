import React from 'react';
import NavBar from '../src/components/nav_bar'

test("renders the nav_bar component", () => {
    const wrapper = shallow(
        <NavBar />
    );
    expect(wrapper).toMatchSnapshot();
});

test("calls the onSearchTermChanged", () => {
    const props = {
        onSearchTermChange: jest.fn(),
    };
    const wrapper = shallow(
        <NavBar {...props} />
    );
    wrapper.props().children.props.children[1].props.children.props.onSearchTermChange()
    expect(wrapper).toMatchSnapshot();
});