/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import LoginLoading from './LoginLoading';

import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';

import * as actionCreators from '../store/actions/cosmos';

const stubStateC = {
  Users: [],
  isAuthenticated: false,
};

const stubInitialState = {
  selectedUser: {
    id: 1, email: 'TEST_EMAIL', password: 'TEST_PASS', name: 'TEST', logged_in: false,
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
};

const mockStore = getMockStore(stubInitialState);

describe('<SkinToneLoading />', () => {
  let skintoneloading; let spyGetUser; let spylogout; let spyAnalysis;
  beforeEach(() => {
    skintoneloading = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => (
                <LoginLoading
                  {...props}
                />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetUser = jest.spyOn(actionCreators, 'authCheckState')
      .mockImplementation(() => () => {});
    spylogout = jest.spyOn(actionCreators, 'getUser')
      .mockImplementation(() => () => {});
    spyAnalysis = jest.spyOn(actionCreators, 'getLogin')
      .mockImplementation(() => () => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render SkinToneLoading', () => {
    const component = mount(skintoneloading);
    const wrapper = component.find('LoginLoading');
    expect(wrapper.length).toBe(1);
    expect(spyGetUser).toBeCalledTimes(1);
  });

  it('should not redirect stay when logged in', () => {
    const component = shallow(
      <LoginLoading.WrappedComponent isAuthenticated={stubStateC} />,
    );
    const redirect = component.find('Redirect');
    expect(redirect.length).toBe(0);
  });

  it('should redirect to /login when not logged_in', () => {
    const component = mount(skintoneloading);
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
    const component = mount(
      <Provider store={mockInitialStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => (
                <LoginLoading
                  {...props}
                />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    expect(component.find(Redirect)).toHaveLength(1);
  });
});
