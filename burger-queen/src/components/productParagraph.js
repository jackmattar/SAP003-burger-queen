import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const ProductParagraph =(props) =>{
    props.item.id = props.id;
    const totalPrice = Number(props.value)*(props.item.data.count);
    const addItem = (item) => {
        item.data.count = item.data.count+1
        return window.app.setTotalBill(props.totalBill+Number(props.value));
    }; 
    
    const deletItem = (item, id) => {
        const validateOption = () => {
            if(props.options){
                const finalPrice = props.value + props.additionals.length
                window.app.setTotalBill(props.totalBill-finalPrice)
            } else {
                window.app.setTotalBill(props.totalBill-Number(props.value))
            }
        }

        if(props.item.data.count === 1){
            const newOrder = props.order.filter((el)=> {return el.id !== id});
            window.app.setOrder(newOrder);
            validateOption()
        } else {
            item.data.count = item.data.count-1;
            validateOption()
        }
    };

    return(
        props.options
        ? (
            <>
            <p className={css(styles.paragraph)}>
                <span className={css(styles.title)}>
                    {props.title}
                </span>
                <span className={css(styles.amount)}>
                    <button className={css(styles.button)} onClick={()=>{deletItem(props.item, props.id)}}>
                        -
                    </button>
                    <span className={css(styles.count)}>
                        {props.count}
                    </span>
                    <button className={css(styles.button)} onClick={()=>{addItem(props.item)}}>
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
                <li>{props.additionals[0] ? props.additionals[0] + ' extra':null}</li>
                <li>{props.additionals[1] ? props.additionals[1] + ' extra':null}</li>
            </ul>
            </>
        )
        : <p className={css(styles.paragraph)}>
            <span className={css(styles.title)}>
                {props.title}
            </span>
            <span className={css(styles.amount)}>
                <button className={css(styles.button)} onClick={()=>{deletItem(props.item, props.id)}}>
                    -
                </button>
                <span className={css(styles.count)}>
                    {props.item.data.count}
                </span>
                <button className={css(styles.button)} onClick={()=>{addItem(props.item)}}>
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

    amount: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
    },

    button: {
        backgroundColor: '#85b4ff',
        border: 'none',
        width: '3vw',
        height: '3vw',
        fontSize: 20,
        borderRadius: 3,
    },

    count: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '4vw',
        height: '2.9vw',
        backgroundColor: '#fff',
        fontWeight: 'bold',
        border: 'solid 0.5px #999'
    }
});

export default ProductParagraph;