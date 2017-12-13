import React from 'react';
import NavBarOptionItem from '../src/components/nav_bar_option_item'

test("renders the nav_bar_option_item component", () => {
    const wrapper = shallow(
        <NavBarOptionItem />
    );
    expect(wrapper).toMatchSnapshot();
});