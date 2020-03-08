
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import 'materialize-css/dist/js/materialize.min'
import firebase from 'firebase/app';
import 'firebase/auth'
import { Provider } from 'react-redux';
//import { createStore, applyMiddleware } from 'redux';
import store from './store/index';


// TODO: Заныкать config
const firebaseConfig = {
    apiKey: "AIzaSyClWeGiKPJOiS99S0cS1WyvvRluLpcevWM",
    authDomain: "react-crm-sys.firebaseapp.com",
    databaseURL: "https://react-crm-sys.firebaseio.com",
    projectId: "react-crm-sys",
    storageBucket: "react-crm-sys.appspot.com",
    messagingSenderId: "739771095804",
    appId: "1:739771095804:web:0d4e9477fca60b5fb99579",
    measurementId: "G-5WL0VHBF6H"
};


firebase.initializeApp(firebaseConfig);
/* store.subscribe(() => console.log('ya juv ebaat'));
store.dispatch(userIsAuth());
store.dispatch(userNotAuth());
console.log(store.getState()) */
//const store = createStore(Navbar);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
);
//firebase.analytics();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
