import React, { useState, useEffect } from 'react';
import { db } from '../firebase.js';
import { StyleSheet, css } from 'aphrodite';
import SendButton from '../components/sendButton';
import MenuButton from'../components/menuButton';
import OptionsUl from'../components/optionsUl';
const hmh = require('hmh');

function Kitchen() {
    const [showOrder, setShowOrder] = useState([]);

    useEffect(()=>{
        db.collection('Pedidos')
        .where('status', '==', 'Em preparo')
        .onSnapshot((querySnapshot) => {
            const doc = querySnapshot.docs.map((doc) => ({
                id: doc.id, data: doc.data()
            }));
            setShowOrder(doc)
        });
    }, []);
    

    const chosenOrders = (event) => {
        const title = event.target.textContent;
        db.collection('Pedidos')
        .where('status', '==', event.target.textContent)
        .onSnapshot((querySnapshot) => {
            const doc = querySnapshot.docs.map((doc) => ({
                id: doc.id, data: doc.data()
            }));
            setShowOrder(doc)
        });
    };

    const changeStatus = (event,element) => {
        const buttonId= event.target.id;
        return buttonId === element.id ?
        (
            showOrder.forEach(item => {
                if(element.id === item.id){

                    if(element.data.status === 'Pronto para servir'){
                        const initialTime = element.data.initialTime;
                        const separator = initialTime.split(':');
                        const now = new Date();
                        const initialH = separator[0] + 'h';
                        const initialM = separator[1] + 'm';
                        let actualH = now.getHours().toLocaleString();
                        let actualM = now.getMinutes().toLocaleString();
                        actualH = actualH + 'h';
                        actualM = actualM + 'm';
                        const difference = (hmh.diff(`${initialH} ${initialM}`,`${actualH} ${actualM}`).toString());
                        element.data.totalTime = difference;
                    };

                    element.data.status === 'Em preparo'
                    ? element.data.status = 'Pronto para servir'
                    :(element.data.status = 'Pronto para servir'
                        ? element.data.status = 'Concluído'
                        :null
                    );

                    db.collection('Pedidos')
                    .doc(item.id)
                    .set(element.data)
                }
            })
        ) 
        :null;
    }

  return (
    <main className={css(styles.flex)}>
        <article className={css(styles.article, styles.flex)}>
            {showOrder.map((element)=>{
                return(
                    <section className={css(styles.mainSection, styles.flex)}>
                        <p>Cliente {element.data.client}</p>
                        <p>Mesa {element.data.table}</p>
                        <div>
                            Pedido {element.data.order.map( product => {
                                return(
                                    <>
                                    <p>
                                        <span>
                                            {product.data.count} x 
                                        </span>
                                        <span className={css(styles.productName)}>
                                            {product.data.name}
                                        </span>
                                    </p>
                                    <OptionsUl
                                        options={product.data.selectedOption}
                                        additionals={product.data.selectedAdd}
                                    />
                                    </>
                                )
                            })}
                        </div>
                        <p>Status: {element.data.status}</p>
                        <p>Entregue após {element.data.totalTime}</p>
                        <SendButton 
                            title={
                                element.data.status === 'Em preparo'
                                ? 'Pronto para servir' 
                                : element.data.status === 'Pronto para servir'
                                    ? 'Entregue'
                                    : 'Deletar'
                            }
                            handleClick={(event)=> changeStatus(event, element)}
                            style={styles.buttonOrder}
                            id={element.id}
                        />
                    </section>
                )
            })
            }
        </article>
        <aside className={css(styles.aside, styles.flex)}>
            <h3> Pedidos </h3>
            <hr className={css(styles.hr)}/>
            <MenuButton 
                title='Em preparo'
                style={styles.menuButton}
                img='http://bit.ly/2Qi1HKq'
                onClick={chosenOrders}
            />
            <MenuButton 
                title='Pronto para servir'
                style={styles.menuButton}
                img='http://bit.ly/2S90vuo'
                onClick={chosenOrders}
            />
            <MenuButton 
                title='Concluído'
                style={styles.menuButton}
                img='http://bit.ly/2FiLY7y'
                onClick={chosenOrders}
            />
        </aside>
    </main>
  )
};

const styles = StyleSheet.create({
    flex: {
        display: 'flex'
    },

    article:{
        width:'75vw',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '1.5vw',
        paddingRight: '-1.5vw'
    },

    mainSection: {
        flexDirection: 'column',
        width: '30vw',
        minHeight: 'min-content',
        border: 'solid 1px #000',
        margin: '1vw',
        padding: '2vw',
        borderRadius: 20
    },

    productName: {
        marginLeft: 5
    },

    buttonOrder: {
        marginLeft: '5vw'
    },

    aside: {
        alignItems: "center",
        flexDirection: 'column',
        width: '25vw',
        backgroundColor: '#FBFBF9',
        borderLeft: 'solid 1px #e8e6e6'
    },

    hr: {
        width: '90%'
    },

    menuButton: {
        width: '18vw',
        fontSize: 16
    }
});

export default Kitchen;