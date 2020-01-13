import React from 'react';
import { checkPropTypes } from 'prop-types';

export default function Radio(props){
    return(
        <>
        <input 
            className='input' 
            type='radio'
            value={props.value}  
            name={props.name} 
            onChange={props.onChange}
            id={props.id}
            />
        <label htmlFor={props.for}>{props.title}</label>
        </>
    );
}