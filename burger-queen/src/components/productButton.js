import React from 'react';

const ProductButton = (props) => {
  return (
      <button type='button' className='products-btn' onClick={props.onClick}>
        {props.title}
        <p>R$: {props.price}</p>
      </button>
  );
};
  export default ProductButton
  