import React, { useState, useEffect } from 'react';
import { db } from '../../util/firebase';
import { StyleSheet, css } from 'aphrodite';
import Input from '../../components/input';
import MenuButton from '../../components/menuButton';
import ProductCard from '../../components/order/productCard/productCard';
import OrdeSection from '../../components/order/orderSection';
import Header from '../../components/header';

export default function NewOrder (){
    const [allMenu, setAllMenu] = useState([]);
    const [chosenMenu, setChosenMenu] = useState([]);
    const [client, setClient] = useState('');
    const [table, setTable] = useState('');
    const [order, setOrder] = useState([]);
    const [selectedOp, setOption] = useState('');
    const [totalBill, setTotalBill] = useState(0);

    useEffect(() => {
        db.collection('Menu')
            .get()
            .then((querySnapshot) => {
                const productsMenu = querySnapshot.docs.map((doc) => ({
                    id: doc.id, data: doc.data()
                }));
                setAllMenu(productsMenu)
                setChosenMenu(productsMenu);
            });
    }, []);

    const chooseMenu = (e) => {
        const chosenBtnId= e.target.id
        if(chosenBtnId === 'all') {
            setChosenMenu(allMenu)
        } else {
            const validateBreakfast = chosenBtnId === 'breakfast'
            return setChosenMenu(allMenu.filter((product) => product.data.breakfast === validateBreakfast))
        };
    };

    const createOrder = (product, e) => {
        if(order.includes(product)){
            product.data.count = product.data.count + 1;
        } else {
            product.data.totalPrice = product.data.price
            setOrder([...order, product])
        };
        return setTotalBill(totalBill + product.data.price)  
    };

    const createOrderWithOp = (product, e) => {
        e.preventDefault();
        if(selectedOp !== ''){
            const extras = [];

            e.target.extras.forEach(element => {
                return element.checked ? extras.push(element.value) : false;
            });
            
            product.data.selectedOption = selectedOp;
            product.data.selectedAdd = extras;
            const price = product.data.price + extras.length;

            const newPdt = {
                id: product.id,
                data: {
                    name: product.data.name,
                    selectedAdd: extras,
                    selectedOption: selectedOp,
                    count: product.data.count,
                    price: product.data.price,
                    totalPrice: price,
                }
            };

            setOrder([...order, newPdt]);
            setTotalBill(totalBill + price);

            order.forEach( item => {
                const name = item.data.name === product.data.name;
                const options = item.data.selectedOption === product.data.selectedOption;
                if(item.data.selectedAdd){
                    const primaryAdd = item.data.selectedAdd[0] === product.data.selectedAdd[0];
                    const secondAdd = item.data.selectedAdd[1] === product.data.selectedAdd[1];
                    if((name && options) && (primaryAdd && secondAdd) === true){
                        item.data.count = item.data.count + 1;
                        item.data.totalPrice = price;
                        setOrder([...order]);
                        setTotalBill(totalBill+price);
                    };
                };
            });

            return e.target.extras.forEach(element => {
                return element.checked = false
            });

        };
    };

    return(
        <>
        <Header 
            primaryLink='Novo Pedido'
            primaryRoute='/waiter' 
            secondLink='Pedidos Prontos'
            secondRoute='/waiter-done-orders'
        />
        <article className={css(styles.flex)}>
            <section className={css(styles.article, styles.flex, styles.column)}>
                <div className={css(styles.div, styles.flex, styles.flow)}>
                    <Input 
                        label= 'Nome do Cliente'
                        type='text'
                        onChange={(e) => setClient(e.target.value)}
                        state={client}
                    />
                    <Input 
                        label= 'Mesa'
                        type='number'
                        onChange={(e) => setTable(e.target.value)}
                        state={table}
                    />
                </div>
                <h2 className={css(styles.h2)}>
                     Selecione o menu
                     <span role="img"  aria-labelledby='burger emoji'> 🍔 </span>
                </h2>
                <div className={css(styles.flex, styles.flow)}>
                    <MenuButton
                        img='https://i.ibb.co/KxKwRg6/menu-icon.png'
                        handleClick={(e) => chooseMenu(e)}
                        title='Menu Completo'
                        id='all'
                    />
                    <MenuButton
                        img='https://i.ibb.co/HqM4rp2/coffee-icon.png'
                        handleClick={(e) => chooseMenu(e)}
                        title='Café da Manhã'
                        id='breakfast'
                    />
                    <MenuButton
                        img='https://i.ibb.co/7KTh93M/burger-icon.png'
                        handleClick={(e) => chooseMenu(e)}
                        title='Restante do dia'
                    />
                </div>
                <div className={css(styles.flex, styles.flow, styles.wrap)}>
                    {chosenMenu.map(element => {
                        return (
                            <ProductCard
                                key={element.id}
                                id={element.id}
                                img={element.data.img}
                                title={element.data.name}
                                price={element.data.price}
                                options={element.data.options}
                                additionals={element.data.additional}
                                handleClick={(e) => createOrder(element)}
                                handleSubmit = {(e) => createOrderWithOp(element, e)}
                                setOption ={setOption}
                                item= {element}
                                selectedOp = {selectedOp}
                            />
                        )})
                    }
                </div>   
            </section>
            <section className={css(styles.aside)}>
                <OrdeSection
                    client= {client}
                    table= {table}
                    order= {order}
                    totalBill= {totalBill}
                    id = {new Date().getTime().toLocaleString()}
                    setOrder = {setOrder}
                    setTotalBill = {setTotalBill}
                    setClient = {setClient}
                    setTable = {setTable}
                />
            </section>
        </article>
        </>
    );
};

const styles = StyleSheet.create({
    flex: {
        display: 'flex',
    },

    flow: {
        flexDirection: 'flow'
    },

    column: {
        flexDirection: 'column'
    },

    wrap: {
        flexWrap: 'wrap'
    },

    div: {
        width: '100%',
        marginTop: '2vh',
        '@media (min-width: 1281px)': {
            marginTop: '3vh',
        }
           
    },

    article: {
        width: '60vw',
        paddingLeft: '2vw',
        '@media (min-width: 1281px)': {
            width: '75vw',
            paddingLeft: '7.5vw',
        }
    },

    h2: {
        marginTop: '-1vh',
        marginLeft: '1.5vw',
        '@media (min-width: 1281px)': {
            marginTop: '-1vh',
            marginLeft: '1vw',
            fontSize: 22
        }
    },

    aside: {
        padding: '1.5vw',
        backgroundColor: '#FBFBF9',
        width: '40vw',
        borderLeft: 'solid 1px #e8e6e6',
        minHeight: '650px',
        '@media (min-width: 1281px)': {
            width: '28vw',
            minHeight: 0,
        }
    }

});