import React from 'react';
import SearchBar from '../src/components/search_bar'

test("renders the search_bar component", () => {
    const wrapper = shallow(
        <SearchBar />
    );
    expect(wrapper).toMatchSnapshot();
});