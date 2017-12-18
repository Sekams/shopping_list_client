import "raf/polyfill";
import "jest-localstorage-mock";
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

//Setup mock functions for API calls
global.fetch = require('jest-fetch-mock');

//Setup authorization
global.localStorage.setItem("accessToken", 'wjcnejcnejncec');
global.localStorage.setItem("loggedIn", true);