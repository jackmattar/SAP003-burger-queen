import React, { useState, useEffect} from 'react';
import {db} from './firebase.js';
import { StyleSheet, css } from 'aphrodite';
import Button from './components/button';
import ProductButton from './components/productButton';
import Order from './components/orderDiv';
import MenuContainer from './components/menuContainer';


function App() {
  const [menus, setMenus] = useState([]);
  // const [showMenu, setShowMenu] = useState([]);
  const [client, setClient] = useState('Jack');
  const [table, setTable] = useState('4')
  const [product, setProduct] = useState([])

  useEffect(() => {
    db.collection('Menu')
    .get()
    .then((querySnapshot) => {
      const productsMenu = querySnapshot.docs.map((doc) => ({
          id: doc.id, data: doc.data()
      }));
      setMenus(productsMenu);
    })
  }, [0])

  const chosenMenu = (event) => {
    const id = event.target.id
    const breakfast = (id === 'breakfast')? true: false
    const products = menus.filter((product) => product.data.breakfast === breakfast)
    return setProduct(products)
  }

  const styles = StyleSheet.create({
    productButton: {
      backgroundColor: '#ffe0b2',
      margin: '2vh',
      height: '15vh',
      width: '40vh',
      borderRadius: 5,
      border: 'none'
    },

    orderInfo: {
      padding: '2vh',
      borderRadius: 7,
      backgroundColor: '#ffca28',
      width: '80%'
    },

    orderDiv: {
      padding: '5vh',
      backgroundColor: '#fafafa',
      width: '25vw',
      height: '100vw'
    },

    totalBill: {
      display: 'flex',
      direction: 'row',
      justifyContent: 'space-between'
    },

    mainContainer: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  })

  return (
    <>
    <section className={css(styles.mainContainer)}>
      <div className={css(styles.menuContainer)} >
        <Button 
          className= {css(styles.productButton)}
          onClick= {chosenMenu}
          title='Café da Manhã'
          id= 'breakfast'
        />
        <Button 
          className= {css(styles.productButton)}
          onClick= {chosenMenu} 
          title='Restante do dia'
        />
        <MenuContainer
          className= {css(styles.menu)}
          content= {product.map((product) => {
            return ( 
              <ProductButton
                key = {product.id}
                title = {product.data.name}
                price = {product.data.price}
                onClick = {() => {return console.log(`produto clicado foi ${product.data.name}`)}}
              />
            )}
          )}
        />
      </div>
      <Order 
        className= {css(styles.orderDiv)}
        content= {
          <section>
            <p>Meu Pedido</p>
            <div className= {css(styles.orderInfo)}>
              <p>Nome do cliente: {client} </p>
              <p>Nº da mesa: {table} </p>
            </div>
            <section >
              <div className= {css(styles.totalBill)}>
                <p>Total</p>
                <p>R$</p>
                <p></p>
              </div>      
            </section>
          </section>
        }
      />
    </section>
    </>
  );
}

export default App;

// {menus.map((products) => (
//   (products.data.breakfast === false)
//   ? <ProductButton
//       key = {products.id}
//       title = {products.data.name}
//       price = {products.data.price}
//       onClick = {() => {return console.log(`produto clicado foi ${products.data.name}`)}}
//       />  
//   : null
//   ))
// }

// {menus.map((products) => (
//   (products.data.breakfast === true)
//   ? <ProductButton
//       key = {products.id}
//       title = {products.data.name}
//       price = {products.data.price}
//       onClick = {() => {return console.log(`produto clicado foi ${products.data.name}`)}}
//       />  
//   : null
//   ))
// }

// const chosenMenu = (event) => {
//   const id = (event.target.id)
//   const breakfast = (id === 'breakfast')? true : false;
  
//   const chosenProducts = menus.filter((products) => {
//     return (products.data.breakfast === breakfast)
//   })

//   setShowMenu(chosenProducts)
// }