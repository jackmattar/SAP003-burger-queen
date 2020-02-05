import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import ClientParagraph from './clientParagraph';
import OrderParagraph from './orderParagraph';
import SendButton from './sendButton';
import { db } from '../../util/firebase';
import growl from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';
import firebase from 'firebase';

export default function OrderSection(props){
    const waiter = firebase.auth().currentUser;
    const sendOrder = () => {        
        if ((props.client && props.table) === ''){
            growl({text: 'Preencha Nome do cliente e Mesa', type: 'warning', fadeAway: true, fadeAwayTimeout: 3000})
        } else if(props.order.length === 0) {
            growl({text: 'Escolha os produtos', type: 'warning', fadeAway: true, fadeAwayTimeout: 3000})
        } else {
            const now = new Date();
            const h = now.getHours();
            const m = now.getMinutes();
            const hour = `${h}:${m}`
            
            const order = {
                client: props.client.toUpperCase(),
                table: props.table,
                order: props.order,
                status: 'Em preparo',
                initialTime: hour,
                totalTime: '',
                waiter: waiter.displayName
            };
    
            db.collection('Pedidos')
            .doc(props.id)
            .set(order);

            growl({text: 'Pedido Enviado!', type: 'success', fadeAway: true, fadeAwayTimeout: 2000});
            props.setOrder([]);
            props.setTotalBill(0);
            props.setClient('');
            props.setTable('');
        }
    }

    return(
        <>
        <h3 className={css(styles.h3)}>Resumo do Pedido</h3>
        <section className={css(styles.clientInfo)}>
            <ClientParagraph
                title='Cliente'
                primaryContent={props.client.toUpperCase()}
                color='#fffeb3'
            />
            <ClientParagraph
                title='Mesa'
                primaryContent={props.table}
                color='#fffeb3'
            />
        </section>
        <section className={css(styles.productOrder)}>
            {props.order.map( product => {
                return (
                    <OrderParagraph
                        title = {product.data.name}
                        product = {product}
                        currency = 'R$'
                        price = {product.data.totalPrice}
                        options = {product.data.selectedOption}
                        add = {product.data.selectedAdd}
                        order = {props.order}
                        setOrder={props.setOrder}
                        id={product.id+product.data.selectedAdd+product.data.selectedOption}
                        totalPrice={product.data.totalPrice}
                        totalBill={props.totalBill}
                        setTotalBill={props.setTotalBill}
                        key = {product.id+product.data.selectedAdd+product.data.selectedOption}
                    />
                );
            })}
        </section>
        <section className={css(styles.productOrder)}>
            <ClientParagraph
                title='Total'
                style={styles.price}
                primaryContent='R$'
                totalBill={props.totalBill}
                color='#000'
                content={
                    <>
                    <hr className={css(styles.hr)}/>
                    <SendButton title='Enviar para cozinha' handleClick={(e) => sendOrder(e)} />
                    </>
                }

            />
        </section>
        </>
    );
};

const styles = StyleSheet.create({
    h3: {
        marginTop: '-0.2vh',
        '@media (min-width: 1281px)': {
            fontSize: 16
        }
    },

    hr: {
        width: '100%'
    },

    clientInfo: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ff4a4a',
        color: '#fff',
        fontSize: 20,
        borderRadius: 12,
        padding: 2,
        marginTop: -2,
        marginBottom: 12,
        '@media (min-width: 1281px)': {
            paddingLeft: 1,
            fontSize: 16,
            width: '25vw',
            marginTop: -8
        }
    },

    productOrder: {
        display: 'flex',
        minHeight: '38vw',
        flexDirection: 'column',
        '@media (min-width: 1281px)': {
            minHeight: '52vh', 
        }
    },

    price: {
        fontSize: 20,
        fontWeight: 'bold',
        '@media (min-width: 1281px)': {
            fontSize: 17
        }
    },
})