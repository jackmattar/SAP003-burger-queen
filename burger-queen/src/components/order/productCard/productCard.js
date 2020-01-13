import React, {useState} from 'react';
import { StyleSheet, css } from 'aphrodite';
import './options.css';
import OptionsForm from '../optionsForm';

const ProductCard = (props) => {
  const [showOp, setShowOp] = useState(false);
  const [display, setDisplay] = useState('none');

  const style= StyleSheet.create({
    flex: {
      display: display
    }
  });

  const showOptionsDiv = () => {
    setShowOp(!showOp) 
    return(
      showOp === true ? (
        setDisplay('flex')
      ) : setDisplay('none')
    );
  };

  const banana = (e) => {
    props.handleSubmit(e)
    return showOptionsDiv;
  };

  return(
    <>
    <div 
      onClick={props.options ? showOptionsDiv : props.handleClick}
      id={props.id} 
      className={css(styles.productCard, styles.flex)}
    >
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
    {
      props.options
      ? (
        <div  className={css(style.flex, styles.modal)}>
          <OptionsForm
            title= {props.title}
            options= {props.options}
            handleSubmit= {(e) => banana(e)}
            setOption= {props.setOption}
            additionals= {props.additionals}
            id= {props.id}
          />
        </div>
        
      )
      : false
    }
    </>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  flex: {
    display: 'flex'
  },

  productCard:{
    flexDirection: 'column',
    margin: '1.5vh',
  },

  imgProduct: {
    height: '14.5vh',
    width: '17.5vw',
    borderRadius: 10
  },

  modal: {
    padding: '1vw',
    borderRadius: 20,
    height: '30vh',
    width: '35vw',
    backgroundColor: '#0d0d0d',
    color: '#fff'
  }
})