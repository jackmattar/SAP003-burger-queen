import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Radio from '../radio';

export default function OptionsForm(props){
    return(
        <form className={css(styles.form, styles.flex)} onSubmit={props.handleSubmit}>
            <div id='options' className={css(styles.options)}>
                <h3>Opções de Hambúrguer</h3>
                {props.data.options.map((option) => {
                    return (
                    <p key={option} className={css(styles.flex ,styles.inputP)}>
                        <Radio
                            value={option}
                            id={option+props.data.name}
                            name='options'
                            onChange={(e)=> {props.setOption(e.target.value)}}
                            for={option+props.data.name}
                            title= {option}
                        />
                    </p>
                    )
                })}
            </div>
            <div className={css(styles.options)}>
            <h3>Extras por R$1?</h3>
            {props.data.additional.map(add => {
                return (
                <p key={add} className={css(styles.inputP, styles.flex)}>
                    <input className='input' type='checkbox' id={add + props.data.id}
                    value={add} name='extras' key={add}></input>
                    <label htmlFor={add+props.data.id}>{add}</label>
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
  
    form: {
      flexDirection: 'row',
      '@media (min-width: 1281px)': {
        marginTop: '-1vh'
      }
    },
    
    options:{
      paddingLeft: '1.3vw',
      width: '50%',
      '@media (min-width: 1281px)': {
        paddingLeft: 10,
        fontSize: 12
      }
    },
  
    inputP: {
      alignItems: 'center',
      fontSize: '2.2vh',
      '@media (min-width: 1281px)': {
        fontSize: 12,
        fontWeight: 'bold'
      }
    },
  
    sendButton: {
      borderRadius: 15,
      height: '5vw',
      width: '15vw',
      backgroundColor: '#F8D956',
      border: 'none',
      fontSize: 14,
      '@media (min-width: 1281px)': {
        height: '7vh',
        width: '9vw',
        borderRadius: 8,
        fontSize: 15
      }
    }
  })