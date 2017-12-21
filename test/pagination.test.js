import React from 'react';
import Pagination from '../src/components/pagination'
import HomePage from '../src/components/home_page'

test("renders the pagination component", () => {
    global.localStorage.setItem("pageLimit", 6);
    global.localStorage.setItem("searchTerm", "f");
    const home_page = shallow(
        <HomePage {...{ history: [] }} />
    );
    const props = {
        items: [1, 2, 3, 4, 5, 6],
        total_items: 16,
        onChangePage: jest.fn(),
        home_component: home_page.instance()
    }
    const wrapper = shallow(
        <Pagination {...props} />
    );
    expect(wrapper).toMatchSnapshot();
});

test("handle all clicks", () => {
    global.localStorage.setItem("pageLimit", 6);
    global.localStorage.setItem("searchTerm", "");
    const home_page = shallow(
        <HomePage {...{ history: [] }} />
    );
    const props = {
        items: [1, 2, 3, 4, 5, 6],
        total_items: 16,
        onChangePage: jest.fn(),
        home_component: home_page.instance()
    }
    const wrapper = shallow(
        <Pagination {...props} />
    );
    wrapper.find('a').map((anchor) => {
        anchor.simulate('click', { preventDefault() { } });
    });
    expect(wrapper).toMatchSnapshot();
});

test("handles no pages", () => {
    global.localStorage.setItem("pageLimit", 6);
    global.localStorage.setItem("searchTerm", "");
    const home_page = shallow(
        <HomePage {...{ history: [] }} />
    );
    const props = {
        items: [1, 2, 3],
        total_items: 3,
        onChangePage: jest.fn(),
        home_component: home_page.instance()
    }
    const wrapper = shallow(
        <Pagination {...props} />
    );
    expect(wrapper).toMatchSnapshot();
});

test("handle all clicks", () => {
    global.localStorage.setItem("pageLimit", 6);
    global.localStorage.setItem("searchTerm", "");
    const home_page = shallow(
        <HomePage {...{ history: [] }} />
    );
    const props = {
        items: [1, 2, 3, 4, 5, 6],
        total_items: 16,
        onChangePage: jest.fn(),
        home_component: home_page.instance()
    }
    const wrapper = shallow(
        <Pagination {...props} />
    );
    wrapper.find('a').map((anchor) => {
        anchor.simulate('click', { preventDefault() { } });
    });
    expect(wrapper).toMatchSnapshot();
});

test("handle pages", () => {
    global.localStorage.setItem("pageLimit", 1);
    global.localStorage.setItem("searchTerm", "");
    const home_page = shallow(
        <HomePage {...{ history: [] }} />
    );
    const props = {
        items: [1, 2, 3, 4, 5, 6],
        total_items: 16,
        onChangePage: jest.fn(),
        home_component: home_page.instance()
    }
    const wrapper = shallow(
        <Pagination {...props} />
    );
    wrapper.find('a').map((anchor) => {
        anchor.simulate('click', { preventDefault() { } });
    });
    expect(wrapper).toMatchSnapshot();
});

test("handle pages", () => {
    global.localStorage.setItem("pageLimit", 1);
    global.localStorage.setItem("searchTerm", "");
    const home_page = shallow(
        <HomePage {...{ history: [] }} />
    );
    const props = {
        items: [4, 5, 6],
        total_items: 16,
        onChangePage: jest.fn(),
        home_component: home_page.instance()
    }
    const wrapper = shallow(
        <Pagination {...props} />
    );
    const prevProps = {
        items: [1, 2, 3],
        total_items: 16,
        onChangePage: jest.fn(),
        home_component: home_page.instance()
    }
    wrapper.instance().componentDidUpdate(prevProps, wrapper.instance().state);
    expect(wrapper).toMatchSnapshot();
});

test("handle fetch", () => {
    global.localStorage.setItem("pageLimit", 6);
    global.localStorage.setItem("searchTerm", "");
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
            JSON.stringify(
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
        ]
    );
    const home_page = shallow(
        <HomePage {...{ history: [] }} />
    );
    const props = {
        items: [4, 5, 6],
        total_items: 16,
        onChangePage: jest.fn(),
        home_component: home_page.instance()
    }
    const wrapper = shallow(
        <Pagination {...props} />
    );
    expect(wrapper).toMatchSnapshot();
});