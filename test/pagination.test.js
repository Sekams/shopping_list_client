import React from 'react';
import Pagination from '../src/components/pagination'

test("renders the pagination component", () => {
    const wrapper = shallow(
        <Pagination />
    );
    expect(wrapper).toMatchSnapshot();
});