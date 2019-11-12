import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import cosmosReducer from './store/reducers/cosmos';
import * as serviceWorker from './serviceWorker';
import App from './App';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
const history = createBrowserHistory();
const rootReducer = combineReducers({
  cosmos: cosmosReducer, router: connectRouter(history),
});


const logger = (store) => (next) => (action) => {
  // console.log('[Middleware] Dispatching', action);
  const result = next(action);
  // console.log('[Middleware] Next State', store.getState());
  return result;
};

const store = createStore(rootReducer, applyMiddleware(logger, thunk, routerMiddleware(history)));

ReactDOM.render(<Provider store={store}><App history={history} /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
