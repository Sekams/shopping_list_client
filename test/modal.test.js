import React from 'react';
import Modal from '../src/components/modal'

test("renders the modal component", () => {
    const wrapper = shallow(
        <Modal />
    );
    expect(wrapper).toMatchSnapshot();
});

test("handles change password", () => {
    fetch.mockResponses(
        [JSON.stringify(
            {
                "message": "Password changed",
                "status": "success"
            }),
        {
            status: 200,
            ok: true
        }],
        [JSON.stringify(
            {
                "message": "Password not changed",
                "status": "fail"
            }),
        {
            status: 400,
            ok: false
        }]
    );
    const props = {
        owner: "change_password",
        title: "A title",
        first_input: "First Input",
        price: 100,
        shopping_list_id: 1,
        shopping_list_item_status: false,
        shopping_list_item_id: 1,
        create: true,
        showModal: jest.fn()
    }
    const wrapper = shallow(
        <Modal {...props} />
    );
    wrapper.instance().setState({ old_password: "123456", new_password: "abcdef" });
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    wrapper.instance().setState({ old_password: "", new_password: "" });
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    expect(wrapper).toMatchSnapshot();
});

test("handles add shopping list", () => {
    fetch.mockResponses(
        [JSON.stringify(
            {
                "message": "Shopping List Added",
                "status": "success",
                "shoppingList": {
                    "created_on": "Fri, 17 Nov 2017 22:45:13 GMT",
                    "id": 1,
                    "modified_on": "Fri, 17 Nov 2017 22:45:13 GMT",
                    "title": "Groceries",
                    "user_id": 1
                }
            }),
        {
            status: 200,
            ok: true
        }],
        [JSON.stringify(
            {
                "message": "Shopping List not added yet",
                "status": "fail"
            }),
        {
            status: 202,
            ok: true
        }],
        [JSON.stringify(
            {
                "message": "Shopping List not added",
                "status": "fail"
            }),
        {
            status: 400,
            ok: false
        }]
    );
    const props = {
        owner: "add_shopping_list",
        title: "A title",
        first_input: "First Input",
        price: 100,
        shopping_list_id: 1,
        shopping_list_item_status: false,
        shopping_list_item_id: 1,
        create: true,
        showModal: jest.fn()
    }
    const wrapper = shallow(
        <Modal {...props} />
    );
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    wrapper.instance().setState({ first_input: '' });
    wrapper.update();
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    expect(wrapper).toMatchSnapshot();
});

test("handles add shopping list item", () => {
    fetch.mockResponses(
        [JSON.stringify(
            {
                "message": "Shopping List Item Added",
                "status": "success",
                "shoppingListItem": {
                    "created_on": "Fri, 17 Nov 2017 22:45:29 GMT",
                    "id": 1,
                    "modified_on": "Sat, 18 Nov 2017 01:32:44 GMT",
                    "name": "Tomatoes",
                    "price": 120,
                    "shopping_list_id": 1,
                    "status": true
                }
            }),
        {
            status: 200,
            ok: true
        }],
        [JSON.stringify(
            {
                "message": "Shopping List Item Not Added",
                "status": "fail"
            }),
        {
            status: 400,
            ok: false
        }]
    );
    const props = {
        owner: "add_shopping_list_item",
        title: "A title",
        first_input: "First Input",
        price: 100,
        shopping_list_id: 1,
        shopping_list_item_status: false,
        shopping_list_item_id: 1,
        create: true,
        showModal: jest.fn()
    }
    const wrapper = shallow(
        <Modal {...props} />
    );
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    expect(wrapper).toMatchSnapshot();
});

test("handles edit shopping list", () => {
    fetch.mockResponses(
        [JSON.stringify(
            {
                "message": "Shopping List Edited",
                "status": "success",
                "shoppingList": {
                    "created_on": "Fri, 17 Nov 2017 22:45:13 GMT",
                    "id": 1,
                    "modified_on": "Fri, 17 Nov 2017 22:45:13 GMT",
                    "title": "Groceries",
                    "user_id": 1
                }
            }),
        {
            status: 200,
            ok: true
        }],
        [JSON.stringify(
            {
                "message": "Shopping List not edited yet",
                "status": "fail"
            }),
        {
            status: 202,
            ok: true
        }],
        [JSON.stringify(
            {
                "message": "Shopping List not edited",
                "status": "fail"
            }),
        {
            status: 400,
            ok: false
        }]
    );
    const props = {
        owner: "edit_shopping_list",
        title: "A title",
        first_input: "First Input",
        price: 100,
        shopping_list_id: 1,
        shopping_list_item_status: false,
        shopping_list_item_id: 1,
        create: true,
        showModal: jest.fn()
    }
    const wrapper = shallow(
        <Modal {...props} />
    );
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    wrapper.instance().setState({ first_input: '' });
    wrapper.update();
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    expect(wrapper).toMatchSnapshot();
});

test("handles delete shopping list", () => {
    fetch.mockResponses(
        [JSON.stringify(
            {
                "message": "Shopping List Deleted",
                "status": "success"
            }),
        {
            status: 200,
            ok: true
        }],
        [JSON.stringify(
            {
                "message": "Shopping List not deleted yet",
                "status": "fail"
            }),
        {
            status: 202,
            ok: true
        }],
        [JSON.stringify(
            {
                "message": "Shopping List not deleted",
                "status": "fail"
            }),
        {
            status: 400,
            ok: false
        }]
    );
    const props = {
        owner: "delete_shopping_list",
        title: "A title",
        first_input: "First Input",
        price: 100,
        shopping_list_id: 1,
        shopping_list_item_status: false,
        shopping_list_item_id: 1,
        create: true,
        showModal: jest.fn()
    }
    const wrapper = shallow(
        <Modal {...props} />
    );
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    expect(wrapper).toMatchSnapshot();
});

test("handles edit shopping list item", () => {
    fetch.mockResponses(
        [JSON.stringify(
            {
                "message": "Shopping List Item Edited",
                "status": "success",
                "shoppingListItem": {
                    "created_on": "Fri, 17 Nov 2017 22:45:29 GMT",
                    "id": 1,
                    "modified_on": "Sat, 18 Nov 2017 01:32:44 GMT",
                    "name": "Tomatoes",
                    "price": 120,
                    "shopping_list_id": 1,
                    "status": true
                }
            }),
        {
            status: 200,
            ok: true
        }],
        [JSON.stringify(
            {
                "message": "Shopping List Item not edited yet",
                "status": "fail"
            }),
        {
            status: 202,
            ok: true
        }],
        [JSON.stringify(
            {
                "message": "Shopping List Item not edited",
                "status": "fail"
            }),
        {
            status: 400,
            ok: false
        }]
    );
    const props = {
        owner: "edit_shopping_list_item",
        title: "A title",
        first_input: "First Input",
        price: 100,
        shopping_list_id: 1,
        shopping_list_item_status: false,
        shopping_list_item_id: 1,
        create: true,
        showModal: jest.fn()
    }
    const wrapper = shallow(
        <Modal {...props} />
    );
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    wrapper.instance().setState({ first_input: '' });
    wrapper.update();
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    expect(wrapper).toMatchSnapshot();
});

test("handles delete shopping list item", () => {
    fetch.mockResponses(
        [JSON.stringify(
            {
                "message": "Shopping List Item Deleted",
                "status": "success"
            }),
        {
            status: 200,
            ok: true
        }],
        [JSON.stringify(
            {
                "message": "Shopping List Item not deleted yet",
                "status": "fail"
            }),
        {
            status: 202,
            ok: true
        }],
        [JSON.stringify(
            {
                "message": "Shopping List Item not deleted",
                "status": "fail"
            }),
        {
            status: 400,
            ok: false
        }]
    );
    const props = {
        owner: "delete_shopping_list_item",
        title: "A title",
        first_input: "First Input",
        price: 100,
        shopping_list_id: 1,
        shopping_list_item_status: false,
        shopping_list_item_id: 1,
        create: true,
        showModal: jest.fn()
    }
    const wrapper = shallow(
        <Modal {...props} />
    );
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    wrapper.instance().handleOnSubmit({ preventDefault() { } });
    wrapper.instance().closeModal({ preventDefault() { } });
    expect(wrapper).toMatchSnapshot();
});

test("handles additional methods", () => {
    const inputText = "Random Text";
    const inputNumber = 1093;
    const owners = [
        "change_password",
        "add_shopping_list",
        "add_shopping_list_item",
        "edit_shopping_list",
        "delete_shopping_list",
        "edit_shopping_list_item",
        "delete_shopping_list_item"
    ];
    owners.map((owner) => {
        let price = 0;
        if (owner !== "change_password") {
            price = 100;
        }
        const props = {
            owner: owner,
            title: "A title",
            first_input: "First Input",
            price: price,
            shopping_list_id: 1,
            shopping_list_item_status: false,
            shopping_list_item_id: 1,
            create: true,
            showModal: jest.fn()
        }
        const wrapper = shallow(
            <Modal {...props} />
        );
        wrapper.find('input').map((input) => {
            if (input.props().type === "number") {
                input.simulate('change', {
                    target: { inputNumber },
                });
            } else {
                input.simulate('change', {
                    target: { inputText },
                });
            }
        });
        expect(wrapper).toMatchSnapshot();
    });
});