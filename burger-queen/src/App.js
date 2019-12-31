import React, { useState, useEffect } from 'react';
import { db } from './firebase.js';
import { StyleSheet, css } from 'aphrodite';
import MenuButton from './components/menuButton';
import ProductCard from './components/productCard';
import Order from './components/order'
import Section from './components/section';
import Input from './components/input';


function App() {
  const [menus, setMenus] = useState([]);
  const [product, setProduct] = useState([]);
  const [client, setClient] = useState('');
  const [table, setTable] = useState('');
  const [order, setOrder] = useState([]);
  const [totalBill, setTotalBill] = useState(0);

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

  const clientName = (event) => {
    const inputValue = event.target.value
    setClient(inputValue)
  }

  const clientTable = (event) => {
    const inputValue = event.target.value
    setTable(inputValue)
  }

  const chosenMenu = (event) => {
    const id = event.target.id;
    if (id === 'all') {
      return setProduct(menus)
    } else {
      const validate = (id === 'breakfast') ? true : false;
      const products = menus.filter((product) => product.data.breakfast === validate);
      return setProduct(products)
    }
  };

  const createOrder = (product) => {
    console.log(product)
    
    if(order.includes(product)){
      product.data.count = product.data.count+1;
    } else {
      setOrder([...order, product])
    }
    console.log(order)
    return setTotalBill(totalBill + Number(product.data.price))
  }

  window.app= {
    setOrder: setOrder,
    order: order,
    setTotalBill: setTotalBill,
    totalBill: totalBill
  }

  return (
    <main className={css(styles.main)}>
      <article className={css(styles.menuContainer, styles.main)}>
        <form className={css(styles.main)}>
          <Input
            label='Nome do cliente'
            type='text'
            onChange={clientName}
          />
          <Input
            label='Mesa'
            type='number'
            onChange={clientTable}
          />
        </form>
        <h2 className={css(styles.h2)}> Selecione o menu
          <span role="img"  aria-labelledby='burger emoji'> 🍔 </span>
        </h2>
        <Section
          style={styles.menu}
          content={
            <>
              <MenuButton
                img='http://bit.ly/2S90vuo'
                onClick={chosenMenu}
                title='Menu Completo'
                id='all'
              />
              <MenuButton
                img='http://bit.ly/35FQFUT'
                onClick={chosenMenu}
                title='Café da Manhã'
                id='breakfast'
              />
              <MenuButton
                img='http://bit.ly/38QUoAV'
                onClick={chosenMenu}
                title='Restante do dia'
              />
            </>
          }
        />
        <Section
          style={styles.menu}
          content={product.map((item) => {
            return (
              <ProductCard
                key={item.id}
                id={item.id}
                img={item.data.img}
                title={item.data.name}
                price={item.data.price}
                options={item.data.options}
                additionals={item.data.additional}
                handleClick={()=> createOrder(item)}
                item= {item}
                order={order}
              />
            )
           })
          }
        />
      </article>
      <aside className={css(styles.orderContainer)}>
        <Order 
          order={order}
          client={client}
          table={table}
          totalBill={totalBill}
        />
      </aside>
    </main>
  );
}

const styles = StyleSheet.create({

  main: {
    display: 'flex',
  },

  menuContainer: {
    width: '60vw',
    height: '100vh',
    flexDirection: 'column',
    alignItems: 'center',
  },

  h2: {
    justifyContent: "flex-start",
    width: '89%'
  },

  orderContainer: {
    padding: '1.5vw',
    backgroundColor: '#FBFBF9',
    width: '40vw',
    borderLeft: 'solid 1px #e8e6e6'
  },

  menu: {
    display: "flex",
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export default App;