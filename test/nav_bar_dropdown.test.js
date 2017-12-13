import React from 'react';
import NavBarDropdown from '../src/components/nav_bar_dropdown'

test("renders the nav_bar_dropdown component", () => {
    const wrapper = shallow(
        <NavBarDropdown />
    );
    expect(wrapper).toMatchSnapshot();
});