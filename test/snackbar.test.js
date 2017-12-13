import React from 'react';
import SnackBar from '../src/components/snackbar'

test("renders the snackbar component", () => {
    const wrapper = shallow(
        <SnackBar />
    );
    expect(wrapper).toMatchSnapshot();
});