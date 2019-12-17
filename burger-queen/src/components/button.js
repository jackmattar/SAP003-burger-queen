import React from 'react';

const Button = (props) => {
  return (
      <button type='button' id={props.id} className={props.className} onClick={props.onClick}>{props.title}</button>
  );
};
  export default Button
  