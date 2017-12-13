import React from 'react';
import HomePage from '../src/components/home_page'
import MockRouter from 'react-mock-router';

test("renders the home_page component", () => {
    const wrapper = shallow(
        <MockRouter>
            <HomePage />
        </MockRouter>
    );
    expect(wrapper).toMatchSnapshot();
});