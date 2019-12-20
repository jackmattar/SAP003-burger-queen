import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const ProductButton = (props) => {
  return (
    <div onClick={props.handleClick} id={props.id} className={css(styles.productCard)}>
      <img type="image" className={css(styles.imgProduct)} alt="menu" src={props.img}/>
      <p className={css(styles.productInfo)}>
        <h4>{props.title}</h4>
        R$ {props.price}
      </p>
    </div>
  );
};

const styles = StyleSheet.create({
  productCard:{
    margin: '1.5vh'
  },

  imgProduct: {
    height: '22vh',
    width: '35vh',
    borderRadius: 10
  },

  productInfo: {
    marginTop: -15,
  },
  
})

export default ProductButton
  