import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const SendButton = (props) => {
    return (
        <button className={css(styles.sendOrder)} onClick={props.handleClick}>
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
        marginLeft: '50%',
        fontSize: 16,
        fontWeight: 'bold'
      },
});

export default SendButton