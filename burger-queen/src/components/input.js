import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const Input = (props) => {
  return (
      <div className={css(styles.inputsContainer)}>
        <label className={css(styles.label)}>{props.label} </label>
        <input type={props.type} onChange={props.onChange} className={css(styles.input)}></input>      
      </div>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '2vh',
    width: '25vw',
    fontSize: 18,
  },

  input: {
    height: '3vh',
    backgroundColor: '#f0f0f0',
    fontSize: 20,
    borderRadius: 10,
    border: 'none',
    padding: 10
  },

  label: {
    marginLeft: 5
  }
})
export default Input;