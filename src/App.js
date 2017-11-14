import React from 'react';
import Main from './components/main'

const App = () => {
  localStorage.setItem("baseUrl", "http://127.0.0.1:5000/v1");
  return (
    <Main />
  );
}

export default App;
