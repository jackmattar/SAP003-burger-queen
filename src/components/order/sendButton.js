import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const SendButton = (props) => {
    return (
        <button 
            className={css(styles.sendOrder, props.style)} 
            onClick={props.handleClick}
            id={props.id}
        >
            {props.title}
        </button>
    );
};
  
const styles = StyleSheet.create({
    sendOrder: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        height: '6vw',
        width: '20vw',
        backgroundColor: '#F8D956',
        border: 'none',
        borderRadius: 15,
        padding: 8,
        marginLeft: '44%',
        fontSize: 16,
        fontWeight: 'bold',
        '@media (min-width: 1281px)': {
            height: '7vh', 
            marginLeft: '52%',
            width: '12vw',
            fontSize: 14,
        }
      },
});

export default SendButton