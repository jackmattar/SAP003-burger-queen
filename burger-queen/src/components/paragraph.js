import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const OrderParagraph =(props) =>{
    return(
        <p className={css(styles.orderParagraph)}>
            <span className={props.primarySpan}>{props.title}</span>
            <span className={props.span}>
                {props.primaryContent}
                <span className={props.span}>{props.content}</span>
            </span>            
        </p>
    )
}

const styles = StyleSheet.create({
    orderParagraph: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
})

export default OrderParagraph;