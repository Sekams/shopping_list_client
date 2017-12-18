import React from 'react';
import Main from '../src/components/main'

test("renders the main component", () => {
    const wrapper = shallow(
        <Main />
    );
    expect(wrapper).toMatchSnapshot();
});