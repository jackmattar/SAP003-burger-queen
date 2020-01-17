import React, { useEffect } from "react";
import firebase from 'firebase';
import { db } from "../util/firebase";
import Kitchen from '../pages/Kitchen/kitchen';
import NewOrder from '../pages/Waiter/newOrder';
import WaiterDoneOrders from '../pages/Waiter/waiterDoneOrders';
import KitchenDoneOrders from '../pages/Kitchen/kitchenDoneOrders';
import Init from "../pages/initalPage";
import {useHistory} from "react-router-dom";
import {Route} from "react-router-dom";

export default function App() {
  const history = useHistory();

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
              history.push('/waiter')
          } else {
            history.push('/kitchen')
          }
        });
      } else {
        history.push('/')
      };

    });
  }, [history])

  return (
    <>
      <Route exact path="/">
          <Init />
        </Route>
        <Route path="/kitchen">
          <Kitchen />
        </Route>
        <Route path="/kitchen-done-orders">
          <KitchenDoneOrders />
        </Route>
        <Route path="/waiter-done-orders">
          <WaiterDoneOrders />
        </Route>
        <Route path="/waiter">
          <NewOrder />
        </Route>
    </>
  )
};