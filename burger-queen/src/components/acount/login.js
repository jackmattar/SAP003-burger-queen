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
            .then( user => console.log(user))
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
            <h2>Login</h2>
            <form onSubmit={(e) => makeLogin(e)}>
                <Input label='E-mail' type='email' auto='username' onChange={(e) => setEmail(e.target.value)}/>
                <Input label='Senha' type='password' auto='current-password' onChange={(e) => setPassword(e.target.value)}/>
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

  loginBtn: {
    width: '20vw',
    height: '8vh'
  }
});
