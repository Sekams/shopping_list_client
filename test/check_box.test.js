import React from 'react';
import CheckBox from '../src/components/check_box'

test("renders the check_box component", () => {
    const wrapper = shallow(
        <CheckBox />
    );
    expect(wrapper).toMatchSnapshot();
});

test("calls the onInputChange function", () => {
    fetch.mockResponses(
        [JSON.stringify(
            {
                "message": "Shopping List Item checked",
                "shoppingListItem": {
                    "created_on": "Fri, 17 Nov 2017 22:45:29 GMT",
                    "id": 1,
                    "modified_on": "Sat, 18 Nov 2017 01:32:44 GMT",
                    "name": "Tomatoes",
                    "price": 120,
                    "shopping_list_id": 1,
                    "status": false
                },
                "status": "fail",
            }),
        {
            status: 202,
            ok: true
        }],
        [JSON.stringify(
            {
                "message": "Shopping List Item checked",
                "shoppingListItem": {
                    "created_on": "Fri, 17 Nov 2017 22:45:29 GMT",
                    "id": 1,
                    "modified_on": "Sat, 18 Nov 2017 01:32:44 GMT",
                    "name": "Tomatoes",
                    "price": 120,
                    "shopping_list_id": 1,
                    "status": true
                },
                "status": "success",
            }),
        {
            status: 200,
            ok: true
        }]
    );
    const status = true;
    const props = {
        id: 1,
        name: 'Tomatoes',
        price: 120,
        status: false,
        shopping_list_id: 1
    };
    const wrapper = shallow(
        <CheckBox {...props} />
    );
    wrapper.instance().toggleItemStatus({ preventDefault() { } });
    wrapper.update();
    wrapper.find('input[type="checkbox"]').simulate('change',
        { target: { checked: status } },
    );
    expect(wrapper).toMatchSnapshot();
});test("calls the onInputChange function", () => {
    fetch.mockResponses(
        [JSON.stringify(
            {
                "message": "Shopping List Item checked",
                "shoppingListItem": {
                    "created_on": "Fri, 17 Nov 2017 22:45:29 GMT",
                    "id": 1,
                    "modified_on": "Sat, 18 Nov 2017 01:32:44 GMT",
                    "name": "Tomatoes",
                    "price": 120,
                    "shopping_list_id": 1,
                    "status": false
                },
                "status": "fail",
            }),
        {
            status: 202,
            ok: true
        }],
        [JSON.stringify(
            {
                "message": "Shopping List Item checked",
                "shoppingListItem": {
                    "created_on": "Fri, 17 Nov 2017 22:45:29 GMT",
                    "id": 1,
                    "modified_on": "Sat, 18 Nov 2017 01:32:44 GMT",
                    "name": "Tomatoes",
                    "price": 120,
                    "shopping_list_id": 1,
                    "status": true
                },
                "status": "success",
            }),
        {
            status: 200,
            ok: true
        }]
    );
    const status = true;
    const props = {
        id: 1,
        name: 'Tomatoes',
        price: 120,
        status: false,
        shopping_list_id: 1
    };
    const wrapper = shallow(
        <CheckBox {...props} />
    );
    wrapper.instance().toggleItemStatus({ preventDefault() { } });
    wrapper.update();
    wrapper.find('input[type="checkbox"]').simulate('change',
        { target: { checked: status } },
    );
    expect(wrapper).toMatchSnapshot();
});

test("catches errors", () => {
    fetch.mockResponseOnce(
        [JSON.stringify(
            {
                "message": "Shopping List Item not checked",
                "status": "fail",
            }),
        {
            status: 400,
            ok: false
        }]
    );
    const status = true;
    const props = {
        id: 1,
        name: 'Tomatoes',
        price: 120,
        status: false,
        shopping_list_id: 1
    };
    const wrapper = shallow(
        <CheckBox {...props} />
    );
    wrapper.instance().toggleItemStatus({ preventDefault() { } });
    expect(wrapper).toMatchSnapshot();
});

test("shows spinner", () => {
    const props = {
        id: 1,
        name: 'Tomatoes',
        price: 120,
        status: false,
        shopping_list_id: 1
    };
    const wrapper = shallow(
        <CheckBox {...props} />
    );
    wrapper.props().children[0].ref();
    expect(wrapper).toMatchSnapshot();
});