import React, {useState} from 'react';
import { StyleSheet, css } from 'aphrodite';
import './options.css';

const ProductCard = (props) => {
  const [show, setShow] = useState(false)
  const [display, setDisplay] = useState('none')

  const styles = StyleSheet.create({
    flex: {
      display: 'flex'
    },

    productCard:{
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
      padding: '1vw',
      borderRadius: 20,
      height: '30vh',
      width: '35vw',
      backgroundColor: '#0d0d0d',
      color: '#fff'
    },

    form: {
      justifyContent: 'space-around',
      flexDirection: 'row'
    },
    
    options:{
      paddingLeft: '1.5vw',
      width: '50%',
    },

    inputP: {
      alignItems: 'center',
      fontSize: '2.2vh'
    },

    sendButton: {
      borderRadius: 15,
      height: '6vw',
      width: '15vw',
      backgroundColor: '#F8D956',
      border: 'none',
      fontSize: 14,
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
    pdt.data.selectedAdd = selectedAdd;
    const price = pdt.data.price + selectedAdd.length;
    const newPdt = {
      id: pdt.id,
      data: {
        name: pdt.data.name,
        selectedAdd: selectedAdd,
        selectedOption: selectedOption,
        count: pdt.data.count,
        price: pdt.data.price,
        totalPrice: price,
      }
    };

    window.app.setOrder([...props.order, newPdt]);
    window.app.setTotalBill(window.app.totalBill + price);

    props.order.forEach(element => {
      const name = element.data.name === pdt.data.name
      const option = element.data.selectedOption === pdt.data.selectedOption;
      if(element.data.selectedAdd){
        const firstAdd = element.data.selectedAdd[0] === pdt.data.selectedAdd[0];
        const secondAdd = element.data.selectedAdd[1] === pdt.data.selectedAdd[1];
        if((option && name) && (firstAdd && secondAdd) === true){
          element.data.count = element.data.count+1;
          element.data.totalPrice = price;
          window.app.setOrder([...props.order]);
          window.app.setTotalBill(window.app.totalBill+price);
        } else {
          pdt.data.selectedAdd = selectedAdd;
          pdt.data.totalPrice = price;
          window.app.setOrder([...props.order, newPdt]);
          window.app.setTotalBill(window.app.totalBill + price);
        };
      }
    });

    return showOptionsDiv();
  }
  
  return (
    props.options?
    (
      <section className={css(styles.mainSection, styles.flex)}>    
        <div className={css(styles.productCard, styles.flex)} onClick={showOptionsDiv}>
          <img className={css(styles.imgProduct)} alt="product" src={props.img}/>
          <span>
            {props.title}
            <br/> R$ {props.price}
          </span>
        </div>
        <div className={css(styles.modal)}>
          <form className={css(styles.form, styles.flex)} onSubmit={(event)=> handleSubmit(event,props.item)}>
            <div id='options' className={css(styles.options)}>
              <h3>Opções de Hambúrguer</h3>
              {props.options.map((option) => {
                return (
                  <p key={option} className={css(styles.flex ,styles.inputP)}>
                    <input className='input' type='radio' value={option} name='options'
                      key={option} id={option + props.id} defaultChecked/>
                    <label htmlFor={option + props.id} >{option}</label>
                  </p>
                )
              })}
            </div>
            <div className={css(styles.options)}>
              <h3>Extras por R$1?</h3>
              {props.additionals.map(add => {
                return (
                  <p key={add} className={css(styles.inputP, styles.flex)}>
                    <input className='input' type='checkbox' id={add + props.id}
                      value={add} name='extras' key={add}/>
                    <label htmlFor={add + props.id}>{add}</label>
                  </p>
                )
              })}
              <button className={css(styles.sendButton)}>
                Adicionar ao pedido
              </button>
            </div>
          </form>
        </div>
      </section>
    )
    :
    <div onClick={props.handleClick} id={props.id} className={css(styles.productCard, styles.flex)}>
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

export default ProductCard;