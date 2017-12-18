import React from 'react';
import ShoppingList from '../src/components/shopping_list'

test("renders the shopping_list component", () => {
    const props = {
        logged_in: true,
        authorized: true,
        history: [],
    };
    const wrapper = shallow(
        <ShoppingList {...props} />
    );
    fetch.mockResponses(
        [JSON.stringify({
            "message": "Shopping List Items found.",
            "shoppingListItems": [
                {
                    "created_on": "Fri, 17 Nov 2017 22:45:29 GMT",
                    "id": 1,
                    "modified_on": "Sat, 18 Nov 2017 01:32:44 GMT",
                    "name": "Tomatoes",
                    "price": 120,
                    "shopping_list_id": 1,
                    "status": true
                }
            ],
            "status": "success",
            "total": 1
        }),
        {
            status: 200,
            ok: true
        }],
        [JSON.stringify({
            "message": "Shopping List Items found.",
            "shoppingListItems": [
                {
                    "created_on": "Fri, 17 Nov 2017 22:45:29 GMT",
                    "id": 1,
                    "modified_on": "Sat, 18 Nov 2017 01:32:44 GMT",
                    "name": "Tomatoes",
                    "price": 120,
                    "shopping_list_id": 1,
                    "status": true
                }
            ],
            "status": "success",
            "total": 1
        }),
        {
            status: 200,
            ok: true
        }]
    );
    wrapper.instance().getShoppingListItems();
    wrapper.instance().addShoppingListItem({ preventDefault() { } });
    wrapper.instance().editShoppingList({ preventDefault() { } });
    wrapper.instance().deleteShoppingList({ preventDefault() { } });
    wrapper.instance().showModal({ preventDefault() { } });
    wrapper.instance().showModal({ preventDefault() { } });
    expect(wrapper).toMatchSnapshot();
});

test("highlights searched lists", () => {
    global.localStorage.setItem("searchTerm", "Food");
    const props = {
        id: 1,
        title: 'Food',
    };
    const wrapper = shallow(
        <ShoppingList {...props} />
    );
    expect(wrapper).toMatchSnapshot();
    global.localStorage.setItem("searchTerm", "");
});

test("calls the functions on the modal", () => {
    const props = {
        id: 1,
        title: 'Food',
    };
    const wrapper = shallow(
        <ShoppingList {...props} />
    );
    wrapper.instance().showModal({ preventDefault() { } });
    wrapper.update();
    wrapper.props().children[3].props.clearMessages();
    wrapper.props().children[3].props.showModal({ preventDefault() { } });
    expect(wrapper).toMatchSnapshot();
});

test("calls the getShoppingListItems functions", () => {
    const props = {
        id: 1,
        title: 'Food',
    };
    const wrapper = shallow(
        <ShoppingList {...props} />
    );
    wrapper.instance().showModal({ preventDefault() { } });
    wrapper.update();
    wrapper.props().children[3].props.clearMessages();
    wrapper.props().children[3].props.showModal({ preventDefault() { } });
    expect(wrapper).toMatchSnapshot();
});

test("populates shopping lists", () => {
    fetch.mockResponseOnce(JSON.stringify(
        {
            "message": "Shopping List Items found.",
            "shoppingListItems": [
                {
                    "created_on": "Fri, 17 Nov 2017 22:45:29 GMT",
                    "id": 1,
                    "modified_on": "Sat, 18 Nov 2017 01:32:44 GMT",
                    "name": "Tomatoes",
                    "price": 120,
                    "shopping_list_id": 1,
                    "status": true
                },
                {
                    "created_on": "Fri, 17 Nov 2017 23:22:17 GMT",
                    "id": 5,
                    "modified_on": "Sat, 18 Nov 2017 01:32:48 GMT",
                    "name": "Bananas",
                    "price": 70,
                    "shopping_list_id": 1,
                    "status": true
                },
                {
                    "created_on": "Sat, 18 Nov 2017 01:58:56 GMT",
                    "id": 8,
                    "modified_on": "Sat, 18 Nov 2017 02:03:35 GMT",
                    "name": "Onions",
                    "price": 120,
                    "shopping_list_id": 1,
                    "status": true
                },
                {
                    "created_on": "Sat, 18 Nov 2017 02:00:04 GMT",
                    "id": 9,
                    "modified_on": "Sat, 18 Nov 2017 02:03:38 GMT",
                    "name": "Carrots",
                    "price": 40,
                    "shopping_list_id": 1,
                    "status": true
                },
                {
                    "created_on": "Sat, 18 Nov 2017 02:01:21 GMT",
                    "id": 11,
                    "modified_on": "Sat, 18 Nov 2017 02:18:47 GMT",
                    "name": "Rice",
                    "price": 800,
                    "shopping_list_id": 1,
                    "status": false
                },
                {
                    "created_on": "Sat, 18 Nov 2017 02:00:43 GMT",
                    "id": 10,
                    "modified_on": "Mon, 11 Dec 2017 11:39:22 GMT",
                    "name": "Meat",
                    "price": 350,
                    "shopping_list_id": 1,
                    "status": false
                }
            ],
            "status": "success",
            "total": 6
        }),
        {
            status: 200,
            ok: true
        });
    const props = {
        id: 1,
        title: 'Food',
    };
    const wrapper = shallow(
        <ShoppingList {...props} />
    );
    expect(wrapper).toMatchSnapshot();
});

test("catches fetch errors", () => {
    fetch.mockResponseOnce(JSON.stringify(
        {
            "message": "Shopping List Items not found.",
            "shoppingListItems": [],
            "status": "fail",
            "total": 0
        }),
        {
            status: 400,
            ok: false
        });
    const props = {
        id: 1,
        title: 'Food',
    };
    const wrapper = shallow(
        <ShoppingList {...props} />
    );
    expect(wrapper).toMatchSnapshot();
});

test("checks for component mounting", () => {
    const props = {
        id: 1,
        title: 'Food',
    };
    const wrapper = shallow(
        <ShoppingList {...props} />
    );
    wrapper.instance().componentWillUnmount();
    expect(wrapper).toMatchSnapshot();
});