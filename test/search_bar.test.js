import React from 'react';
import SearchBar from '../src/components/search_bar'

test("renders the search_bar component", () => {
    const wrapper = shallow(
        <SearchBar />
    );
    expect(wrapper).toMatchSnapshot();
});

test("calls the onChanged function", () => {
    const term = 'food';
    const props = {
        onSearchTermChange: jest.fn(),
    };
    const wrapper = shallow(
        <SearchBar {...props} />
    );
    wrapper.find('input').simulate(('change'), {
        target: { term },
    });
    expect(wrapper).toMatchSnapshot();
});