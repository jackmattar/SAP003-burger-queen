import React, { useState, useEffect } from "react";
import { StyleSheet, css } from 'aphrodite';
import firebase from 'firebase';
import { db } from "../util/firebase";
import Init from './initalPage';
import Header from '../components/header';

export default function App() {
  const [render, setRender] = useState('');

  useEffect( () => {
    firebase
    .auth()
    .onAuthStateChanged( (user) => {
      if(user){

        db.collection('Users')
        .doc(user.uid)
        .get()
        .then( user => {
          if(user.data().sector === 'waiter'){
            setRender(
              <Header 
                primaryLink='Novo Pedido'
                primaryRoute='/waiter' 
                secondLink='Pedidos Prontos'
                secondRoute='/waiter-done-orders'
              />
            );
          } else {
            setRender(
              <Header 
                primaryLink='Em preparo'
                primaryRoute='/kitchen'
                secondLink='Concluídos'
                secondRoute='/kitchen-done-orders'
              />
            );
          }
        });
      } else {
        setRender(<Init/>)
      };

    });
  }, [])

  return (
    <>
      {render}
    </>
  )
};