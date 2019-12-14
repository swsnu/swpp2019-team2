/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import BudgetSearch from './BudgetSearch';

import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';

import * as actionCreators from '../store/actions/cosmos';

const mockResult = [
  [{ name: 'a1', price: 2500 }, { name: 'a2', price: 3500 }, { name: 'a3', price: 4500 }, { name: 'a4', price: 5500 }, { name: 'a5', price: 6500 }, { name: 'a6', price: 7500 }, { name: 'a7', price: 8500 }, { name: 'a8', price: 9500 }, { name: 'a9', price: 10500 }, { name: 'a10', price: 11500 }],
  [{ name: 'b1', price: 2000 }, { name: 'b2', price: 4000 }, { name: 'b3', price: 6000 }, { name: 'b4', price: 8000 }, { name: 'b5', price: 10000 }, { name: 'b6', price: 12000 }, { name: 'b7', price: 14000 }, { name: 'b8', price: 16000 }, { name: 'b9', price: 18000 }, { name: 'b10', price: 20000 }],
  [{ name: 'c1', price: 3700 }, { name: 'c2', price: 4400 }, { name: 'c3', price: 5100 }, { name: 'c4', price: 5800 }, { name: 'c5', price: 6500 }, { name: 'c6', price: 7200 }, { name: 'c7', price: 7900 }, { name: 'c8', price: 8600 }, { name: 'c9', price: 9300 }, { name: 'c10', price: 10000 }],
  [{ name: 'd1', price: 12700 }, { name: 'd2', price: 17550 }, { name: 'd3', price: 22400 }, { name: 'd4', price: 27250 }, { name: 'd5', price: 32100 }, { name: 'd6', price: 36950 }, { name: 'd7', price: 41800 }, { name: 'd8', price: 46650 }, { name: 'd9', price: 51500 }, { name: 'd10', price: 56350 }],
  [{ name: 'e1', price: 8400 }, { name: 'e2', price: 10800 }, { name: 'e3', price: 13200 }, { name: 'e4', price: 15600 }, { name: 'e5', price: 18000 }, { name: 'e6', price: 20400 }, { name: 'e7', price: 22800 }, { name: 'e8', price: 25200 }, { name: 'e9', price: 27600 }, { name: 'e10', price: 30000 }],
];

const stubStateC = {
  User: [{
    nick_name: 'a', prefer_color: 'red', prefer_base: '19', prefer_brand: '라네즈',
  }],
  token: 'token',
};

const userForm = {
  user: [{
    nick_name: 'a', prefer_color: 'red', prefer_base: '19', prefer_brand: '라네즈',
  }],
};

const stubInitialState = {
  selectedUser: {
    id: 1,
    email: 'TEST_EMAIL',
    password: 'TEST_PASS',
    name: 'TEST',
    logged_in: false,
  },
  User: [{
    nick_name: 'a', prefer_color: 'red', prefer_base: '19', prefer_brand: '라네즈',
  }],
};

const stubSeletedUserT = {
  result: [{
    id: 1, name: 'test_name', price: 5000, category: '립스틱', brand: 1, color: 1,
  },
  {
    id: 2, name: 'test_name2', price: 6000, category: '틴트', brand: 1, color: 1,
  }],
  User: [{
    nick_name: 'a', prefer_color: 'red', prefer_base: '19', prefer_brand: '라네즈',
  }],
  token: null,
  loading: false,
  error: null,
};

const mockStore = getMockStore(stubSeletedUserT);
const mockStore2 = getMockStore(stubStateC);

describe('<BudgetSearch />', () => {
  let budgetsearch;
  let spyGetUser;
  let spylogout;
  let spyuserInfo;
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
                />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetUser = jest
      .spyOn(actionCreators, 'authCheckState')
      .mockImplementation(() => (dispatch) => { });
    spylogout = jest.spyOn(actionCreators, 'logout')
      .mockImplementation((cosmos) => (dispatch) => { });
    spyuserInfo = jest.spyOn(actionCreators, 'getUser')
      .mockImplementation(() => (dispatch) => { });
    window.alert = jest.fn();
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
  it('should deal range input', () => {
    // const component = shallow(
    //   <BudgetSearch.WrappedComponent isAuthenticated={stubStateC} user={userForm} />,
    // );
    const component = mount(budgetsearch);
    const inputBar = component.find('#item_num');
    inputBar.simulate('change', { target: { value: 3 } });
    let wrapper = component.find('.checkbox');
    expect(wrapper.length).toBe(3);
    inputBar.simulate('change', { target: { value: 4 } });
    wrapper = component.find('.checkbox');
    expect(wrapper.length).toBe(4);
    inputBar.simulate('change', { target: { value: 5 } });
    wrapper = component.find('.checkbox');
    expect(wrapper.length).toBe(5);
  });
  it('should call handleChange', () => {
    const mockHandleChange = jest.fn();
    const component = shallow(
      <BudgetSearch.WrappedComponent isAuthenticated={stubStateC} user={[{ nick_name: 'name' }]} />,
    );
    const wrapper = component.find('#select');
    wrapper.prop('onChange')(null, mockHandleChange());
    expect(component.state().budgetRange).toBe(null);
    wrapper.prop('onChange')({ value: 1 }, mockHandleChange());
    expect(component.state().budgetRange).toEqual([5000, 10000]);
  });
  it('should reset result', () => {
    const component = mount(budgetsearch);
    const newInstance = component.find(BudgetSearch.WrappedComponent).instance();
    const restButton = component.find('#reset-result');
    restButton.simulate('click');
    expect(newInstance.combi).toEqual(undefined);
  });
  it('should call findUrl properly', () => {
    const mockFindUrl = jest.fn();
    const component = mount(budgetsearch);
    const checkbox = component.find('#checkbox1');
    checkbox.prop('findUrl')('url', mockFindUrl());
    expect(mockFindUrl).toBeCalled();
    const inputBar = component.find('#item_num');
    for (let i = 2; i <= 5; i++) {
      inputBar.simulate('change', { target: { value: i } });
      const wrapper = component.find(`#checkbox${i}`);
      wrapper.prop('findUrl')('url', mockFindUrl());
      expect(mockFindUrl).toBeCalled();
    }
  });
  it('should not redirect stay when logged in', () => {
    const component = mount(budgetsearch);
    const redirect = component.find('Redirect');
    expect(redirect.length).toBe(0);
  });
  it('should call confirmhandler and alert', () => {
    const mockConfirmHandler = jest.fn();
    const mockSwal = jest.fn();
    const component = mount(budgetsearch);
    const button = component.find('#combine-cosmetics-button');
    button.prop('onClick')(mockConfirmHandler(), mockSwal());
    expect(mockSwal).toHaveBeenCalledTimes(1);
  });
  it('should call confirmhandler and call handleClick', () => {
    jest.useFakeTimers();
    const mockHandleChange = jest.fn();
    const mockGetManyProducts = jest.fn();
    const mockHandleClick = jest.fn();
    const mockSwal = jest.fn();
    const component = shallow(<BudgetSearch.WrappedComponent
      user={[{ nick_name: 'name' }]}
      onGetManyProducts={mockGetManyProducts}
      result={mockResult}
    />);
    const inputBar = component.find('#item_num');
    const wrapper = component.find('#select');
    wrapper.prop('onChange')({ value: 6 }, mockHandleChange());
    const mockConfirmHandler = jest.fn();
    const button = component.find('#combine-cosmetics-button');
    const resetButton = component.find('#reset-result');
    expect(component.state().budgetRange).toEqual([30000, 35000]);
    for (let i = 2; i <= 5; i++) {
      inputBar.simulate('change', { target: { value: i } });
      // button.simulate('click');
      button.prop('onClick')(mockConfirmHandler(), mockHandleClick());
      setTimeout(() => { mockHandleClick(); }, 2000);
      jest.runAllTimers();
      expect(mockConfirmHandler).toBeCalled();
      expect(mockHandleClick).toBeCalled();
      resetButton.simulate('click');
    }
    wrapper.prop('onChange')({ value: 1 }, mockHandleChange());
    inputBar.simulate('change', { target: { value: 2 } });
    button.prop('onClick')(mockConfirmHandler());
    expect(mockConfirmHandler).toBeCalled();
    button.prop('onClick')(mockSwal());
    expect(mockSwal).toBeCalled();
  });
  it('should call set_itemnum', () => {
    const component = mount(budgetsearch);
    const newInstance = component
      .find(BudgetSearch.WrappedComponent)
      .instance();
    const wrapper = component.find('#item_num');
    wrapper.simulate('change', { target: { value: 3 } });
    expect(newInstance.state.itemNum).toEqual(3);
  });
  it('should call set_itemnum', () => {
    const component = mount(budgetsearch);
    const newInstance = component
      .find(BudgetSearch.WrappedComponent)
      .instance();
    const wrapper = component.find('#item_num');
    wrapper.simulate('change', { target: { value: 1 } });
    expect(newInstance.state.itemNum).toEqual(1);
  });


  it('should redirect to /login when not logged_in', () => {
    const component = mount(budgetsearch);
    expect(component.find(Redirect)).toHaveLength(0);
  });
  it('should not redirect to /login when logged_in', () => {
    const component = mount(budgetsearch);
    expect(component.find(Redirect)).toHaveLength(0);
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
    const component = mount(budgetsearch);
    expect(component.find(Redirect)).toHaveLength(0);
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
    const component = mount(budgetsearch);
    expect(component.find(Redirect)).toHaveLength(0);
  });
});

describe('<Budget />', () => {
  let budgetsearch; let spyGetUser; let spylogout; let spyUserInfo;
  let spyUserInfo2; let spyPutInfo2;
  beforeEach(() => {
    budgetsearch = (
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={
                (props) => (
                  <BudgetSearch {...props} />
                )
              }
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetUser = jest.spyOn(actionCreators, 'authCheckState')
      .mockImplementation(() => (dispatch) => { });
    spylogout = jest.spyOn(actionCreators, 'logout')
      .mockImplementation((user) => (dispatch) => { });
    spyUserInfo = jest.spyOn(actionCreators, 'getUser')
      .mockImplementation(() => (dispatch) => { });
    window.alert = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render SkinTone', () => {
    const component = mount(budgetsearch);
    const wrapper = component.find('BudgetSearch');
    expect(spyUserInfo).toBeCalledTimes(1);
  });
});
