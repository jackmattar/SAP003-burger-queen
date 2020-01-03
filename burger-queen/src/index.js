import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Hall from './pages/Hall';
import Kitchen from './pages/Kitchen';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Kitchen />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
