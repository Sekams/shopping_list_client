import React from 'react';
import ShoppingList from '../src/components/shopping_list'
import MockRouter from 'react-mock-router';

test("renders the shopping_list component", () => {
    const wrapper = shallow(
        <MockRouter>
            <ShoppingList />
        </MockRouter>
    );
    expect(wrapper).toMatchSnapshot();
});