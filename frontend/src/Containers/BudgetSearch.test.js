/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import BudgetSearch from './BudgetSearch';

import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';

import * as actionCreators from '../store/actions/cosmos';

const stubInitialState = {
  selectedUser: {
    id: 1,
    email: 'TEST_EMAIL',
    password: 'TEST_PASS',
    name: 'TEST',
    logged_in: false,
  },
  Users: [
    {
      id: 1,
      email: 'TEST_EMAIL',
      password: 'TEST_PASS',
      name: 'TEST',
      logged_in: false,
    },
    {
      id: 2,
      email: 'TEST_EMAIL2',
      password: 'TEST_PASS2',
      name: 'TEST2',
      logged_in: false,
    },
    {
      id: 3,
      email: 'TEST_EMAIL3',
      password: 'TEST_PASS3',
      name: 'TEST3',
      logged_in: false,
    },
  ],
};

const mockStore = getMockStore(stubInitialState);

describe('<BudgetSearch />', () => {
  let budgetsearch; let spyGetUsers; let spyGetUser; let
    spylogout;
  beforeEach(() => {
    budgetsearch = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => (
                <BudgetSearch
                  {...props}
                  UserLogOut={spylogout}
                  onGETUSERS={spyGetUsers}
                  onGETUSER={spyGetUser}
                />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetUser = jest
      .spyOn(actionCreators, 'authCheckState')
      .mockImplementation(() => (dispatch) => {});
    spylogout = jest.spyOn(actionCreators, 'logout').mockImplementation((cosmos) => (dispatch) => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render BudgetSearch', () => {
    const component = mount(budgetsearch);
    const wrapper = component.find('BudgetSearch');
    expect(wrapper.length).toBe(1);
    expect(spyGetUser).toBeCalledTimes(1);
  });

  it('should deal range input', () => {});

  it('should call mypageHandler', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'replace')
      .mockImplementation((path) => {});
    const component = mount(budgetsearch);
    const wrapper = component.find('#my-page-button');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('../mypage/');
  });

  it('should call confirmhandler && alert', () => {
    window.alert = jest.fn();
    const component = mount(budgetsearch);
    const wrapper = component.find('#combine-cosmetics-button');
    wrapper.simulate('click');
    const newInstance = component
      .find(BudgetSearch.WrappedComponent)
      .instance();
    newInstance.setState({ budget_high: 0 });
    expect(window.alert).toHaveBeenCalledWith('Please set the budget range');
  });

  it('should call confirmhandler && NOT alert', () => {
    window.alert = jest.fn();
    const component = mount(budgetsearch);
    const newInstance = component
      .find(BudgetSearch.WrappedComponent)
      .instance();
    newInstance.setState({ budget_high: 0 });
    const wrapper = component.find('#combine-cosmetics-button');
    wrapper.simulate('click');
    expect(window.alert).toHaveBeenCalledWith('Please set the budget range');
  });

  it('should call set_itemnum', () => {
    const component = mount(budgetsearch);
    const newInstance = component
      .find(BudgetSearch.WrappedComponent)
      .instance();
    const wrapper = component.find('#item_num');
    wrapper.simulate('change', { target: { value: 3 } });
    expect(newInstance.state.item_num).toEqual(3);
  });
  it('should call setbudget', () => {
    window.alert = jest.fn();
    const component = mount(budgetsearch);
    const newInstance = component
      .find(BudgetSearch.WrappedComponent)
      .instance();
    const wrapper = component.find('#range2');
    wrapper.simulate('change', { target: { checked: true } });
    expect(window.alert).toBeCalledTimes(0);
  });
  it('shuld not select more than 1 checkbox', () => {
    window.alert = jest.fn();
    const component = mount(budgetsearch);
    const newInstance = component
      .find(BudgetSearch.WrappedComponent)
      .instance();
    const wrapper = component.find({ type: 'checkbox' });
    let i = 0;
    for (i = 0; i < 10; i++) {
      wrapper.at(i).simulate('click');
    }
  });

  it('should call logoutHandler', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'replace')
      .mockImplementation((path) => {});
    const component = mount(budgetsearch);
    const wrapper = component.find('#log-out-button');
    wrapper.simulate('click');
    expect(spyGetUser).toBeCalledTimes(2);
    expect(spylogout).toBeCalledTimes(1);
    expect(spyHistoryPush).toBeCalledTimes(1);
  });

  it('should redirect to /login when not logged_in', () => {
    const component = mount(budgetsearch);
    expect(component.find(Redirect)).toHaveLength(1);
  });
  it('should not redirect to /login when logged_in', () => {
    const mockInitialStore = getMockStore({
      selectedUser: {
        id: 1,
        email: 'TEST_EMAIL',
        password: 'TEST_PASS',
        name: 'TEST',
        logged_in: true,
      },
      Users: [
        {
          id: 1,
          email: 'TEST_EMAIL',
          password: 'TEST_PASS',
          name: 'TEST',
          logged_in: false,
        },
        {
          id: 2,
          email: 'TEST_EMAIL2',
          password: 'TEST_PASS2',
          name: 'TEST2',
          logged_in: false,
        },
        {
          id: 3,
          email: 'TEST_EMAIL3',
          password: 'TEST_PASS3',
          name: 'TEST3',
          logged_in: false,
        },
      ],
    });
    const component = mount(
      <Provider store={mockInitialStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => (
                <BudgetSearch
                  {...props}
                  UserLogOut={spylogout}
                  onGETUSERS={spyGetUsers}
                  onGETUSER={spyGetUser}
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
      Users: [
        {
          id: 1,
          email: 'TEST_EMAIL',
          password: 'TEST_PASS',
          name: 'TEST',
          logged_in: false,
        },
        {
          id: 2,
          email: 'TEST_EMAIL2',
          password: 'TEST_PASS2',
          name: 'TEST2',
          logged_in: false,
        },
        {
          id: 3,
          email: 'TEST_EMAIL3',
          password: 'TEST_PASS3',
          name: 'TEST3',
          logged_in: false,
        },
      ],
    });
    const component = mount(
      <Provider store={mockInitialStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => (
                <BudgetSearch
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
    const spyHistoryPush = jest.spyOn(history, 'replace');
    const mockInitialStore = getMockStore({
      selectedUser: {
        id: 1,
        email: 'TEST_EMAIL',
        password: 'TEST_PASS',
        name: 'TEST',
        logged_in: true,
      },
      Users: [
        {
          id: 1,
          email: 'TEST_EMAIL',
          password: 'TEST_PASS',
          name: 'TEST',
          logged_in: false,
        },
        {
          id: 2,
          email: 'TEST_EMAIL2',
          password: 'TEST_PASS2',
          name: 'TEST2',
          logged_in: false,
        },
        {
          id: 3,
          email: 'TEST_EMAIL3',
          password: 'TEST_PASS3',
          name: 'TEST3',
          logged_in: false,
        },
      ],
    });
    const component = mount(
      <Provider store={mockInitialStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => (
                <BudgetSearch
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
    expect(spylogout).toBeCalledTimes(1);
    expect(spyHistoryPush).toBeCalledTimes(1);
  });
});
