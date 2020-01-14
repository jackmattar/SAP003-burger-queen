import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const MenuButton = (props) => {
  return (
    <button
      type='button'
      id={props.id}
      className={css(styles.menuButton, props.style)}
      onClick={props.handleClick}
    >
      <img src={props.img} className={css(styles.iconButton)} alt={props.title} ></img>
      {props.title}
    </button>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F8D956',
    margin: '1vw',
    height: '10vh',
    width: '15vw',
    borderRadius: 20,
    border: 'none',
    ':focus': {
      backgroundColor: '#FC7443',
      outline: 'none',
      boxShadow: 'inset 0px -2px 4px 0px #c94616'
    },
    boxShadow: 'inset 0px -2px 4px 0px #b58618',
    fontSize: 16,
    '@media (min-width: 1281px)': {
      margin: '1vw',
      height: '10vh',
      width: '14vw',
      fontSize: 15,
    }   
  },

  iconButton: {
    width: '6vw',
    '@media (min-width: 1281px)': {
      width: '4vw',
    }   
  },
});

export default MenuButton
