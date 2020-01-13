import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import firebase from 'firebase';
import Kitchen from '../pages/Kitchen/kitchen';
import NewOrder from '../pages/Waiter/newOrder';
import WaiterDoneOrders from '../pages/Waiter/waiterDoneOrders';
import KitchenDoneOrders from '../pages/Kitchen/kitchenDoneOrders';
import { StyleSheet, css } from 'aphrodite';

export default function Header(props){

    const logout = () => {
        firebase
        .auth()
        .signOut()
        .then()
        .catch(console.error);
    };

    return(
        <Router>
            <div>
              <header className={css(styles.header, styles.flex)}>
                <a key='logo'>
                  <img className={css(styles.img)}src="https://i.ibb.co/W0F6X0X/logo.png" alt="logo"/>
                </a>
                <a key='primaryRoute' className={css(styles.a, styles.flex)}>
                  <Link className={css(styles.link)} to={props.primaryRoute}>{props.primaryLink}</Link>
                </a>
                <a key='secondROute' className={css(styles.a, styles.flex)}>
                  <Link className={css(styles.link)} to={props.secondRoute}>{props.secondLink}</Link>
                </a>
                <a key='logout' className={css(styles.a, styles.flex, styles.link)} onClick={logout}>
                    <Link className={css(styles.link)} to='/'>Sair</Link>
                </a>
              </header>
              
              <Switch>
                <Route exact path="/">
                  <main></main>
                </Route>  
                <Route path="/kitchen">
                  <Kitchen />
                </Route>
                <Route path="/kitchen-done-orders">
                  <KitchenDoneOrders/>
                </Route>
                <Route path="/waiter-done-orders">
                  <WaiterDoneOrders/>
                </Route>
                <Route path="/waiter">
                  <NewOrder/>
                </Route>
              </Switch>
            </div>
        </Router>
    );
};

const styles = StyleSheet.create({
    flex: {
      display: "flex"
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#ff4a4a',
      height: '10vh',
      boxShadow: 'inset 0px -1px 4px 0px #c41212',
      zIndex: 1
    },
  
    a: {
      alignItems: "center",
      width: '20vw',
      justifyContent: 'center'
    },
  
    link: {
      color: '#fff',
      fontSize: 24,
      textDecoration: 'none',
      fontWeight: 'bold'
    },
  
    img: {
      height: '9vh',
    }
  
  });
