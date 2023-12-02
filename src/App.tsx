import React from 'react';
import './App.css';
import DisplayRepo from './components/DisplayRepo';
import {  Header } from 'antd/es/layout/layout';
function App() {
  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 'auto',
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#7dbcea',
  };



  return (
    <div className="App">
      <Header style={headerStyle}><h1>Github Issues Manager</h1></Header>
        <DisplayRepo />
  
    </div>
  );
}

export default App;
