import React from 'react';
import {StyleSheet} from 'aphrodite';
import Section from './section';
import ProductParagraph from './productParagraph';
import Paragraph from './paragraph';
import SendButton from './sendButton';
import { db } from '../firebase';

const Order = (props) => {

    const sendOrder = () => {
        if ((props.client && props.table) === ''){
            alert('Preencha Nome do cliente e Mesa')
        } else if(props.order.length === 0) {
            alert('Adicione produtos ao pedido')
        } else {
            const now = new Date();
            const h = now.getHours();
            const m = now.getMinutes();
            const s = now.getSeconds();
            const hour = `${h}:${m}:${s}`
            
            const order = {
                client: props.client.toUpperCase(),
                table: props.table,
                order: props.order,
                status: 'Em preparo',
                initialTime: hour,
                totalTime: ''
            };
    
            db.collection('Pedidos')
            .doc(props.id)
            .set(order);

            alert('Pedido enviado');
            props.setOrder([]);
            props.setTotalBill(0);
            props.setClient('');
            props.setTable('');
        }
    }

    return (
        <>
        <h3> Meu Pedido </h3>
        <Section
            style={styles.clientInfo}
            content={
                <>
                <Paragraph
                    title='Cliente'
                    primaryContent={props.client}
                    color='#fffeb3'
                />
                <Paragraph
                    title='Mesa'
                    primaryContent={props.table}
                    color='#fffeb3'
                />
                </>
            }
        />
        <Section
            style={styles.productOrder}
            content={
                (props.order).map(item => {
                    return (
                        <ProductParagraph
                        key={item.id+item.data.selectedAdd+item.data.selectedOption}
                        id={item.id+item.data.selectedAdd+item.data.selectedOption}
                        title={item.data.name}
                        currency='R$'
                        value={item.data.price}
                        totalPrice={item.data.totalPrice}
                        options={item.data.selectedOption}
                        additionals={item.data.selectedAdd}
                        setTotalBill={props.setTotalBill}
                        totalBill={props.totalBill}
                        order={props.order}
                        item={item}
                        count={item.data.count}
                        />
                    )
                })
            }
        />
        <Section
            content= {
                <Paragraph
                    title='Total'
                    style={styles.price}
                    primaryContent='R$'
                    totalBill={props.totalBill}
                    color='#000'
                    content={
                        <>
                        <hr/>
                        <SendButton title='Enviar para cozinha' handleClick={sendOrder} />
                        </>
                    }

                />
            }
        />
        </>
    );

}

const styles = StyleSheet.create({
    clientInfo: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ff4a4a',
        color: '#fff',
        fontSize: 20,
        borderRadius: 12,
        padding: 2,
        marginTop: -2,
        marginBottom: 12
    },

    productOrder: {
        display: 'flex',
        height: '45vw',
        flexDirection: 'column',
    },
    
    price: {
        fontSize: 20,
        fontWeight: 'bold'
    },
})

export default Order;