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
      outline: 'none'
    },
    fontSize: 16,
  },

  iconButton: {
    width: '6vw',
  },
});

export default MenuButton
