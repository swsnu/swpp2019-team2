/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import store from '../store';
import * as articleActions from './cosmos';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const tdUser = {
  id: 0,
  error: null,
  loading: false,
};

const tdUsertoken = {
  id: 0,
  token: null,
  error: null,
  loading: false,
};


describe('article', () => {
  describe('actions', () => {
    beforeEach(() => {
      moxios.install();
      // history = { push: jest.fn() };
    });


    afterEach(() => {
      moxios.uninstall();
    });


    it('GET_LIP', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
        });
      });
      const expectedActions = [
        { type: 'GET_PRODUCT', result: undefined },
      ];
      const store = mockStore();
      return store.dispatch(articleActions.getProducts()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });


    it('AUTH_START', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
        });
      });
      const expectedActions = [];
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
      const expectedActions = [];
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
      const expectedActions = [];
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
      const expectedActions = [];
      const store = mockStore();
      return expect(store.getActions()).toEqual(expectedActions);
    });
  });


  it('AUTH_SIGNUP_havetoken', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, td) => new Promise((resolve) => {
        const result = {
          status: 200,
          data: tdUser,
        };
        resolve(result);
      }));

    store.dispatch(articleActions.authSignup());
    done();
  });
  it('AUTH_SIGNUP_nothavetoken', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, td) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: tdUsertoken,
        };
        reject(result);
      }));

    store.dispatch(articleActions.authSignup());
    done();
  });

  it('AUTH_LOGIN', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, td) => new Promise((resolve) => {
        const result = {
          status: 200,
          data: null,
        };
        resolve(result);
      }));

    store.dispatch(articleActions.authLogin());
    done();
  });

  it('AUTH_LOGIN_reject', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, td) => new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: null,
        };
        reject(result);
      }));

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
    const expectedActions = [];
    const store = mockStore();
    return expect(store.getActions()).toEqual(expectedActions);
  });

  it('AUTH_check_reject', (done) => {
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, td) => new Promise((resolve) => {
        const result = {
          status: 200,
          data: tdUser,
        };
        resolve(result);
      }));

    store.dispatch(articleActions.authCheckState());
    done();
  });
});
