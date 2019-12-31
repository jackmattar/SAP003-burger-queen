import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const MenuButton = (props) => {
  return (
      <button 
        type='button' 
        id={props.id} 
        className={css(styles.menuButton)} 
        onClick={props.onClick} >
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
      margin: '0.7vw',
      height: '10vh',
      width: '17vw',
      borderRadius: 20,
      border: 'none',
      ':focus': {
        backgroundColor: '#FC7443',
        outline: 'none'
      }
    },
  
    iconButton: {
      width: '6vw',
    },
});

export default MenuButton
  