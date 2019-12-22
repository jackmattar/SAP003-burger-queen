import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const ProductCard = (props) => {
  return (
    <div  onClick={props.handleClick} id={props.id} className={css(styles.productCard)}>
      <img
        className={css(styles.imgProduct)} 
        alt="product" 
        src={props.img}
      />
      <span>
        {props.title}
        <br/> R$ {props.price}
      </span>    
    </div>
  );
};

const styles = StyleSheet.create({
  productCard:{
    display: 'flex',
    flexDirection: 'column',
    margin: '1.5vh',
  },

  imgProduct: {
    height: '13vh',
    width: '22vh',
    borderRadius: 10
  },  
})

export default ProductCard
  