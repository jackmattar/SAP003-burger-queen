import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import './options.css';
import OptionsForm from '../optionsForm';
import growl from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';

export default function ProductCard (props){
  const [showOp, setShowOp] = useState(false);
  const [display, setDisplay] = useState('none');

  const style = StyleSheet.create({
    flex: {
      display: display,
    },
  });

  const showOptionsDiv = () => {
    setShowOp(!showOp)
    return (
      showOp === true ? (
        setDisplay('flex')
      ) : setDisplay('none')
    );
  };

  const handleSubmit = (e) => {
    props.handleSubmit(e);
    if (props.selectedOp === '') {
      growl({ text: 'ESCOLHA UMA OPÇÃO', type: 'warning', fadeAway: true, fadeAwayTimeout: 3000 })
    } else {
      showOptionsDiv();
    };
  };

  return (
    <section className={css(styles.flex)}>
      <div
        onClick={props.data.options ? showOptionsDiv : props.handleClick}
        id={props.id}
        className={css(styles.productCard, styles.flex)}
      >
        <img
          className={css(styles.imgProduct)}
          alt="product"
          src={props.data.img}
        />
        <span>
          {props.data.name}
          <br /> R$ {props.data.price}
        </span>

      </div>
      {
        props.data.options
          ? (
            <div className={css(style.flex, styles.modal)}>
              <OptionsForm
                {...props}
                handleSubmit={(e) => handleSubmit(e)}
                setOption={props.setOption}
                additionals={props.data.additional}
              />
            </div>
          )
          : false
      }
    </section>
  );
};

const styles = StyleSheet.create({
  flex: {
    display: 'flex'
  },

  productCard: {
    flexDirection: 'column',
    margin: '1.5vh',
    '@media (min-width: 1281px)': {
      margin: '1vh',
      fontSize: 14
    }
  },

  imgProduct: {
    height: '14.5vh',
    width: '17.5vw',
    borderRadius: 10,
    '@media (min-width: 1281px)': {
      width: '12vw'
    }
  },

  modal: {
    padding: '1vw',
    borderRadius: 20,
    height: '30vh',
    width: '35vw',
    backgroundColor: '#0d0d0d',
    color: '#fff',
    '@media (min-width: 1281px)': {
      height: '27vh',
      width: '20vw',
    }
  }
})