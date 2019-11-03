import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import ReduxThunk from 'redux-thunk';
import { history } from '../store/store';

const getMockCosmosReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);

export const getMockStore = (stateC) => {
  const mockCosmosReducer = getMockCosmosReducer(stateC);
  const rootReducer = combineReducers({
    cosmos: mockCosmosReducer,
    router: connectRouter(history),
  });
  const mockStore = createStore(
    rootReducer,
    applyMiddleware(ReduxThunk, routerMiddleware(history)),
  );

  return mockStore;
};
