import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const Button = (props) => {
  return (
      <button 
        type='button' 
        id={props.id} 
        className={css(styles.menuButton)} 
        onClick={props.onClick} >
          <img src={props.img} className={css(styles.iconButton)} ></img>
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
    margin: '2vh',
    height: '13vh',
    width: '30vh',
    borderRadius: 20,
    border: 'none',
    ':focus': {
      backgroundColor: '#FC7443',
      outline: 'none'
    }
    },

  iconButton: {
    width: '5vw',
  }
  
});

export default Button
  