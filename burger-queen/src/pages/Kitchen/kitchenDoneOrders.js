import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../../util/firebase';
import OrderCards from '../../components/order/orderCards';
import Header from '../../components/header';

export default function KitchenDoneOrders() {
    const [ordersDone, setToDone] = useState([]);

    useEffect(()=> {
        db.collection('Pedidos')
        .where('status', '==', 'Concluído')
        .onSnapshot((querySnapshot) => {
            const doc = querySnapshot.docs.map((doc) => ({
                id: doc.id, data: doc.data()
            }));
            setToDone(doc)
        });
    }, []);

    return (
        <>
        <Header 
            primaryLink='Em preparo'
            primaryRoute='/kitchen'
            secondLink='Concluídos'
            secondRoute='/kitchen-done-orders'
        />
        <main className={css(styles.main)}>
            <article className={css(styles.article, styles.flex, styles.minHeight)}>
                {
                    ordersDone.length !== 0 ?
                    ordersDone.map( order => {
                        return (
                            <OrderCards
                                table = {order.data.table}
                                client = {order.data.client}
                                totalTime = {order.data.totalTime}
                                status = {order.data.status}
                                order = {order.data.order}
                                orders = {order}
                                id = {order.id}
                                allOrders = {ordersDone}
                                waiterName = {order.data.waiter}
                                key={order.id}
                            />
                        );
                    }) : (
                        <div className={css(styles.noOrders, styles.flex)}>
                            Nenhum pedido concluído.
                        </div>
                    )
                }
            </article>
        </main>
        </>
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
    },

    noOrders: {
        width: '100vw',
        marginTop: '10vh',
        justifyContent: 'center',
        fontSize: '2.5vw',
        fontWeight: 'bold'
    }
});