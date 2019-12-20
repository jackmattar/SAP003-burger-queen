import React, { useState, useEffect, useReducer} from 'react';
import {db} from './firebase.js';
import { StyleSheet, css } from 'aphrodite';
import Button from './components/button';
import ProductButton from './components/productButton';
import Order from './components/orderDiv';
import MenuContainer from './components/menuContainer';
import Input from './components/input';

function App() {
  const [menus, setMenus] = useState([]);
  const [product, setProduct] = useState([]);
  const [client, setClient] = useState('');
  const [table, setTable] = useState('');
  const [order, setOrder] = useState([]);
  const [totalBill, setTotalBill] = useState([0]);
    
  useEffect(() => {
    db.collection('Menu')
    .get()
    .then((querySnapshot) => {
      const productsMenu = querySnapshot.docs.map((doc) => ({
          id: doc.id, data: doc.data()
      }));
      setMenus(productsMenu);
    });
  }, []);

  const chosenMenu = (event) => {
    const id = event.target.id;
    if(id === 'all'){
      console.log('oi')
      return setProduct(menus)
    } else {
      const validate = (id === 'breakfast')? true : false;
      const products = menus.filter((product) => product.data.breakfast === validate);
      return setProduct(products)
    }
    
  };

  const clientName = (event) => {
    const inputValue = event.target.value
    setClient(inputValue)
  }

  const clientTable = (event) => {
    const inputValue = event.target.value
    setTable(inputValue)
  }

  const criateOrder = (event) => {
    const content = event.target.textContent
    const id = event.target.id
    const contentArray = content.split('R$')
    setOrder([...order, 
      {
        name: contentArray[0], 
        price: contentArray[1],
        id: id,
        totalBill: setTotalBill([...totalBill, Number(contentArray[1])])
      }
    ])
  }

  const styles = StyleSheet.create({
    orderInfo: {
      padding: '2vh',
      borderRadius: 7,
      backgroundColor: '#4F3E9C',
      width: '80%',
      color: '#ffffff'
    },

    forms: {
      display: 'flex',
      flexDirection: 'row'
    },

    orderDiv: {
      padding: '5vh',
      backgroundColor: '#FBFBFB',
      width: '30vw',
      height: '100vw'
    },

    totalBill: {
      display: 'flex',
      direction: 'row',
      justifyContent: 'space-between',
    },
    
    mainContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },

    menuContainer: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column'
    },

    menu: {
      display: "flex",
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '70vw',
    },

  });

  return (
    <>
    <main className ={css(styles.mainContainer)}>
      <div className ={css(styles.menuContainer)} >
        
        <form className ={css(styles.forms)}>
          <Input
            label = 'Nome do cliente'
            type = 'text'
            onChange = {clientName}
          />
          <Input
            label = 'Mesa'
            type = 'number'
            onChange = {clientTable}
          />
        </form>
       
        <p className ={css(styles.menu)} >
        <Button 
            img= 'http://bit.ly/2S90vuo'
            onClick = {chosenMenu}
            title ='Menu Completo'
            id= 'all'
          />
          <Button 
            img= 'http://bit.ly/35FQFUT'
            onClick = {chosenMenu}
            title ='Café da Manhã'
            id = 'breakfast'
          />
          <Button
            img= 'http://bit.ly/38QUoAV'
            onClick = {chosenMenu} 
            title ='Restante do dia'
          />
        </p>

        <MenuContainer
          className= {css(styles.menu)}
          content= {product.map((product) => {
            return ( 
            
               <ProductButton
                key = {product.id}
                img= {product.data.img}
                title = {product.data.name}
                price = {product.data.price}
                handleClick = {criateOrder}
                handleImgClick = {criateOrder}
                id ={product.id}
              /> 
             
            )},
          )}
          
        />
      </div>
      <Order 
        className= {css(styles.orderDiv)}
        content= {
          <section>
            <p>Meu Pedido</p>
            <div className= {css(styles.orderInfo)}>
              <p>Cliente : {client} </p>
              <p>Nº da mesa : {table} </p>
            </div>
            <section >
              <div className= {css(styles.totalBill)}>
                <article>
                  {order.map((item) => {
                    return <p key={item.id}>{item.name} {'R$'}{item.price}</p>
                  })}
                  <div className= {css(styles.totalBill)}>
                    <p>Total R$</p>
                    
                    {/* <p>R$</p> */}
                    <p>{totalBill.reduce((accumulator, currentValue) => accumulator + currentValue)}</p>
                    <p>
                      <button onClick={()=>{console.log('enviado')}}>Enviar Pedido</button>
                    </p>
                    
                  </div>
                 </article>
                 
                
              </div>
            </section>
          </section>
        }
      />
    </main>
    </>
  );
}

export default App;

