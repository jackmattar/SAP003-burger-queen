import React, {useState} from 'react';
import { StyleSheet, css } from 'aphrodite';

const ProductCard = (props) => {
  const [show, setShow] = useState(false)
  const [display, setDisplay] = useState('none')

  const styles = StyleSheet.create({
    productCard:{
      display: 'flex',
      flexDirection: 'column',
      margin: '1.5vh',
    },
  
    imgProduct: {
      height: '13vh',
      width: '22vh',
      borderRadius: 10
    },  

    modal: {
      display: display,
      height: '20vw',
      width: '40vw',
      backgroundColor: '#000',
      color: '#fff'
    },

    form: {
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'row'
    },

    mainSection: {
      display: 'flex',
      flexDirection: 'row'
    }
  })

  const showOptionsDiv = () => {
    setShow(!show) 
    return(
      show === true ? (
        setDisplay('block')
      ) : setDisplay('none')
    ) 
  }

  const handleSubmit = (event, pdt) => {
    event.preventDefault();
    const item = event.target;
    const selectedOption = item.options.value;
    const extras = item.extras;
    const selectedAdd = [];
    extras.forEach(element => {
      return element.checked ? selectedAdd.push(element.value):null
    });
    pdt.data.selectedOption = selectedOption;
    
    const price = pdt.data.price + selectedAdd.length;

    if(props.order.includes(pdt)){
      const firstAdd = selectedAdd[0] === pdt.data.selectedAdd[0];
      const secondAdd = selectedAdd[1] === pdt.data.selectedAdd[1];
      const option = pdt.data.selectedOption === selectedOption;
      
      if(option && (firstAdd && secondAdd) === true){
          pdt.data.count = pdt.data.count+1
          pdt.data.totalPrice = price
          window.app.setOrder([...props.order])
          window.app.setTotalBill(window.app.totalBill+price);
      } else {
        console.log('não é totalmente igual')
      }
    } else {
      pdt.data.selectedAdd = selectedAdd;
      pdt.data.totalPrice = price;
      window.app.setOrder([...props.order, pdt]);
      window.app.setTotalBill(window.app.totalBill + price);
    }
    return showOptionsDiv();
  }
  
  return (
    props.options?
    (
      <section className={css(styles.mainSection)}>    
        <div className={css(styles.productCard)} onClick={showOptionsDiv}>
          <img
            className={css(styles.imgProduct)} 
            alt="product" 
            src={props.img}
          />
          <span>
            {props.title}
            <br/> R$ {props.price}
          </span>
        </div>
        <div className={css(styles.modal)}>
          <form className={css(styles.form)} onSubmit={(event)=> handleSubmit(event,props.item)}>
            <div id='options'>
              <h3>Opções de Hambúrguer</h3>
              {props.options.map((option) => {
                return (
                  <p key={option}>
                    <input type='radio' value={option} name='options' key={option} defaultChecked/>
                    <label>{option}</label>
                  </p>
                )
              })}
            </div>
            <div>
              <h3>Extras por R$1?</h3>
              {props.additionals.map(add => {
                return (
                  <p key={add}>
                    <input type='checkbox' id='extras' value={add} name='options' key={add}/>
                    <label>{add}</label>
                  </p>
                )
              })}
            </div>
            <button>Adicionar ao pedido</button>
          </form>
        </div>
      </section>
    )
    :
    <div onClick={props.handleClick} id={props.id} className={css(styles.productCard)}>
      <img
        className={css(styles.imgProduct)} 
        alt="product" 
        src={props.img}
      />
      <span>
        {props.title}
        <br/> R$ {props.price}
      </span>
    </div>
  );
};

export default ProductCard
