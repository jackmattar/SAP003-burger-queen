import React, { useState} from 'react';
import { StyleSheet, css } from 'aphrodite';

const OrderParagraph =(props) =>{
    const [count, setCount] = useState(1);
    const totalPrice = Number(props.value)*count
 
    const addItem = () => {
        setCount(count+1);
        return window.app.setTotalBill(window.app.totalBill+Number(props.value));
    };    
    
    const deletItem = (id) => {
        if(count === 1){
            const newOrder = window.app.order.filter((el)=> {return el.id !== id});
            window.app.setOrder(newOrder);
            return window.app.setTotalBill(window.app.totalBill-Number(props.value));
        };
        setCount(count - 1)
        return  window.app.setTotalBill(window.app.totalBill-Number(props.value));
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
                    <button onClick={()=>{deletItem(props.id)}}>
                        -
                    </button>
                    <span>
                        {count}
                    </span>
                    <button onClick={addItem}>
                        +
                    </button>
                </span>
                <span className={css(styles.price)}>
                    {props.currency}
                    {totalPrice}
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
                <button onClick={()=>{deletItem(props.id)}}>
                    -
                </button>
                <span>
                    {count}
                </span>
                <button onClick={addItem}>
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
        fontWeight: 'bold'
    },

    price: {
        color: '#9c9898'
    },

    extras: {
        marginTop: -10,
       listStyleType: 'none'
    },
})


export default OrderParagraph;