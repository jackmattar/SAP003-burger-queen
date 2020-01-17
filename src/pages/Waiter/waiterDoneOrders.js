import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../../util/firebase';
import OrderCards from '../../components/order/orderCards';
import Header from '../../components/header';

export default function WaiterDoneOrders() {
    const [ordersToDelivery, setToDelivery] = useState([]);

    useEffect(() => {
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
        <>
            <Header
                primaryLink='Novo Pedido'
                primaryRoute='/waiter'
                secondLink='Pedidos Prontos'
                secondRoute='/waiter-done-orders'
                key='header'
            />
            <main className={css(styles.main)}>
                <article className={css(styles.article, styles.flex, styles.minHeight)} key='main-article'>
                    {
                        ordersToDelivery.length !== 0 ?
                            ordersToDelivery.map(order => {
                                return (
                                    <OrderCards
                                        table={order.data.table}
                                        client={order.data.client}
                                        totalTime={order.data.totalTime}
                                        status={order.data.status}
                                        order={order.data.order}
                                        orders={order}
                                        id={order.id}
                                        allOrders={ordersToDelivery}
                                        key={order.id}
                                        waiter={true}
                                        waiterName={order.data.waiter}
                                    />
                                );
                            }) : (
                                <div className={css(styles.noOrders, styles.flex)} key='eita'>
                                    <p key='no-order'>
                                        Nenhum pedido para entregar.
                                    </p>
                                </div>
                            )
                    }
                </article>
            </main>
        </>
    );
};

const styles = StyleSheet.create({
    flex: {
        display: 'flex'
    },

    article: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '1.5vw',
        backgroundColor: '#EEEEEF',
        minHeight: 1024
    },

    noOrders: {
        width: '100vw',
        justifyContent: 'center',
        fontSize: '2.5vw',
        fontWeight: 'bold'
    }
});