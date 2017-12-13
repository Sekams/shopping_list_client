import React from 'react';
import NavBar from '../src/components/nav_bar'

test("renders the nav_bar component", () => {
    const wrapper = shallow(
        <NavBar />
    );
    expect(wrapper).toMatchSnapshot();
});