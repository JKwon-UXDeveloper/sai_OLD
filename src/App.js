import React from 'react';
import profileImage from './img/jayKwon.png'
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Sai Project</h1>
      <h2>Author: Jay Kwon</h2>
      <img src={profileImage} alt="profile-image" />
    </div>
  );
}

export default App;
