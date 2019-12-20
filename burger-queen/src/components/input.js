import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const Input = (props) => {
  return (
      <div className={css(styles.inputs)}>
        <label>{props.label} </label>
        <input type={props.type} onChange={props.onChange}></input>      
      </div>
  );
};

const styles = StyleSheet.create({
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    margin: '2vh'
    
  }
})
export default Input;