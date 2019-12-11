/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';

import * as actionCreators from '../store/actions/cosmos';
// import SalesInfo from './SalesInfo';
import MyPage from './MyPage';

const stubStateC = {
  User: [{
    nick_name: 'a', prefer_color: 'red', prefer_base: '19', prefer_brand: '라네즈',
  }],
  User2: [{
    username: 'a', password: 'testp', email: 'teste',
  }],
  token: 'token',
};

const stubInitialState = {
  User: [{
    nick_name: 'a', prefer_color: 'red', prefer_base: '19', prefer_brand: '라네즈',
  }],
  User2: [{
    username: 'a', password: 'testp', email: 'teste',
  }],
};

const mockStore = getMockStore(stubInitialState);
const mockStore1 = getMockStore(stubStateC);
describe('<SkinTone />', () => {
  let mypage; let spyGetUser; let spylogout; let spyUserInfo;
  let spyUserInfo2; let spyPutInfo2;
  beforeEach(() => {
    mypage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={
                (props) => (
                  <MyPage {...props} />
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
    spyUserInfo2 = jest.spyOn(actionCreators, 'getUser2')
      .mockImplementation(() => (dispatch) => {});
    spyPutInfo2 = jest.spyOn(actionCreators, 'putUser2')
      .mockImplementation(() => (dispatch) => {});
    window.alert = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should call budgetHandler when clicking budget search button', () => {
    const spyHistoryReplace = jest
      .spyOn(history, 'replace')
      .mockImplementation(() => {});
    const component = mount(mypage);
    const button = component.find('#Budgetmenu');
    button.simulate('click');
    expect(spyHistoryReplace).toHaveBeenCalledWith('../budget');
  });
  it('should call toneHandler when clicking tone analysis button', () => {
    const spyHistoryReplace = jest
      .spyOn(history, 'replace')
      .mockImplementation(() => {});
    const component = mount(mypage);
    const button = component.find('#Tonemenu');
    button.simulate('click');
    expect(spyHistoryReplace).toHaveBeenCalledWith('../skintone');
  });
  it('should call searchHandler when clicking sale information button', () => {
    const spyHistoryReplace = jest
      .spyOn(history, 'replace')
      .mockImplementation(() => {});
    const component = mount(mypage);
    const button = component.find('#Searchmenu');
    button.simulate('click');
    expect(spyHistoryReplace).toHaveBeenCalledWith('../search');
  });
  it('should call saleHandler when clicking sale information button', () => {
    const spyHistoryReplace = jest
      .spyOn(history, 'replace')
      .mockImplementation(() => {});
    const component = mount(mypage);
    const button = component.find('#Salemenu');
    button.simulate('click');
    expect(spyHistoryReplace).toHaveBeenCalledWith('../sale');
  });
  it('should call saleHandler when clicking sale information button', () => {
    const spyHistoryReplace = jest
      .spyOn(history, 'replace')
      .mockImplementation(() => {});
    const component = mount(mypage);
    const button = component.find('#my-page-button');
    button.simulate('click');
    expect(spyHistoryReplace).toHaveBeenCalledWith('../mypage');
  });
  it('should call logoutHandler', () => {
    const spyHistoryReplace = jest
      .spyOn(history, 'replace')
      .mockImplementation(() => {});
    const component = mount(mypage);
    const wrapper = component.find('#log-out-button');
    wrapper.simulate('click');
    expect(spyGetUser).toBeCalledTimes(2);
    expect(spylogout).toBeCalledTimes(1);
    expect(spyHistoryReplace).toBeCalledTimes(1);
  });
  it('should call confirmHandler', () => {
    const spyHistoryReplace = jest
    .spyOn(history, 'push')
    .mockImplementation(() => {});
    const component = mount(mypage);
    const wrapper = component.find('#modify-button');
    wrapper.simulate('click');
    expect(spyHistoryReplace).toBeCalledTimes(1);
    expect(spyPutInfo2).toBeCalledTimes(1);
  });
});

