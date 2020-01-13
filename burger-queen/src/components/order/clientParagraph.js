import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default function ClientParagraph(props){

    const styles = StyleSheet.create({
        paragraph: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 10
        },

        title: {
            fontWeight: 'bold'
        },

        color: {
            color: (props.color)
        }
    });

    return (
        <>
        <p className= {css(styles.paragraph)}>
            <span className={css(styles.title)}>
                {props.title}
            </span>
            <span className={css(styles.color, props.style)}>
                {  
                    (props.primaryContent !== '') && (props.primaryContent === typeof String)
                    ? props.primaryContent.toUpperCase()
                    : props.primaryContent
                }
                {props.totalBill}
            </span>
        </p>
        {props.content}
        </>
    );
};
// : 