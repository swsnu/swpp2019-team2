<<<<<<< HEAD:frontend/src/test-utils/mocks.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';                                           
import { connectRouter } from 'connected-react-router';
import { history, middlewares } from '../store/store';

=======
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';                                           
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { history, middlewares } from './store/store';
import * as actionTypes from './store/actions/actionTypes';
>>>>>>> ce5f934287255c8528127115e05d59f5a760cbee:frontend/src/mock.js

const getMockTodoReducer = jest.fn(
  initialState => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  }
);

export const getMockStore = (initialState) => {
  const mockTodoReducer = getMockTodoReducer(initialState);
  const rootReducer = combineReducers({
<<<<<<< HEAD:frontend/src/test-utils/mocks.js
    cosmos: mockCOSMOSReducer,
=======
    cs: mockTodoReducer,
>>>>>>> ce5f934287255c8528127115e05d59f5a760cbee:frontend/src/mock.js
    router: connectRouter(history),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)));
  return mockStore;
}
