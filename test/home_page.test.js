import React, { Children } from 'react';
import HomePage from '../src/components/home_page'

test("renders the home_page component", () => {
    global.localStorage.setItem("accessToken", '');
    const props = {
        logged_in: true,
        authorized: true,
        page: 'home',
        history: [],
    };
    const wrapper = shallow(
        <HomePage {...props} />
    );
    expect(wrapper).toMatchSnapshot();
    global.localStorage.setItem("accessToken", 'wjcnejcnejncec');
});

test("handles authorization", () => {
    const props = {
        page: 'home',
        history: [],
    };
    const wrapper = shallow(
        <HomePage {...props} />
    );
    expect(wrapper).toMatchSnapshot();
});

test("handles all click events", () => {
    const props = {
        logged_in: true,
        authorized: true,
        page: 'home',
        history: [],
    };
    const wrapper = shallow(
        <HomePage {...props} />
    );
    wrapper.find('a').map((anchor) => {
        anchor.simulate('click', { preventDefault() { } });
    });
    wrapper.instance().showModal({ preventDefault() { } });
    wrapper.instance().showModal({ preventDefault() { } });
    expect(wrapper).toMatchSnapshot();
});

test("calls onSearchTerm on the NavBar", () => {
    const props = {
        logged_in: true,
        authorized: true,
        page: 'home',
        history: [],
    };
    const wrapper = shallow(
        <HomePage {...props} />
    );
    wrapper.props().children[0].props.onSearchTermChange();
    expect(wrapper).toMatchSnapshot();
});

test("calls showModal and clearMessages on the Modal", () => {
    const props = {
        logged_in: true,
        authorized: true,
        page: 'home',
        history: [],
    };
    const wrapper = shallow(
        <HomePage {...props} />
    );
    wrapper.instance().showModal({ preventDefault() { } });
    wrapper.update();
    wrapper.props().children[4].props.clearMessages();
    wrapper.props().children[4].props.showModal({ preventDefault() { } });
    expect(wrapper).toMatchSnapshot();
});

test("renders shopping lists", () => {
    fetch.mockResponseOnce(JSON.stringify(
        {
            "message": "Shopping lists found",
            "shoppingLists": [
                {
                    "created_on": "Fri, 17 Nov 2017 22:45:13 GMT",
                    "id": 1,
                    "modified_on": "Fri, 17 Nov 2017 22:45:13 GMT",
                    "title": "Groceries",
                    "user_id": 1
                },
                {
                    "created_on": "Fri, 17 Nov 2017 22:45:42 GMT",
                    "id": 2,
                    "modified_on": "Fri, 17 Nov 2017 22:45:42 GMT",
                    "title": "Food",
                    "user_id": 1
                }
            ],
            "status": "success",
            "total": 2
        }),
        {
            status: 200,
            ok: true
        }
    );
    const lists = [
        {
            "created_on": "Fri, 17 Nov 2017 22:45:13 GMT",
            "id": 1,
            "modified_on": "Fri, 17 Nov 2017 22:45:13 GMT",
            "title": "Groceries",
            "user_id": 1
        },
        {
            "created_on": "Fri, 17 Nov 2017 22:45:42 GMT",
            "id": 2,
            "modified_on": "Fri, 17 Nov 2017 22:45:42 GMT",
            "title": "Food",
            "user_id": 1
        }
    ];
    const props = {
        logged_in: true,
        authorized: true,
        page: 'home',
        history: [],
    };
    const wrapper = shallow(
        <HomePage {...props} />
    );
    wrapper.instance().onChangePage(lists);
    wrapper.update();
    wrapper.props().children[1].props.children.props.children[0].props.clearMessages();
    expect(wrapper).toMatchSnapshot();
});

test("calls onSearchTermChange on the Modal", () => {
    fetch.mockResponses(
        [
            JSON.stringify({ 
                "message": "Shopping Lists found.",
                "shoppingLists": [
                    {
                        "created_on": "Fri, 17 Nov 2017 22:45:42 GMT",
                        "id": 2,
                        "modified_on": "Fri, 17 Nov 2017 22:45:42 GMT",
                        "title": "Food",
                        "user_id": 1
                    }
                ],
                "status": "success",
                "total": 1
            }), 
            { status: 200 }
        ],
        [
            JSON.stringify({ 
                "message": "Shopping Lists found.",
                "shoppingLists": [
                    {
                        "created_on": "Fri, 17 Nov 2017 22:45:42 GMT",
                        "id": 2,
                        "modified_on": "Fri, 17 Nov 2017 22:45:42 GMT",
                        "title": "Food",
                        "user_id": 1
                    }
                ],
                "status": "success",
                "total": 1
            }), 
            { status: 200 }
        ],
        [
            JSON.stringify({ 
                "message": "Shopping List Items found.",
                "shoppingListItems": [
                    {
                        "created_on": "Tue, 12 Dec 2017 08:37:05 GMT",
                        "id": 47,
                        "modified_on": "Tue, 12 Dec 2017 08:37:05 GMT",
                        "name": "Fidget Spinner",
                        "price": 500,
                        "shopping_list_id": 15,
                        "status": false
                    }
                ],
                "status": "success",
                "total": 1
            }), 
            { status: 200 },
        ],
        [
            JSON.stringify({ 
                "message": "Shopping List found.",
                "shoppingList": {
                    "created_on": "Mon, 20 Nov 2017 07:05:13 GMT",
                    "id": 15,
                    "modified_on": "Mon, 20 Nov 2017 07:49:21 GMT",
                    "title": "Toys",
                    "user_id": 1
                },
                "status": "success"
            }), 
            { status: 200 }
        ]
    )
    fetch.mockResponseOnce(
        
    )

    const props = {
        logged_in: true,
        authorized: true,
        page: 'home',
        history: [],
    };
    const wrapper = shallow(
        <HomePage {...props} />
    );
    wrapper.instance().onSearchTermChange("f");
    wrapper.update();
    // wrapper.props().children[4].props.clearMessages();
    // wrapper.props().children[4].props.showModal({ preventDefault() { } });
    expect(wrapper).toMatchSnapshot();
});