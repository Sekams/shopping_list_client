import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Main from './components/main'

require('./localStorageMock')

const App = () => {
  global.localStorage.setItem("baseUrl", "http://127.0.0.1:5000/v1");
  // global.localStorage.setItem("baseUrl", "https://the-real-shopping-list-api.herokuapp.com/v1");
  return (
    <BrowserRouter>    
      <Main />
    </BrowserRouter>
  );
}

export default App;
