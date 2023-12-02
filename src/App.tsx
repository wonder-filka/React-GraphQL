import React from 'react';
import './App.css';
import DisplayRepo from './components/DisplayRepo';

function App() {

  return (
    <div className="App">
      <h2>Github Issues Manager</h2>
      <br />
      <DisplayRepo />
    </div>
  );
}

export default App;
