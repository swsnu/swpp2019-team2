/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import SkinToneResult from './SkinToneResult';

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
  ML: {
    id: 1, product: { img_url: '', price: 0, brand: 'test' }, base: 'test', result_r: 0, result_g: 0, result_b: 0,
  },
};

const stubML = {
  id: 1, product: { img_url: '', price: 0, brand: 'test' }, base: 'test', result_r: 0, result_g: 0, result_b: 0,
};

const mockStore = getMockStore(stubInitialState);

describe('<SkinToneResult />', () => {
  let skintoneresult; let spyGetUsers; let spyGetUser; let spylogout; let spyAnalysis;
  beforeEach(() => {
    skintoneresult = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => (
                <SkinToneResult
                  {...props}
                  Logout={spylogout}
                  onTryAutoSignup={spyGetUser}
                  run_analysis={spyAnalysis}
                />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetUsers = jest.spyOn(actionCreators, 'authLogin')
      .mockImplementation(() => () => {});
    spyGetUser = jest.spyOn(actionCreators, 'authCheckState')
      .mockImplementation(() => () => {});
    spylogout = jest.spyOn(actionCreators, 'logout')
      .mockImplementation(() => () => {});
    spyAnalysis = jest.spyOn(actionCreators, 'runAnalysis')
      .mockImplementation(() => () => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render SkinToneResult', () => {
    const component = mount(skintoneresult);
    const wrapper = component.find('SkinToneResult');
    expect(wrapper.length).toBe(1);
    expect(spyGetUser).toBeCalledTimes(1);
  });
});
