import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const OrderSections = (props) => {
  return (
    <section className={css(styles.orderSections,(props.className))}>
      {props.content}
    </section>
  );
};

const styles = StyleSheet.create({
  orderSections: {
    display: 'flex',
    justifyContent: 'space-between',
  }
})

export default OrderSections
  