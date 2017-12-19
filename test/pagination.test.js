import React from 'react';
import Pagination from '../src/components/pagination'

test("renders the pagination component", () => {
    global.localStorage.setItem("pageLimit", 6);
    global.localStorage.setItem("searchTerm", "f");
    const props = {
        items: [1, 2, 3, 4, 5, 6],
        total_items: 16,
        onChangePage: jest.fn()
    }
    const wrapper = shallow(
        <Pagination {...props} />
    );
    expect(wrapper).toMatchSnapshot();
});

test("handle all clicks", () => {
    global.localStorage.setItem("pageLimit", 6);
    global.localStorage.setItem("searchTerm", "");
    const props = {
        items: [1, 2, 3, 4, 5, 6],
        total_items: 16,
        onChangePage: jest.fn()
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
    const props = {
        items: [1, 2, 3],
        total_items: 3,
        onChangePage: jest.fn()
    }
    const wrapper = shallow(
        <Pagination {...props} />
    );
    expect(wrapper).toMatchSnapshot();
});

test("handle all clicks", () => {
    global.localStorage.setItem("pageLimit", 6);
    global.localStorage.setItem("searchTerm", "");
    const props = {
        items: [1, 2, 3, 4, 5, 6],
        total_items: 16,
        onChangePage: jest.fn()
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
    const props = {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        total_items: 16,
        onChangePage: jest.fn()
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
    const props = {
        items: [4, 5, 6],
        total_items: 16,
        onChangePage: jest.fn()
    }
    const wrapper = shallow(
        <Pagination {...props} />
    );
    const prevProps = {
        items: [1, 2, 3],
        total_items: 16,
        onChangePage: jest.fn()
    }
    wrapper.instance().componentDidUpdate(prevProps, wrapper.instance().state);
    expect(wrapper).toMatchSnapshot();
});

test("handle fetch", () => {
    global.localStorage.setItem("pageLimit", 6);
    global.localStorage.setItem("searchTerm", "");
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
    const props = {
        items: [4, 5, 6],
        total_items: 16,
        onChangePage: jest.fn()
    }
    const wrapper = shallow(
        <Pagination {...props} />
    );
    expect(wrapper).toMatchSnapshot();
});