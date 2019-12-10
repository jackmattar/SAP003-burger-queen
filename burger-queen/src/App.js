import React from 'react';
import logo from './logo.svg';
import './App.css';
import {db} from './firebase.js'


function App() {
   db.collection('Menus')
  .doc('teste')
  .get()
  .then((doc)=>{
    console.log(doc.data().preço)
  })
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >

          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
