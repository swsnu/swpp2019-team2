/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

// import SkinTone from './SkinTone';

import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';

import * as actionCreators from '../store/actions/cosmos';
import SalesInfo from './SalesInfo';

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

describe('<SkinTone />', () => {
  let salesinfo; let spyGetUser; let spylogout;
  beforeEach(() => {
    salesinfo = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={
                (props) => (
                  <SalesInfo
                    {...props}
                    Logout={spylogout}
                    onTryAutoSignup={spyGetUser}
                  />
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
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Sales Info', () => {
    const component = mount(salesinfo);
    const wrapper = component.find('SalesInfo');
    expect(wrapper.length).toBe(1);
  });

  it('should call mypageHandler', () => {
    const spyHistoryPush = jest.spyOn(history, 'replace')
      .mockImplementation((path) => {});
    const component = mount(salesinfo);
    const wrapper = component.find('#my-page-button');
    wrapper.simulate('click');
    expect(spyHistoryPush).toBeCalledTimes(2);
  });
  it('should go back to main page when clicking button', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'replace')
      .mockImplementation((path) => {});
    const component = mount(salesinfo);
    const wrapper = component.find('#back-button');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('../main');
  });

  it('should call logoutHandler', () => {
    const spyHistoryPush = jest.spyOn(history, 'replace')
      .mockImplementation((path) => {});
    const component = mount(salesinfo);
    const wrapper = component.find('#log-out-button');
    wrapper.simulate('click');
    expect(spyGetUser).toBeCalledTimes(2);
    expect(spylogout).toBeCalledTimes(1);
    expect(spyHistoryPush).toBeCalledTimes(1);
  });
  it('should not redirect stay when logged in', () => {
    const component = shallow(
      <SalesInfo.WrappedComponent isAuthenticated={stubStateC} />,
    );
    const redirect = component.find('Redirect');
    expect(redirect.length).toBe(0);
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
    const component = mount(
      <Provider store={mockInitialStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => (
                <SalesInfo
                  {...props}
                  Logout={spylogout}
                  onTryAutoSignup={spyGetUser}
                />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
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
    const component = mount(
      <Provider store={mockInitialStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => (
                <SalesInfo
                  {...props}
                  Logout={spylogout}
                  onTryAutoSignup={spyGetUser}
                />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    expect(component.find(Redirect)).toHaveLength(1);
    const wrapper = component.find('#log-out-button');
    wrapper.simulate('click');
    expect(spyGetUser).toBeCalledTimes(2);
    expect(spylogout).toBeCalledTimes(1);
    expect(spyHistoryPush).toBeCalledTimes(0);
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
    const component = mount(
      <Provider store={mockInitialStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => (
                <SalesInfo
                  {...props}
                  Logout={spylogout}
                  onTryAutoSignup={spyGetUser}
                />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    expect(component.find(Redirect)).toHaveLength(1);
    const wrapper = component.find('#log-out-button');
    wrapper.simulate('click');
    expect(spyGetUser).toBeCalledTimes(2);
    expect(spylogout).toBeCalledTimes(1);
    expect(spyHistoryPush).toBeCalledTimes(0);
  });
  it('should call budgetHandler when clicking budget search button', () => {
    const spyHistoryReplace = jest
      .spyOn(history, 'replace')
      .mockImplementation(() => {});
    const component = mount(salesinfo);
    const button = component.find('#Budgetmenu');
    button.simulate('click');
    expect(spyHistoryReplace).toHaveBeenCalledWith('../budget');
  });
  it('should call toneHandler when clicking tone analysis button', () => {
    const spyHistoryReplace = jest
      .spyOn(history, 'replace')
      .mockImplementation(() => {});
    const component = mount(salesinfo);
    const button = component.find('#Tonemenu');
    button.simulate('click');
    expect(spyHistoryReplace).toHaveBeenCalledWith('../skintone');
  });
  it('should call searchHandler when clicking sale information button', () => {
    const spyHistoryReplace = jest
      .spyOn(history, 'replace')
      .mockImplementation(() => {});
    const component = mount(salesinfo);
    const button = component.find('#Searchmenu');
    button.simulate('click');
    expect(spyHistoryReplace).toHaveBeenCalledWith('../search');
  });
});
