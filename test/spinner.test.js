import React from 'react';
import Spinner from '../src/components/spinner'

test("renders the spinner component", () => {
    const wrapper = shallow(
        <Spinner />
    );
    expect(wrapper).toMatchSnapshot();
});

test("calls the showSpinner function", () => {
    const wrapper = shallow(
        <Spinner />
    );
    wrapper.instance().showSpinner(true);
    wrapper.instance().showSpinner(false);
    expect(wrapper).toMatchSnapshot();
});
