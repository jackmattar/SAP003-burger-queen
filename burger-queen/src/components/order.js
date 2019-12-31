import React from 'react';
import {StyleSheet} from 'aphrodite';
import Section from './section';
import ProductParagraph from './productParagraph';
import Paragraph from './paragraph';
import SendButton from './sendButton';

const Order = (props) => {

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
                        key={item.id}
                        id={item.id}
                        title={item.id}
                        currency='R$'
                        value={item.data.price}
                        options={item.data.selectedOption}
                        additionals={item.data.selectedAdd}
                        setTotalBill={props.setTotalBill}
                        totalBill={props.totalBill}
                        order={props.order}
                        item={item}
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
                        <SendButton title='Enviar para cozinha' />
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