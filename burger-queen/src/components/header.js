import React from "react";
import { Link } from "react-router-dom";
import firebase from 'firebase';
import { StyleSheet, css } from 'aphrodite';


export default function Header(props) {

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then()
      .catch(console.error);
  };

  return (
    <>
      <div>
        <header className={css(styles.header, styles.flex)}>
          <div key='logo'>
            <img className={css(styles.img)} src="https://i.ibb.co/W0F6X0X/logo.png" alt="logo" />
          </div>
          <div key='primaryRoute' className={css(styles.a, styles.flex)}>
            <Link className={css(styles.link)} to={props.primaryRoute}>{props.primaryLink}</Link>
          </div>
          <div key='secondROute' className={css(styles.a, styles.flex)}>
            <Link className={css(styles.link)} to={props.secondRoute}>{props.secondLink}</Link>
          </div>
          <div key='logout' className={css(styles.a, styles.flex, styles.link)} onClick={logout}>
            <Link className={css(styles.link)} to='/'>Sair</Link>
          </div>
        </header>
      </div>
    </>
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
    '@media (min-width: 1281px)': {
      height: '8vh'
    }
  },

  a: {
    alignItems: "center",
    width: '20vw',
    justifyContent: 'center',
    '@media (min-width: 1281px)': {
      width: '15vw'
    }
  },

  link: {
    color: '#fff',
    fontSize: 24,
    textDecoration: 'none',
    fontWeight: 'bold',
    '@media (min-width: 1281px)': {
      fontSize: 16
    }
  },

  img: {
    height: '9vh',
    '@media (min-width: 1281px)': {
      height: '7.5vh',
    }
  }

});
