import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default function Input (props) {
  return (
      <div className={css(styles.inputsContainer)}>
        <label className={css(styles.label)}>{props.label} </label>
        <input 
            type={props.type}
            onChange={props.onChange}
            className={css(styles.input)}
            autoComplete={props.auto}>
        </input>      
      </div>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '2vh',
    fontSize: 18,
    height: '10vh'
  },

  input: {
    height: '3vh',
    backgroundColor: '#f0f0f0',
    fontSize: 20,
    borderRadius: 10,
    border: 'none',
    padding: 10,
    width: '25vw'
  },

  label: {
    marginLeft: 5
  }
});
