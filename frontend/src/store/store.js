import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import Reducer from './reducers/cosmos';

export const history = createBrowserHistory();
const rootReducer = combineReducers({
<<<<<<< HEAD
  cosmos: COSMOSReducer,
=======
  cs: Reducer,
>>>>>>> ce5f934287255c8528127115e05d59f5a760cbee
  router: connectRouter(history),
});
export const middlewares = [thunk, routerMiddleware(history)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,
  composeEnhancers(
    applyMiddleware(...middlewares),
  ));

export default store;
