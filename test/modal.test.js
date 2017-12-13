import React from 'react';
import Modal from '../src/components/modal'

test("renders the modal component", () => {
    const wrapper = shallow(
        <Modal />
    );
    expect(wrapper).toMatchSnapshot();
});