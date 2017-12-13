import React from 'react';
import App from '../src/App';

test('renders the app component', () => {
  const wrapper = shallow(
    <App />
  );
  expect(wrapper).toMatchSnapshot();
});
