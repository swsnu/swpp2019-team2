/* eslint-disable no-unused-vars */
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import Popup from 'reactjs-popup';
import SkinTone from './SkinTone';

import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';

import * as actionCreators from '../store/actions/cosmos';

const stubStateC = {
  User: [],
  isAuthenticated: false,
  token: 'token',
};

const stubInitialState = {
  selectedUser: {
    id: 1, email: 'TEST_EMAIL', password: 'TEST_PASS', name: 'TEST', logged_in: false,
  },
  User: [{
    nick_name: 'a', prefer_color: 'red', prefer_base: '19', prefer_brand: '라네즈',
  }],
};

// jest.mock('Popup', () => jest.fn(() => (
//  <Popup trigger={<button type="button" id="submitmodal">Submit </button>} />)));


const mockStore = getMockStore(stubInitialState);
const mockStore2 = getMockStore(stubStateC);
describe('<SkinTone />', () => {
  let skintone; let spyGetUsers; let spyGetUser; let spylogout; let spyUserInfo;
  beforeEach(() => {
    skintone = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => (
                <SkinTone
                  {...props}
                  Logout={spylogout}
                  onTryAutoSignup={spyGetUser}
                  getUserInfo={spyUserInfo}
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
    window.alert = jest.fn();
    jest.mock('reactjs-popup', () => 'Popup');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render SkinTone', () => {
    const component = mount(skintone);
    const wrapper = component.find('SkinTone');
    expect(wrapper.length).toBe(1);
    expect(spyGetUser).toBeCalledTimes(1);
  });
  it('should render webcammodal', () => {
    const component = mount(skintone);
    const wrapper = component.find('.takephoto');
    expect(wrapper.length).toBe(1);
    expect(spyGetUser).toBeCalledTimes(1);
  });

  it('should render submitmodal', () => {
    const component = mount(skintone);
    const wrapper = component.find('.submit');
    expect(wrapper.length).toBe(1);
    expect(spyGetUser).toBeCalledTimes(1);
  });

  it('should call fileinputHandler', () => {
    const fileContents = 'test_picture';
    const readAsDataURL = jest.fn();
    const onloadend = jest.fn();
    const dummyFileReader = { onloadend, readAsDataURL, result: fileContents };
    window.FileReader = jest.fn(() => dummyFileReader);
    const mockFile = new Blob([fileContents], { type: 'img/png' });
    const component = mount(skintone);
    const wrapper2 = component.find('#submitmodal');
    // expect(wrapper2.length).toBe(1);
    wrapper2.simulate('click');
    const wrapper = component.find('#photo-input');
    wrapper.simulate('change', { target: { files: [mockFile] } });
    expect(FileReader).toHaveBeenCalled();
    expect(readAsDataURL).toHaveBeenCalledWith(mockFile);
  });

  it('should call fileinputHandler without file', () => {
    const fileContents = 'test_picture';
    const readAsDataURL = jest.fn();
    const onloadend = jest.fn();
    const dummyFileReader = { onloadend, readAsDataURL, result: fileContents };
    window.FileReader = jest.fn(() => dummyFileReader);
    const mockFile = null;
    const component = mount(skintone);
    const wrapper2 = component.find('#submitmodal');
    wrapper2.simulate('click');
    const newInstance = component.find(SkinTone.WrappedComponent).instance();
    const wrapper = component.find('#photo-input');
    wrapper.simulate('change', { target: { files: [mockFile] } });
    expect(FileReader).toHaveBeenCalled();
    expect(readAsDataURL).toBeCalledTimes(0);
  });

  it('should call submitHandler & flag = false', () => {
    window.alert = jest.fn();
    const component = mount(skintone);
    const wrapper2 = component.find('#submitmodal');
    wrapper2.simulate('click');
    const wrapper = component.find('#submit-button');
    wrapper.simulate('click');
    const newInstance = component.find(SkinTone.WrappedComponent).instance();
    newInstance.setState({ flag: false });
    expect(window.alert).toHaveBeenCalledWith('Please submit a picture with your face');
  });

  it('should call submitHandler & flag = true', () => {
    window.alert = jest.fn();
    const component = mount(skintone);
    const wrapper2 = component.find('#submitmodal');
    wrapper2.simulate('click');
    const newInstance = component.find(SkinTone.WrappedComponent).instance();
    newInstance.setState({ flag: true });
    const wrapper = component.find('#submit-button');
    wrapper.simulate('click');
    expect(window.alert).toBeCalledTimes(9);
  });

  it('should call mypageHandler', () => {
    const spyHistoryPush = jest.spyOn(history, 'replace')
      .mockImplementation((path) => {});
    const component = mount(skintone);
    const wrapper = component.find('#my-page-button');
    wrapper.simulate('click');
    expect(spyHistoryPush).toBeCalledTimes(2);
  });

  it('should call searchHandler', () => {
    const spyHistoryPush = jest.spyOn(history, 'replace')
      .mockImplementation((path) => {});
    const component = mount(skintone);
    const wrapper = component.find('#Searchmenu');
    wrapper.simulate('click');
    expect(spyHistoryPush).toBeCalledTimes(2);
  });
  it('should call budgetHandler', () => {
    const spyHistoryPush = jest.spyOn(history, 'replace')
      .mockImplementation((path) => {});
    const component = mount(skintone);
    const wrapper = component.find('#Budgetmenu');
    wrapper.simulate('click');
    expect(spyHistoryPush).toBeCalledTimes(2);
  });
  it('should call toneHandler', () => {
    const spyHistoryPush = jest.spyOn(history, 'replace')
      .mockImplementation((path) => {});
    const component = mount(skintone);
    const wrapper = component.find('#Tonemenu');
    wrapper.simulate('click');
    expect(spyHistoryPush).toBeCalledTimes(2);
  });
  it('should call saleHandler', () => {
    const spyHistoryPush = jest.spyOn(history, 'replace')
      .mockImplementation((path) => {});
    const component = mount(skintone);
    const wrapper = component.find('#Salemenu');
    wrapper.simulate('click');
    expect(spyHistoryPush).toBeCalledTimes(2);
  });


  it('should call logoutHandler', () => {
    const spyHistoryPush = jest.spyOn(history, 'replace')
      .mockImplementation((path) => {});
    const component = mount(skintone);
    const wrapper = component.find('#log-out-button');
    wrapper.simulate('click');
    expect(spyGetUser).toBeCalledTimes(2);
    expect(spylogout).toBeCalledTimes(1);
    expect(spyHistoryPush).toBeCalledTimes(1);
  });

  it('should redirect to /login when not logged_in', () => {
    const component = mount(skintone);
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
    const component = mount(skintone);
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
    const component = mount(skintone);
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
    const component = mount(skintone);
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
    const component = mount(skintone);
    const button = component.find('#Budgetmenu');
    button.simulate('click');
    expect(spyHistoryReplace).toHaveBeenCalledWith('../budget');
  });
  it('should call toneHandler when clicking tone analysis button', () => {
    const spyHistoryReplace = jest
      .spyOn(history, 'replace')
      .mockImplementation(() => {});
    const component = mount(skintone);
    const button = component.find('#Tonemenu');
    button.simulate('click');
    expect(spyHistoryReplace).toHaveBeenCalledWith('../skintone');
  });
  it('should call saleHandler when clicking sale information button', () => {
    const spyHistoryReplace = jest
      .spyOn(history, 'replace')
      .mockImplementation(() => {});
    const component = mount(skintone);
    const button = component.find('#Salemenu');
    button.simulate('click');
    expect(spyHistoryReplace).toHaveBeenCalledWith('../sale');
  });
});

describe('<SkinTone />', () => {
  let skintone; let spyGetUser; let spylogout; let spyUserInfo;
  let spyUserInfo2; let spyPutInfo2;
  beforeEach(() => {
    skintone = (
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={
                (props) => (
                  <SkinTone {...props} />
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
  it('should render SkinTone', () => {
    const component = mount(skintone);
    const wrapper = component.find('SkinTone');
    expect(spyUserInfo).toBeCalledTimes(1);
  });
});
