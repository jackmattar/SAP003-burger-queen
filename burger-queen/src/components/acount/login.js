import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Input from '../input';
import firebase from 'firebase';
import growl from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const makeLogin = (e) => {
        e.preventDefault()
        return (
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(user => console.log(user))
                .catch(error => {
                    growl(
                        {
                            text: "Verifique os dados e tente novamente",
                            type: 'error',
                            fadeAway: true,
                            fadeAwayTimeout: 3500
                        }
                    );
                })
        )
    }

    return (
        <section className={css(styles.mainSection)}>
            <h1 className={ css(styles.h1)}> Login </h1>
            <form onSubmit={(e) => makeLogin(e)} className={css(styles.mainSection, styles.form)}>
                <Input 
                    label='E-mail' 
                    type='email' 
                    auto='username' 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder= 'example@example.com' 
                />
                <Input 
                    label='Senha' 
                    type='password' 
                    auto='current-password' 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder= 'mínimo 6 dígitos'
                />
                <button className={css(styles.loginBtn)}>
                    Entrar
                </button>
            </form>
        </section>
    );
};

const styles = StyleSheet.create({
    mainSection: {
        display: 'flex',
        flexDirection: 'column',
    },

    form: {
        alignItems: "center"
    },

    loginBtn: {
        width: '20vw',
        height: '8vh',
        boxShadow: 'inset 0px 1px 0px 0px #ad1a00',
        background: 'linear-gradient(to bottom, #f03f39 5%, #ad321a 100%)',
        backgroundColor: '#f03f39',
        borderRadius: '16px',
        border: '1px solid #cc2200',
        display: 'inline-block',
        cursor: 'pointer',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 20,
        padding: '18px 22px',
        textDecoration: 'none',
        textShadow: '0px 1px 0px #66290e',
        ':hover': {
            background: 'linear-gradient(to bottom, #ad321a 5%, #f03f39 100%)',
         	backgroundColor: '#ad321a'
        },
        ':active': {
            position:'relative',
            top:3
        }
    },

    h1: {
        fontSize: '4vh',
        marginLeft: '1.5vw'
    }

});