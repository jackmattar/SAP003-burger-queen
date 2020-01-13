import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../../util/firebase';
import OrderCards from '../../components/order/orderCards'

export default function WaiterDoneOrders() {
    const [ordersToDelivery, setToDelivery] = useState([]);

    useEffect(()=> {
        db.collection('Pedidos')
        .where('status', '==', 'Pronto para servir')
        .onSnapshot((querySnapshot) => {
            const doc = querySnapshot.docs.map((doc) => ({
                id: doc.id, data: doc.data()
            }));
            setToDelivery(doc)
        });
    }, []);

    return (
        <main className={css(styles.main)}>
            <article className={css(styles.article, styles.flex, styles.minHeight)}>
                {ordersToDelivery.map( order => {
                    return (
                        <OrderCards
                            table = {order.data.table}
                            client = {order.data.client}
                            totalTime = {order.data.totalTime}
                            status = {order.data.status}
                            order = {order.data.order}
                            orders = {order}
                            id = {order.id}
                            waiter = {true}
                            allOrders = {ordersToDelivery}
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