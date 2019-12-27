import React, { useState, useEffect } from 'react';
import { db } from './firebase.js';
import { StyleSheet, css } from 'aphrodite';
import Button from './components/button';
import ProductCard from './components/productCard';
import OrderParagraph from './components/paragraph'
import Container from './components/menuContainer';
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

  const criateOrder = (event) => {
    const product = event.target
    const content = product.parentElement.textContent
    const contentArray = content.split('R$')

    setOrder([...order,
      {
        name: contentArray[0],
        price: contentArray[1],
        totalBill: setTotalBill([...totalBill, Number(contentArray[1])])
      }
    ])
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const item = event.target
    const product = item.parentElement.previousElementSibling.textContent
    const productInfos= product.split('R$')
    const selectedOption = item.options.value
    const extras = item.extras
    let selectedAdditional = []

    extras.forEach(element => {
      return (        
        element.checked === true
        ? selectedAdditional= [...selectedAdditional, element.value]
        : ''
      )
    });
    const price = Number(productInfos[1]) + Number(selectedAdditional.length)
    setOrder([...order,
      {
        name: productInfos[0],
        price: price,
        options: selectedOption,
        additional: selectedAdditional,
        totalBill: setTotalBill([...totalBill, price])
      }
    ])

    return window.app.showOptions()

  }

  return (
    <main className={css(styles.main)}>
      <article className={css(styles.menuContainer, styles.main)}>
        <form className={css(styles.forms, styles.main)}>
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
          content={product.map((product) => {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                img={product.data.img}
                title={product.data.name}
                price={product.data.price}
                options={product.data.options}
                additionals={product.data.additional}
                handleClick={criateOrder}
                handleSubmit= {handleSubmit}
              />
            )
          },
          )}
        />
      </article>
      <aside className={css(styles.orderDiv)}>
        <h3>Meu Pedido</h3>
        <section className={css(styles.orderInfo)}>
          <OrderParagraph
            title='Cliente'
            content={client.toUpperCase()}
            span={css(styles.clientInfo, styles.txtTop)}
            primarySpan={css(styles.txtTop)}
          />
          <OrderParagraph
            title='Nº da mesa'
            content={table}
            span={css(styles.clientInfo, styles.txtTop)}
          />
        </section>
        <section className={css(styles.orderContainer, styles.main)}>
          {order.map(item => {
            return (
              <OrderParagraph
                key={item.name}
                title={item.name}
                primaryContent='R$'
                content={item.price}
                span={css(styles.price)}
                primarySpan={css(styles.title)}
              />
            )
          })}
        </section>
        <section>
          <OrderParagraph
            title='Total'
            primaryContent='R$ '
            content={
              totalBill.reduce((accumulator, currentValue) =>
                accumulator + currentValue)
            }
            span={css(styles.title, styles.totalBill)}
          />
          <hr />
          <button className={css(styles.sendOrder, styles.title)}>
            Enviar pedido ⟶
          </button>
        </section>
      </aside>
    </main>
  );
}


const styles = StyleSheet.create({

  main: {
    display: 'flex',
  },

  banner: {
    width: '100%',
    borderRadius: 30,
    height: '25vh'
  },

  menuContainer: {
    width: '60vw',
    height: '100vh',
    flexDirection: 'column',
    alignItems: 'center',
  },

  forms: {
    flexDirection: 'row',
  },

  h2: {
    justifyContent: "flex-start",
    width: '89%'
  },

  orderInfo: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#ff4a4a',
    color: '#ffffff',
    flexDirection: 'column',
    height: '9vw',
    width: '35vw',
    fontSize: 20,
    marginTop: -10,
  },

  orderDiv: {
    padding: '1.5vw',
    backgroundColor: '#FBFBF9',
    width: '40vw',
    borderLeft: 'solid 1px #e8e6e6'
  },

  orderContainer: {
    height: '53vh',
    flexDirection: 'column',
    padding: 10,
  },

  totalBill: {
    fontSize: 20
  },

  order: {
    height: '60vh'
  },

  sendOrder: {
    display: 'flex',
    justifyContent: 'center',
    height: '7vw',
    width: '20vw',
    backgroundColor: '#F8D956',
    border: 'none',
    borderRadius: 15,
    padding: 15,
    marginLeft: '50%',
    fontSize: 16
  },

  price: {
    color: '#9c9898'
  },

  title: {
    fontWeight: 'bold'
  },

  clientInfo: {
    color: '#fffeb3',
  },

  txtTop: {
    marginTop: -10
  }
});

export default App;
// se tiver options quando o produto for clicado, abre uma abinha que mostra as options