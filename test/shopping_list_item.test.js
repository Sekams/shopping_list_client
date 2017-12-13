import React from 'react';
import ShoppingListItem from '../src/components/shopping_list_item'

test("renders the shopping_list_item component", () => {
    const wrapper = shallow(
        <ShoppingListItem />
    );
    expect(wrapper).toMatchSnapshot();
});