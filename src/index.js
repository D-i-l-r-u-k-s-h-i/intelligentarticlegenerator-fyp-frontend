// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware,compose} from 'redux';
import {createLogicMiddleware} from 'redux-logic'

import './index.css';

import services from './services';
import reducers from './reducers';

import App from './App';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.css';

//Creates redux-logic middleware
const logicMiddleware = createLogicMiddleware(services,{});

//Middlewares: applymiddleware() tells createStore() how to handle the middleware
const middleware = applyMiddleware(logicMiddleware)

//create enhancer for debugging the redux
const composeEnhancer =window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const enhancer = composeEnhancer(middleware);

//cretae store and use the enhancer to handle the debugging
let store = createStore(reducers, enhancer);

//must use provider to add the store to the app
const app = (
    <Provider store={store}>
        <App/>
    </Provider>
)


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
