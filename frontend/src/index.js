import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';


import thunk from 'redux-thunk';
import Reducer from './store/reducers/cosmos';
import * as serviceWorker from './serviceWorker';
import App from './App';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

const history = createBrowserHistory();
const rootReducer = combineReducers({ cs: Reducer, router: connectRouter(history) });
const store = createStore(rootReducer, applyMiddleware(logger, thunk, routerMiddleware(history)));

const logger = (store) => (next) => (action) => { // using function currying
  try {
    return next(action);
  } catch (err) {
    console.error('Catched error', err, action);
    throw (err);
  }
};


// At index.js of project root import { Provider } from ‘react-redux’;(slide 17)
ReactDOM.render(<Provider store={store}>
  {' '}
  <App history={history} />
  {' '}
                </Provider>, document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
