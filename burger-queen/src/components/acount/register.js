import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Input from '../input';
import Radio from '../radio'
import firebase from 'firebase';
import { db } from '../../util/firebase';
import growl from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [sector, setSector] = useState('');

    const makeRegister = (e) => {
        e.preventDefault()
        if(name === '' || sector === ''){
            growl(
                {
                    text: "Preencha todos os campos",
                    type: 'error', 
                    fadeAway: true, 
                    fadeAwayTimeout: 3500
                }
            );
        } else {
            firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then( 
                user => {
                    user.user.updateProfile({
                        displayName: name
                    });

                    db.collection('Users')
                    .doc(user.user.uid)
                    .set({
                      sector,
                      name
                    });

                    growl(
                        {
                            text: "Cadastrado efetuado com sucesso",
                            type: 'success', 
                            fadeAway: true, 
                            fadeAwayTimeout: 3500
                        }
                    );
                }
            )
            .catch(error => {
                growl(
                    {
                        text: "Erro: Verifique os dados e tente novamente",
                        type: 'error', 
                        fadeAway: true, 
                        fadeAwayTimeout: 4000
                    }
                );
            });
        }
    }

    return (
        <section className={css(styles.mainSection)}>
            <h1 className={css(styles.h1)}>Registre-se</h1>
            <form className={css(styles.form, styles.mainSection)} onSubmit={(e) => makeRegister(e)}>
                <Input 
                    label='Nome' 
                    type='text' 
                    auto='username' 
                    onChange={(e) => setName(e.target.value)}
                    placeholder= 'Seu nome'
                />
                <Input 
                    label='E-mail' 
                    type='email' 
                    auto='current-email' 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder= 'example@example.com'
                />
                <Input 
                    label='Senha' 
                    type='password' 
                    auto='current-password' 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Mínimo 6 dígitos'
                />

                <div>
                    <h3 className={css(styles.h3)}>Setor</h3>
                    <p className={css(styles.radios)}>
                        <span className={css(styles.span)}>
                            <Radio
                                value='kitchen'
                                name='sector'
                                id='kitchen'
                                onChange={(e)=> setSector(e.target.value)}
                                for='kitchen'
                                title= 'Cozinha'
                            />
                        </span>
                        <span className={css(styles.span)}>
                            <Radio
                                value='waiter'
                                name='sector'
                                id='waiter'
                                onChange={(e)=> setSector(e.target.value)}
                                for='waiter'
                                title= 'Garçon / Garçonete'
                            />
                        </span>
                    </p>                    
                </div>

                <button className={css(styles.registerBtn)}>
                    Registrar
                </button>
            </form>
        </section>
    );
};

const styles = StyleSheet.create({
    mainSection: {
        display: 'flex',
        flexDirection: 'column'
    },

    h1: {
        fontSize: '4vh',
        marginLeft: '1.5vw'
    },

    form: {
        alignItems: 'center',
    },

    registerBtn: {
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
        },
        margin: '2vw',
    },

    radios: {
        display: "flex",
        flexDirection: 'row',
        padding: '2vw'
    },

    span: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '0.5vw',
        padding: 4,
        fontSize: 18
    },

    h3: {
        marginLeft: '3vw',
        fontSize: 20,
        marginBottom: '-1vw'
    }
});
