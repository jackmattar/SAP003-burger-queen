import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Radio from '../radio';

export default function OptionsForm(props){

    return(
        <form className={css(styles.form, styles.flex)} onSubmit={props.handleSubmit}>
            <div id='options' className={css(styles.options)}>
                <h3>Opções de Hambúrguer</h3>
                {props.options.map((option) => {
                    return (
                    <p key={option} className={css(styles.flex ,styles.inputP)}>
                        <Radio
                            value={option}
                            id={option+props.title}
                            name='options'
                            onChange={(e)=> {props.setOption(e.target.value)}}
                            for={option+props.title}
                            title= {option}
                        />
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
                    value={add} name='extras' key={add}></input>
                    <label htmlFor={add+props.id}>{add}</label>
                </p>
                )
            })}
            <button className={css(styles.sendButton)}>
                Adicionar ao pedido
            </button>
            </div>
        </form>
    );
};

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
      display: 'flex',
      padding: '1vw',
      borderRadius: 20,
      height: '30vh',
      width: '35vw',
      backgroundColor: '#0d0d0d',
      color: '#fff'
    },
  
    form: {
      flexDirection: 'row',
      border: 'solid 1px #0d0d0d',
    },
    
    options:{
      paddingLeft: '1.3vw',
      width: '50%',
    },
  
    inputP: {
      alignItems: 'center',
      fontSize: '2.2vh'
    },
  
    sendButton: {
      borderRadius: 15,
      height: '5vw',
      width: '15vw',
      backgroundColor: '#F8D956',
      border: 'none',
      fontSize: 14,
    }
  
  })