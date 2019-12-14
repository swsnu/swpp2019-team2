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
describe('<SalesInfo />', () => {
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
});
