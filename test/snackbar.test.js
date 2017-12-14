import React from 'react';
import SnackBar from '../src/components/snackbar'

test("renders the snackbar component", () => {
    const wrapper = shallow(
        <SnackBar />
    );
    expect(wrapper).toMatchSnapshot();
});

test("calls the showSnackbar function", () => {
    const wrapper = shallow(
        <SnackBar />
    );
    wrapper.instance().showSnackBar();
    expect(wrapper).toMatchSnapshot();
});

test("unmounts the  snackbar component", () => {
    const wrapper = shallow(
        <SnackBar />
    );
    wrapper.instance().componentWillUnmount();
    expect(wrapper).toMatchSnapshot();
});

it('shows snackbar for 3 seconds', (done) => {
    setTimeout(() => {
        done();
    }, 4000);
});