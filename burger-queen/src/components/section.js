import React from 'react';
import {css} from 'aphrodite';

const Section = (props) => {
  return (
    <section className= {css(props.style)}>
      {props.content}
    </section>
  );
};

export default Section
  