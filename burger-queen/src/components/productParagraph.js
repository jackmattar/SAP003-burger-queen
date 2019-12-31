import React, { useState} from 'react';
import { StyleSheet, css } from 'aphrodite';

const ProductParagraph =(props) =>{
    const totalPrice = Number(props.value)*(props.item.data.count);
    
    const addItem = (item) => {;
        item.data.count = item.data.count+1
        return window.app.setTotalBill(props.totalBill+Number(props.value));
    }; 
    
    const deletItem = (item, id) => {
        if(props.item.data.count === 1){
            const newOrder = props.order.filter((el)=> {return el.id !== id});
            window.app.setOrder(newOrder);
            item.data.count = item.data.count-1
            return window.app.setTotalBill(props.totalBill-Number(props.value));
        };
        item.data.count = item.data.count-1
        return  window.app.setTotalBill(props.totalBill-Number(props.value));
    };

    return(
        props.options
        ? (
            <>
            <p className={css(styles.paragraph)}>
                <span className={css(styles.title)}>
                    {props.title}
                </span>
                <span className={css(styles.buttons)}>
                    <button onClick={()=>{deletItem(props.item, props.id)}}>
                        -
                    </button>
                    <span>
                        {props.item.data.count}
                    </span>
                    <button onClick={()=>{addItem(props.item)}}>
                        +
                    </button>
                </span>
                <span className={css(styles.price)}>
                    {props.currency}
                    {props.item.data.totalPrice*props.item.data.count}
                </span>
            </p>
            <ul className={css(styles.extras)}>
                <li>{props.options}</li>
                <li>{props.additionals[0]}</li>
                <li>{props.additionals[1]}</li>
            </ul>
            </>
        )
        : <p className={css(styles.paragraph)}>
            <span className={css(styles.title)}>
                {props.title}
            </span>
            <span className={css(styles.buttons)}>
                <button onClick={()=>{deletItem(props.item, props.id)}}>
                    -
                </button>
                <span>
                    {props.item.data.count}
                </span>
                <button onClick={()=>{addItem(props.item)}}>
                    +
                </button>
            </span>
            <span className={css(styles.price, props.styles)}>
                {props.currency}
                {totalPrice}
            </span>        
        </p>
    );
};

const styles = StyleSheet.create({
    paragraph: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 10
    },

    title: {
        fontWeight: 'bold',
        width: '50%',
    },

    price: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '10%',
        color: '#9c9898'
    },

    extras: {
        marginTop: -10,
        listStyleType: 'none'
    },

    buttons: {
        display: 'flex',
        justifyContent: 'center',
        width: '40%',

    }
})


export default ProductParagraph;