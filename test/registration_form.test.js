import React from 'react';
import RegistrationForm from '../src/components/registration_form'

test("renders the registration_form component", () => {
    const wrapper = shallow(
        <RegistrationForm />
    );
    expect(wrapper).toMatchSnapshot();
});