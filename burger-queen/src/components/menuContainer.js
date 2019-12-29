import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const Container = (props) => {
  return (
      <section className= {css(styles.menu)}>{props.content}</section>
  );
};

const styles = StyleSheet.create({
  menu: {
    display: "flex",
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

export default Container
  