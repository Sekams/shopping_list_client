import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Main from './components/main'

require('./localStorageMock')

const App = () => {
  //Set base URL
  // global.localStorage.setItem("baseUrl", "http://127.0.0.1:5000/v1");
  global.localStorage.setItem("baseUrl", "https://the-real-shopping-list-api.herokuapp.com/v1");

  //Set default page limit
  if (!global.localStorage.getItem("pageLimit")) {
    global.localStorage.setItem("pageLimit", 6);
  }
  //Set default current page
  if (!global.localStorage.getItem("currentPage")) {
    global.localStorage.setItem("currentPage", 1);
  }
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
