import React, {useState} from "react";
import Login from '../components/acount/login';
import Register from '../components/acount/register';
import { StyleSheet, css } from 'aphrodite';

export default function Init() {
    const [chosenScreen, setChosenScreen] = useState(<Login/>);

    const changeScreen = (e) => {
        const buttonTxtClicked = e.target.textContent;
        return(
            buttonTxtClicked === 'Login'
            ? setChosenScreen(<Login/>)
            : setChosenScreen(<Register/>)
        )   
    }

    return (
    <main className={css(styles.main)}>
            <article className={css(styles.article)}>
                <img className={css(styles.img)} src="https://i.ibb.co/W0F6X0X/logo.png" alt="logo"/>
                <section className={css(styles.buttonSection)}>
                    <button className={css(styles.btn)} onClick={(e) => changeScreen(e)}>
                        Login
                    </button>
                    <button className={css(styles.btn)} onClick={(e) => changeScreen(e)}>
                        Registre-se
                    </button>
                </section>          
            </article>
            <aside className={css(styles.aside)}>
                {chosenScreen}
            </aside>
    </main>
    );
}

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'row',
      },
  
      article: {
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'column',
        width: '55vw',
        backgroundColor: '#ff4a4a',
        minHeight: '100vh'
      },

      img: {
        width: '80%',
        height: '18%'
      },

      buttonSection: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '80%',
        height: '10%',
        marginTop: '5vh'
      },
      
      btn: {
        width: '20vw',
        borderRadius: 20,
        border: 'none'
      },

      aside: {
          width: '45vw'
      }
});