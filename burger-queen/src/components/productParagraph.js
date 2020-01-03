import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import OptionsUl from'../components/optionsUl';

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
        <OptionsUl
            options={props.options}
            additionals={props.additionals}
        />    
        </>
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