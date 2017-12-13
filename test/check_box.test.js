import React from 'react';
import CheckBox from '../src/components/check_box'

test("renders the check_box component", () => {
    const wrapper = shallow(
        <CheckBox />
    );
    expect(wrapper).toMatchSnapshot();
});