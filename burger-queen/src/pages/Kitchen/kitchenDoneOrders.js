import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../../util/firebase';
import OrderCards from '../../components/order/orderCards'

export default function KitchenDoneOrders() {
    const [ordersToPrepare, setToPrepare] = useState([]);

    useEffect(()=> {
        db.collection('Pedidos')
        .where('status', '==', 'Concluído')
        .onSnapshot((querySnapshot) => {
            const doc = querySnapshot.docs.map((doc) => ({
                id: doc.id, data: doc.data()
            }));
            setToPrepare(doc)
        });
    }, []);

    return (
        <main className={css(styles.main)}>
            <article className={css(styles.article, styles.flex, styles.minHeight)}>
                {ordersToPrepare.map( order => {
                    return (
                        <OrderCards
                            table = {order.data.table}
                            client = {order.data.client}
                            totalTime = {order.data.totalTime}
                            status = {order.data.status}
                            order = {order.data.order}
                            orders = {order}
                            id = {order.id}
                            allOrders = {ordersToPrepare}
                        />
                    );
                })}
            </article>
        </main>
    )
};

const styles = StyleSheet.create({
    flex: {
        display: 'flex'
    },

    article:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '1.5vw',
        backgroundColor: '#EEEEEF',
        minHeight: 1024
    }
});