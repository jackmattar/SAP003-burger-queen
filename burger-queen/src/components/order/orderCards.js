import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import OptionsUl from './optionsUl';
import SendButton from './sendButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { db } from '../../util/firebase';
const hmh = require('hmh');

export default function OrderCards(props) {

    const style = StyleSheet.create({
        visibility: {
            visibility: props.waiter ? 'hidden' : 'visible'
        }
    });

    const changeStatus = (id, order, status) => {
        id === order.id ? 
        props.allOrders.forEach(element => {
            if(element.id === id){
                if(status === 'Concluído'){
                    db.collection('Pedidos')
                   .doc(element.id)
                   .delete()
                } else if (status === 'Em preparo'){
                    element.data.status = 'Pronto para servir'
                    db.collection('Pedidos')
                    .doc(element.id)
                    .set(element.data)
                } else {
                    const initialTime = element.data.initialTime;
                    const separator = initialTime.split(':');
                    const now = new Date();
                    const initialH = separator[0] + 'h';
                    const initialM = separator[1] + 'm';
                    const actualH = now.getHours().toLocaleString()+'h';
                    const actualM = now.getMinutes().toLocaleString()+'m';
                    const difference = (
                        hmh.diff(`${initialH} ${initialM}`,`${actualH} ${actualM}`).toString()
                    );
                    element.data.totalTime = difference;
                    element.data.status = 'Concluído';

                    db.collection('Pedidos')
                    .doc(element.id)
                    .set(element.data);
                };
            }
        }) : console.log();
    };

    return (
        <section className={css(styles.mainSection, styles.flex)}>
            <div>
                <p className={css(styles.table)}>
                    Mesa {props.table}
                </p>
                <p className={css(styles.clientName)}>
                    Cliente {props.client}
                </p>
            </div>
            <div className={css(styles.delivCont, styles.flex, style.visibility)}>
                <p className={css(styles.pDeliv)}>Preparo</p>
                <p className={css(styles.delivered)}> 
                    <FontAwesomeIcon icon={faClock} key='fav'/> 
                    <time>{props.totalTime}</time>
                </p>
            </div>
            <p className={css(styles.clientName, styles.waiterName)}>
                Atendente {props.waiterName}
            </p>
            <hr className={css(styles.hr)}/>
            <p className={css(styles.status)}>
                <span>
                    Status :  
                </span>
                <span>
                    {props.status}
                </span>
            </p>
            <div className={css(styles.orderProducts)}>
                {props.order.map( product => {
                    return (
                        <>
                        <p key={product.data.name}>
                            <span className={css(styles.qnt)}>
                                {product.data.count} x 
                            </span>
                            <span className={css(styles.productName)}>
                                {product.data.name}
                            </span>
                        </p>
                        <OptionsUl
                            options={product.data.selectedOption}
                            additionals={product.data.selectedAdd}
                            key={props.id+product.data.selectedAdd}
                        />
                        </>
                    );
                })}
            </div>
            <SendButton 
                title={
                    props.status === 'Em preparo'
                    ? 'Pronto para servir' 
                    : props.status === 'Pronto para servir'
                        ? 'Entregue'
                        : 'Deletar'
                }
                handleClick={(event)=> changeStatus(event.target.id, props.orders, props.status)}
                style={styles.buttonOrder}
                id={props.id}
                key={props.id}
            />
        </section>
    );
};

const styles = StyleSheet.create({
    flex: {
        display: 'flex'
    },

    article:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '1.5vw',
        paddingRight: '-1.5vw',
        backgroundColor: '#EEEEEF',
        minHeight: 768
    },

    mainSection: {
        flexDirection: 'column',
        width: '26.3vw',
        height: 'min-content',
        margin: '1vw',
        padding: '2vw',
        borderRadius: 20,
        backgroundColor: '#fff',
        boxShadow: '0px 0px 10px 0px rgba(156, 156, 156, 0.678)',
        '@media (min-width: 1281px)': {
            width: '15vw',
            padding: '1vw'
        }
    },

    table: {
        fontWeight: 'bold',
        fontSize: '3vh',
        marginBottom: '-1.5vh',
    },

    clientName: {
        fontSize: 18,
        '@media (min-width: 1281px)': {
            fontSize: 14,
        }
    },

    waiterName: {
        marginTop: '-1vh',
        marginBottom: 10
    },

    pDeliv: {
        marginBottom: '-1vh',
        '@media (min-width: 1281px)': {
            fontSize: 14
        }
    },

    delivCont: {
        width: '10vw',
        alignItems: 'center',
        marginTop: '-13vh',
        marginLeft: '60%',
        flexDirection: 'column',
        '@media (min-width: 1281px)': {
            marginTop: '-13vh',
            width:'2vw',
            marginLeft: '70%',
        }
    },

    delivered: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#eb4034',
        padding: '1vw',
        color: '#fff',
        borderRadius: '2vw',
        width: '8vw',
        fontSize: 18,
        '@media (min-width: 1281px)': {
            width:'4.3vw',
            fontSize: 13,
            padding: '1.3vh'
        }
    },

    status: {
        display: 'flex',
        justifyContent: 'space-between',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        borderRadius: '2vw',
        padding: '1vw',
        backgroundColor: '#FC7443',
        '@media (min-width: 1281px)': {
            fontSize: 13.5,
            borderRadius: '0.8vw',
            padding: '1vh',
        }
    },

    hr: {
        width: '90%',
        '@media (min-width: 1281px)': {
            marginBottom: 1
        }
    },

    orderProducts: {
        width: '90%',
        minHeight: '30vh',
        borderRadius: '2vw',
        padding: '1vw',
        paddingLeft: '2vw',
        marginBottom: '2vw',
        backgroundColor: '#FBFBF9',
        boxShadow: ' inset 0px 0px 7px 0px rgba(156, 156, 156, 0.678)',
        fontSize: 20,
        '@media (min-width: 1281px)': {
            minHeight: '10vh',
            fontSize: 14,
            paddingLeft: '1vw',
            width: '85%',
            marginLeft: 3,
            marginBottom: '1vw',
            borderRadius: '1vw',
        }
    },

    qnt:{
        fontWeight: 'bold',
    },

    buttonOrder: {
        width: '18vw',
        fontSize: 16,
        marginLeft: '4.5vw',
        '@media (min-width: 1281px)': {
            marginLeft: 24,
            fontSize: 12
        }
    },

    productName: {
        marginLeft: 5
    }
});