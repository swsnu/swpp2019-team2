import * as articleActions from './cosmos';
import { shallow } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import store from '../store';
import { createBrowserHistory } from 'history';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);



const td_user = {
  id: 0,
  token: null,
  error: null,
  loading: false
}



describe('article', () => {
  describe('actions', () => {

    beforeEach(function () {
      moxios.install();
      history = { push: jest.fn() };
    });
    

    afterEach(function () {
      moxios.uninstall();
    });





    it('GET_LIP', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
        });
      });
      const expectedActions =[
        { type: 'GET_LIP', Lip: undefined },
      ];
      const store = mockStore();
      return store.dispatch(articleActions.getLips()).then(() => {expect(store.getActions()).toEqual(expectedActions);})
    });








    it('AUTH_START', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
        });
      });
      const expectedActions =[];
      const store = mockStore();
      return expect(store.getActions()).toEqual(expectedActions);
    });

    it('AUTH_SUCCESS', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
        });
      });
      const expectedActions =[];
      const store = mockStore();
      store.dispatch(articleActions.authSuccess);
      return expect(store.getActions()).toEqual(expectedActions);
    });


    it('AUTH_FAIL', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
        });
      });
      const expectedActions =[];
      const store = mockStore();
      store.dispatch(articleActions.authFail);
      return expect(store.getActions()).toEqual(expectedActions);
    });



    it('AUTH_LOGOUT', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
        });
      });
      const expectedActions =[];
      const store = mockStore();
      return expect(store.getActions()).toEqual(expectedActions);})
    });


    it('AUTH_SIGNUP', (done) => {
      const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, td) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: td_user
          };
          resolve(result);
        });
      })

    store.dispatch(articleActions.authSignup());
      done();
    });
    
  it('AUTH_LOGIN', (done) => {
    const spy = jest.spyOn(axios, 'post')
    .mockImplementation((url, td) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: td_user
        };
        resolve(result);
    });
  })

store.dispatch(articleActions.authLogin());
  done();

});

  it('AUTH_LOGOUT', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        type: 'AUTH_SUCCESS',
      });
    });
    const expectedActions =[];
    const store = mockStore();
    return expect(store.getActions()).toEqual(expectedActions);})
});
    


