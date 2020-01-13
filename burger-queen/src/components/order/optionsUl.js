import React from 'react';
import {StyleSheet, css} from 'aphrodite';

const OptionsUl = (props) => {
    return(
        props.options
        ? (   
            <ul className={css(styles.extras)}>
                <li>{props.options}</li>
                {props.additionals.length !== 0 ?
                    (   <>
                        <li>{props.additionals[0] + ' extra'}</li>
                        {
                            props.additionals[1]
                            ? <li >
                                {props.additionals[1]  + ' extra'}
                              </li>
                            : null
                        }
                        </>
                    )
                    : null
                }
            </ul> 
        )
        : null
    );
};

const styles = StyleSheet.create({
    extras: {
        marginTop: -15,
        listStyleType: 'none'
    },
})

export default OptionsUl;