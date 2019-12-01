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
    expect(redirect.length).toBe(1);
  });
  it('should call mypageHandler', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'replace')
      .mockImplementation((path) => { });
    const component = mount(budgetsearch);
    const wrapper = component.find('#my-page-button');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('../mypage/');
  });
  it('should call confirmhandler and alert', () => {
    const mockSwal = jest.fn();
    const component = mount(budgetsearch);
    const button = component.find('#combine-cosmetics-button');
    button.prop('onClick')(mockSwal());
    expect(mockSwal).toHaveBeenCalledTimes(1);
  });
  it('should call confirmhandler and call handleClick', () => {
    const mockHandleChange = jest.fn();
    const mockSwal = jest.fn();
    const component = shallow(<BudgetSearch.WrappedComponent user={[{ nick_name: 'name' }]} />);
    const inputBar = component.find('#item_num');
    const wrapper = component.find('#select');
    wrapper.prop('onChange')({ value: 6 }, mockHandleChange());
    const mockConfirmHandler = jest.fn();
    const button = component.find('#combine-cosmetics-button');
    const resetButton = component.find('#reset-result');
    expect(component.state().budgetRange).toEqual([30000, 35000]);
    for (let i = 2; i <= 5; i++) {
      inputBar.simulate('change', { target: { value: i } });
      button.prop('onClick')(mockConfirmHandler());
      expect(mockConfirmHandler).toBeCalled();
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

  it('should call logoutHandler', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'replace')
      .mockImplementation((path) => { });
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
    const component = mount(budgetsearch);
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
    const component = mount(budgetsearch);
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
    const component = mount(budgetsearch);
    expect(component.find(Redirect)).toHaveLength(1);
    const wrapper = component.find('#log-out-button');
    wrapper.simulate('click');
    expect(spylogout).toBeCalledTimes(1);
    expect(spyHistoryPush).toBeCalledTimes(1);
  });
  it('should call budgetHandler when clicking budget search button', () => {
    const spyHistoryReplace = jest
      .spyOn(history, 'replace')
      .mockImplementation(() => { });
    const component = mount(budgetsearch);
    const button = component.find('#Budgetmenu');
    button.simulate('click');
    expect(spyHistoryReplace).toHaveBeenCalledWith('../budget');
  });
  it('should call toneHandler when clicking tone analysis button', () => {
    const spyHistoryReplace = jest
      .spyOn(history, 'replace')
      .mockImplementation(() => { });
    const component = mount(budgetsearch);
    const button = component.find('#Tonemenu');
    button.simulate('click');
    expect(spyHistoryReplace).toHaveBeenCalledWith('../skintone');
  });
  it('should call searchHandler when clicking sale information button', () => {
    const spyHistoryReplace = jest
      .spyOn(history, 'replace')
      .mockImplementation(() => { });
    const component = mount(budgetsearch);
    const button = component.find('#Searchmenu');
    button.simulate('click');
    expect(spyHistoryReplace).toHaveBeenCalledWith('../search');
  });
  it('should call saleHandler when clicking sale information button', () => {
    const spyHistoryReplace = jest
      .spyOn(history, 'replace')
      .mockImplementation(() => { });
    const component = mount(budgetsearch);
    const button = component.find('#Salemenu');
    button.simulate('click');
    expect(spyHistoryReplace).toHaveBeenCalledWith('../sale');
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