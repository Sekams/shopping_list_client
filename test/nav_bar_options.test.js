import React from 'react';
import NavBarOptions from '../src/components/nav_bar_options'

test("renders the nav_bar_options component", () => {
    const wrapper = shallow(
        <NavBarOptions />
    );
    expect(wrapper).toMatchSnapshot();
});