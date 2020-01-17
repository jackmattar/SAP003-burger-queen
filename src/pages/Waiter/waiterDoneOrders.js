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
            />
            <main className={css(styles.main)}>
                <article className={css(styles.article, styles.flex, styles.minHeight)} key='main-article'>
                    {ordersToDelivery.length !== 0 
                        ? ordersToDelivery.map(order => (
                            <OrderCards
                                {...order}
                                allOrders={ordersToDelivery}
                                key={order.id}
                                waiter={true}
                            /> )) 
                        : (
                            <div className={css(styles.noOrders, styles.flex)} key='eita'>
                                Nenhum pedido para entregar.
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