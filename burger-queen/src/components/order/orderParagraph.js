import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import OptionsUl from '../order/optionsUl';

const OrderParagraph = (props) => {
    props.product.id = props.id;

    const addItem = (item) => {
        item.data.count = item.data.count + 1;
        props.setOrder([...props.order]);
        props.setTotalBill(props.totalBill + props.totalPrice);
    };

    const deleteItem = (item) => {
        if (item.data.count === 1) {
            const newOrder = props.order.filter((el) => { return el.id !== props.id });
            props.setOrder(newOrder);
        } else {
            item.data.count = item.data.count - 1;
            props.setOrder([...props.order]);
        };
        props.setTotalBill(props.totalBill - props.totalPrice);
    };

    return (
        <>
            <p className={css(styles.paragraph)} key={props.title + props.add}>
                <span className={css(styles.title)}>
                    {props.title}
                </span>
                <span className={css(styles.amount)}>
                    <button className={css(styles.button)} onClick={() => deleteItem(props.product)}>
                        -
                    </button>
                    <span className={css(styles.count)}>
                        {props.product.data.count}
                    </span>
                    <button className={css(styles.button)} onClick={() => addItem(props.product)}>
                        +
                    </button>
                </span>
                <span className={css(styles.price, props.styles)}>
                    {props.currency}
                    {props.price * props.product.data.count}
                </span>
            </p>
            <OptionsUl
                options={props.options}
                additionals={props.add}
            />
        </>
    );
};

const styles = StyleSheet.create({
    paragraph: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        '@media (min-width: 1281px)': {
            margin: 3,
        }
    },

    title: {
        fontWeight: 'bold',
        fontSize: 17,
        width: '50%',
        '@media (min-width: 1281px)': {
            fontSize: 15,
            width: '46%',
        }
    },

    price: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '10%',
        color: '#9c9898',
        fontSize: 17,
        '@media (min-width: 1281px)': {
            fontSize: 14
        }
    },

    amount: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        '@media (min-width: 1281px)': {
            width: '34%',
        }
    },

    button: {
        backgroundColor: '#85b4ff',
        border: 'none',
        width: '3vw',
        height: '3vw',
        fontSize: 20,
        borderRadius: 3,
        '@media (min-width: 1281px)': {
            height: '4vh',
            width: '4vh'
        }
    },

    count: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '4vw',
        height: '2.9vw',
        backgroundColor: '#fff',
        fontWeight: 'bold',
        border: 'solid 0.5px #999',
        '@media (min-width: 1281px)': {
            height: '3.9vh',
            width: '4vh',
            fontSize: 14,
            border: 'solid 0.2px #999'
        }
    }
});

export default OrderParagraph;
