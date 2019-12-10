/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';

import * as actionCreators from '../store/actions/cosmos';
import SalesInfo from './SalesInfo';

const stubStateC = {
  Users: [],
  isAuthenticated: false,
  User: [{
    nick_name: 'a', prefer_color: 'red', prefer_base: '19', prefer_brand: '라네즈',
  }],
  token: 'token',
};

const stubInitialState = {
  User: [{
    nick_name: 'a', prefer_color: 'red', prefer_base: '19', prefer_brand: '라네즈',
  }],
};

const mockStore = getMockStore(stubInitialState);
const mockStore2 = getMockStore(stubStateC);
describe('<SkinTone />', () => {
  let salesinfo; let spyGetUser; let spylogout; let spyUserInfo;
  beforeEach(() => {
    salesinfo = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={
                (props) => (
                  <SalesInfo {...props} />
                )
              }
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetUser = jest.spyOn(actionCreators, 'authCheckState')
      .mockImplementation(() => (dispatch) => {});
    spylogout = jest.spyOn(actionCreators, 'logout')
      .mockImplementation((user) => (dispatch) => {});
    spyUserInfo = jest.spyOn(actionCreators, 'getUser')
      .mockImplementation(() => (dispatch) => {});
    window.alert = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Sales Info', () => {
    const component = mount(salesinfo);
    const wrapper = component.find('SalesInfo');
    expect(wrapper.length).toBe(1);
  });

  it('should redirect to /login when not logged_in', () => {
    const component = mount(salesinfo);
    expect(component.find(Redirect)).toHaveLength(1);
  });
  it('should not redirect to /login when logged_in', () => {
    const mockInitialStore = getMockStore({
      selectedUser: {
        id: 1, email: 'TEST_EMAIL', password: 'TEST_PASS', name: 'TEST', logged_in: true,
      },
      Users: [{
        id: 1, email: 'TEST_EMAIL', password: 'TEST_PASS', name: 'TEST', logged_in: false,
      },
      {
        id: 2, email: 'TEST_EMAIL2', password: 'TEST_PASS2', name: 'TEST2', logged_in: false,
      },
      {
        id: 3, email: 'TEST_EMAIL3', password: 'TEST_PASS3', name: 'TEST3', logged_in: false,
      }],
    });
    const component = mount(salesinfo);
    expect(component.find(Redirect)).toHaveLength(1);
  });

  it('does not have a selectedUser', () => {
    const spyHistoryPush = jest.spyOn(history, 'push');
    const mockInitialStore = getMockStore({
      selectedUser: null,
      Users: [{
        id: 1, email: 'TEST_EMAIL', password: 'TEST_PASS', name: 'TEST', logged_in: false,
      },
      {
        id: 2, email: 'TEST_EMAIL2', password: 'TEST_PASS2', name: 'TEST2', logged_in: false,
      },
      {
        id: 3, email: 'TEST_EMAIL3', password: 'TEST_PASS3', name: 'TEST3', logged_in: false,
      }],
    });
    const component = mount(salesinfo);
    expect(component.find(Redirect)).toHaveLength(1);
  });
  it('does have a selectedUser && logged_in ', () => {
    const spyHistoryPush = jest.spyOn(history, 'push');
    const mockInitialStore = getMockStore({
      selectedUser: {
        id: 1, email: 'TEST_EMAIL', password: 'TEST_PASS', name: 'TEST', logged_in: true,
      },
      Users: [{
        id: 1, email: 'TEST_EMAIL', password: 'TEST_PASS', name: 'TEST', logged_in: false,
      },
      {
        id: 2, email: 'TEST_EMAIL2', password: 'TEST_PASS2', name: 'TEST2', logged_in: false,
      },
      {
        id: 3, email: 'TEST_EMAIL3', password: 'TEST_PASS3', name: 'TEST3', logged_in: false,
      }],
    });
    const component = mount(salesinfo);
    expect(component.find(Redirect)).toHaveLength(1);
  });
});

describe('<SalesInfo />', () => {
  let salesinfo; let spyGetUser; let spylogout; let spyUserInfo;
  let spyUserInfo2; let spyPutInfo2;
  beforeEach(() => {
    salesinfo = (
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={
                (props) => (
                  <SalesInfo {...props} />
                )
              }
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetUser = jest.spyOn(actionCreators, 'authCheckState')
      .mockImplementation(() => (dispatch) => {});
    spylogout = jest.spyOn(actionCreators, 'logout')
      .mockImplementation((user) => (dispatch) => {});
    spyUserInfo = jest.spyOn(actionCreators, 'getUser')
      .mockImplementation(() => (dispatch) => {});
    window.alert = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render SkinTone', () => {
    const component = mount(salesinfo);
    const wrapper = component.find('SalesInfo');
    expect(spyUserInfo).toBeCalledTimes(1);
  });
});
