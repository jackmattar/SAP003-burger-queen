import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default function SimpleArticle (props){
    return(
        <article className={css(props.style)}>
            {props.content}
        </article>
    )
}

// const styles = StyleSheet.create({

// });