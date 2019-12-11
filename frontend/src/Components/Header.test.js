import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Header from './Header';
import * as actionCreators from '../store/actions/cosmos';
import { getMockStore } from '../Mocks/mocks';
import { history } from '../store/store';
import 'jest-localstorage-mock';

describe('<Header />', () => {
  let spyLogout; let spyGetUser; let header;
  beforeEach(() => {
    localStorage.clear();
    spyGetUser = jest.spyOn(actionCreators, 'authLogin')
      .mockImplementation(() => () => {});
    spyLogout = jest.spyOn(actionCreators, 'logout')
      .mockImplementation(() => () => {});
    header = (
      <Provider store={getMockStore({})}>
        <Header
          onTryAutoSignup={spyGetUser}
          Logout={spyLogout}
          history={history}
        />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render without errors', () => {
    const component = mount(header);
    const wrapper = component.find('a.menu-item');
    expect(wrapper.length).toBe(4);
  });
  it('should click mypage', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(() => { });
    const component = mount(header);
    const wrapper = component.find('#my-page-button');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('../mypage');
  });
  it('should click login', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(() => { });
    const component = mount(header);
    const wrapper = component.find('#log-in-button');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('../login');
  });
  it('should get nickname from local storage', () => {
    localStorage.setItem('nickname', 'test-nickname');
    const component = mount(header);
    const wrapper = component.find('div.header-user');
    expect(wrapper.text()).toBe('Hello, test-nickname');
  });

  it('should render logout button when logined', () => {
    localStorage.setItem('token', 'test-token');
    const component = mount(header);
    const wrapper = component.find('#log-out-button');
    wrapper.simulate('click');
    expect(spyLogout).toBeCalledTimes(1);
  });
});
