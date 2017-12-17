import React, { Children } from 'react';
import HomePage from '../src/components/home_page'

test("renders the home_page component", () => {
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
        anchor.simulate('click', { preventDefault() {} });
    });
    wrapper.instance().showModal({ preventDefault() {} });
    wrapper.instance().showModal({ preventDefault() {} });
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
    wrapper.instance().showModal({ preventDefault() {} });
    wrapper.update();
    wrapper.props().children[4].props.clearMessages();
    wrapper.props().children[4].props.showModal({ preventDefault() {} });
    expect(wrapper).toMatchSnapshot();
});

test("renders shopping lists", () => {
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