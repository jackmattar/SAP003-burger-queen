import React, { useState, useEffect } from 'react';
import { db } from './firebase.js';
import { StyleSheet, css } from 'aphrodite';
import Button from './components/button';
import ProductCard from './components/productCard';
import OrderParagraph from './components/paragraph'
import Container from './components/menuContainer';
import Input from './components/input';
import SendButton from './components/sendButton'

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
    setOrder([...order, product])
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
        <h2 className={css(styles.h2, styles.main)}> Selecione o menu
          <span role='img' alt-label='burger emoji'> 🍔</span>
        </h2>
        <Container
          content={
            <>
              <Button
                img='http://bit.ly/2S90vuo'
                onClick={chosenMenu}
                title='Menu Completo'
                id='all'
              />
              <Button
                img='http://bit.ly/35FQFUT'
                onClick={chosenMenu}
                title='Café da Manhã'
                id='breakfast'
              />
              <Button
                img='http://bit.ly/38QUoAV'
                onClick={chosenMenu}
                title='Restante do dia'
              />
            </>
          }
        />
        <Container
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
              />
            )
          },
          )}
        />
      </article>
      <aside className={css(styles.orderContainer)}>
        <h3>Meu Pedido</h3>
        {/* <section className={css(styles.clientInfo)}>
          <OrderParagraph
            title='Cliente'
            value={client.toUpperCase()}
            styles={styles.clientStyle}
          />
          <OrderParagraph
            title='Nº da mesa'
            value={table}
            styles={styles.clientStyle}
          />
        </section> */}
        <section className={css(styles.productOrder, styles.main)}>
          {order.map(item => {
            return (
              <OrderParagraph
                key={item.id}
                id={item.id}
                title={item.id}
                currency='R$'
                value={item.data.price}
                options={item.data.options}
                additionals={item.data.additional}
                count={order.length}
              />
            )
          })}
        </section>
        <section>
          <p className={css(styles.paragraph)}>
              <span className={css(styles.title)}>
                  Total
              </span>
              <span className={css(styles.price)}>
                  R$
                  {totalBill}
              </span>        
          </p>
          {/* <OrderParagraph
            title='Total'
            currency='R$ '
            value=
            {
              totalBill.reduce((accumulator, currentValue) =>
              accumulator + currentValue)
            }
            styles={styles.totalBill}
          /> */}
          <hr/>
          <SendButton title='Fazer pedido' />        
        </section>
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

  clientInfo: {
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#ff4a4a',
    color: '#fff',
    fontSize: 20,
    borderRadius: 12,
    padding: 2,
    marginTop: -12,
    marginBottom: 10
  },

  productOrder: {
    height: '45vw',
    flexDirection: 'column',
  },

  totalBill: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold'
  },

  title: {
    fontWeight: 'bold'
  },

  clientStyle: {
    color: '#fffeb3',
  },
});

export default App;