import React from 'react';
import ShoppingListItem from '../src/components/shopping_list_item'

test("renders the shopping_list_item component", () => {
    const wrapper = shallow(
        <ShoppingListItem />
    );
    expect(wrapper).toMatchSnapshot();
});

test("clears messages", () => {
    const wrapper = shallow(
        <ShoppingListItem />
    );
    wrapper.instance().clearMessages();
    expect(wrapper).toMatchSnapshot();
});

test("unmounts component", () => {
    const wrapper = shallow(
        <ShoppingListItem />
    );
    wrapper.instance().componentWillUnmount();
    expect(wrapper).toMatchSnapshot();
});

test("clicks anchors and shows modal", () => {
    const props = {
        id: 1,
        name: 'Cake',
        price: 200,
        status: false,
        shopping_list_id: 1,
        shopping_list_title: 'Food',
    };
    const wrapper = shallow(
        <ShoppingListItem {...props} />
    );
    wrapper.find('a').map((anchor) => {
        anchor.simulate('click', { preventDefault() {} });
    });
    wrapper.instance().showModal({ preventDefault() {} });
    wrapper.instance().showModal({ preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
});

test("highlights searched items", () => {
    global.localStorage.setItem("searchTerm", "Cake");
    const props = {
        id: 1,
        name: 'Cake',
        price: 200,
        status: false,
        shopping_list_id: 1,
        shopping_list_title: 'Food',
    };
    const wrapper = shallow(
        <ShoppingListItem {...props} />
    );
    expect(wrapper).toMatchSnapshot();
    global.localStorage.setItem("searchTerm", "");
});

test("calls methods on modal", () => {
    const props = {
        id: 1,
        name: 'Cake',
        price: 200,
        status: false,
        shopping_list_id: 1,
        shopping_list_title: 'Food',
    };
    const wrapper = shallow(
        <ShoppingListItem {...props} />
    );
    wrapper.instance().showModal({ preventDefault() {} });
    wrapper.update();
    wrapper.props().children[2].props.clearMessages();
    wrapper.props().children[2].props.showModal({ preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
});