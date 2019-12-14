/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import 'jest-localstorage-mock';
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
    localStorage.clear();
  });
  it('should call confirmHandler', () => {
    const mockFn = jest.fn();
    localStorage.setItem('token', 'testToken');
    localStorage.setItem('preferColor', 'testColor');
    localStorage.setItem('preferBase', 'testBase');
    localStorage.setItem('preferBrand', 'testBrand');
    const spyHistoryReplace = jest
      .spyOn(history, 'push')
      .mockImplementation(() => {});
    const component = mount(mypage);
    const wrapper = component.find('#brand-input');
    wrapper.at(0).simulate('click');
    const wrapper2 = component.find('#modify-button');
    const newInstance = component.find(MyPage.WrappedComponent).instance();
    newInstance.setState({ preferBase: '21', preferColor: 'red' });
    wrapper2.simulate('click');
    expect(spyHistoryReplace).toBeCalledTimes(1);
    expect(spyPutInfo2).toBeCalledTimes(1);
  });
  it('should render with null data && without login', () => {
    localStorage.setItem('token', 'testToken');
    const component = mount(mypage);
    const wrapper = component.find('div.info_text');
    localStorage.removeItem('token');
    const logoutComponent = mount(mypage);
  });
  it('should call confirmHandler with no data in local Storage', () => {
    const mockFn = jest.fn();
    localStorage.setItem('token', 'testToken');
    localStorage.setItem('preferColor', 'null');
    localStorage.setItem('preferBase', 'null');
    localStorage.setItem('preferBrand', 'null');
    const component = mount(mypage);
    const wrapper = component.find('#brand-input');
    wrapper.at(0).simulate('click');
    const wrapper2 = component.find('#modify-button');
    const newInstance = component.find(MyPage.WrappedComponent).instance();
    newInstance.setState({ preferBase: '21', preferColor: 'red' });
    wrapper2.simulate('click');
    expect(spyPutInfo2).toBeCalledTimes(1);
  });
});
