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
    const [sector, setSector] = useState('kitchen')

    const makeRegister = (e) => {
        e.preventDefault()
        if(name === ''){
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
            <h2>Registre-se</h2>
            <form onSubmit={(e) => makeRegister(e)}>
                <Input label='Nome' type='text' auto='username' onChange={(e) => setName(e.target.value)}/>
                <Input label='E-mail' type='email' auto='current-email' onChange={(e) => setEmail(e.target.value)}/>
                <Input label='Senha' type='password' auto='current-password' onChange={(e) => setPassword(e.target.value)}/>

                <div>
                    <h3>Setor</h3>
                    <Radio
                        value='kitchen'
                        name='options'
                        onChange={(e)=> setSector(e.target.value)}
                        for='kitchen'
                        title= 'Cozinha'
                    />
                    <Radio
                        value='waiter'
                        name='options'
                        onChange={(e)=> setSector(e.target.value)}
                        for='waiter'
                        title= 'Garçon / Garçonete'
                    />
                </div>

                <button className={css(styles.loginBtn)}>
                    Registrar
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

  loginBtn: {
    width: '20vw',
    height: '8vh'
  }
});
