import React from 'react';
import './App.css';
import {db} from './firebase.js'

function App() {
  db.collection('Café da Manhã')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach( doc => {
    console.log((doc.data().name),(doc.data().price))
    })
  })

  db.collection('Resto do dia')
  .doc('Acompanhamentos')
  .collection('Acompanhamentos')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach( doc => {
    console.log((doc.data().name),(doc.data().price))
    })
  })

  return (
    <div className="App">
      <header className="App-header">
        Burguer Queen
      </header>
      <div>
        Primary div
      </div>
    </div>
  );
}

export default App;
