/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import { getMockStore } from '../Mocks/mocks';
import Signup from './Signup';
import * as actions from '../store/actions/cosmos';
import { history } from '../store/store';

const stubStateC = {
  Lip: [],
  Users: [],
  token: null,
  loading: false,
  error: null,
};
const stubSeletedUserF = {
  logged_in: false,
};
const stubSeletedUserT = {
  logged_in: true,
};
const stubInitialState = {
  selectedUser: {
    id: 1, email: 'TEST_EMAIL', password: 'TEST_PASS', name: 'TEST', logged_in: false,
  },
  User: [{
    nick_name: 'a', prefer_color: 'red', prefer_base: '19', prefer_brand: '라네즈',
  }],
};
const mockStore = getMockStore(stubInitialState);
describe('<Signup />', () => {
  let spyauthCheckState;
  beforeEach(() => {
    spyauthCheckState = jest.spyOn(actions, 'authCheckState')
      .mockImplementation(() => (dispatch) => {});
  });
  it('should render and call authLogin', () => {
    const mockStore1 = getMockStore(stubStateC);
    // const history = createBrowserHistory();
    const component = mount(
      <Provider store={mockStore1}>
        <Router history={history}>
          <Signup />
        </Router>
      </Provider>,
    );
    expect(spyauthCheckState).toBeCalledTimes(1);
  });
  it('should render', () => {
    const component = shallow(<Signup.WrappedComponent />);
    const wrapper = component.find('.Signup');
    expect(wrapper.length).toBe(1);
  });
  it('should have input for email and should change state', () => {
    const component = shallow(<Signup.WrappedComponent />);
    const usernameInput = component.find('#username-input');
    usernameInput.simulate('change', { target: { value: 'test' } });
    expect(usernameInput.length).toBe(1);
    expect(component.state().username).toEqual('test');
  });
  it('should have input for password and should change state', () => {
    const component = shallow(<Signup.WrappedComponent />);
    const pwInput = component.find('#pw-input');
    pwInput.simulate('change', { target: { value: 'ptest' } });
    expect(pwInput.length).toBe(1);
    expect(component.state().password).toEqual('ptest');
  });
  it('should have login button and button should show alert when id or pw is incorrect', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const mockonTryAutoSignup = jest.fn();
    const mockonLogin = jest.fn();
    const mockSignup = jest.fn();
    const component = mount(
      <BrowserRouter>
        <Signup.WrappedComponent
          Signup={mockSignup}
          onTryAutoSignup={mockonTryAutoSignup}
          Login={mockonLogin}
          getUserInfo={jest.fn()}
        />
      </BrowserRouter>,
    );
    const emailInput = component.find('#username-input');
    emailInput.simulate('change', { target: { value: 'etest' } });
    const pwInput = component.find('#pw-input');
    pwInput.simulate('change', { target: { value: 'ptest' } });
    const loginButton = component.find('#login-button');
    loginButton.simulate('click');
    expect(window.alert).toHaveBeenCalledTimes(0);
  });
  it('should have login button and button should work when inputs are corrent', () => {
    const mockonTryAutoSignup = jest.fn();
    const mockonLogin = jest.fn();
    const mockSignup = jest.fn();
    const component = mount(
      <BrowserRouter>
        <Signup.WrappedComponent
          Signup={mockSignup}
          error={!null}
          onTryAutoSignup={mockonTryAutoSignup}
          Login={mockonLogin}
          getUserInfo={jest.fn()}
        />
      </BrowserRouter>,
    );
    const usernameInput = component.find('#username-input');
    usernameInput.simulate('change', { target: { value: 'test_id' } });
    const emailInput = component.find('#email-input');
    emailInput.simulate('change', { target: { value: 'test_' } });
    const pwInput = component.find('#pw-input');
    pwInput.simulate('change', { target: { value: 'test_password' } });
    const nickInput = component.find('#nickname-input');
    nickInput.simulate('change', { target: { value: 'nick_password' } });
    const loginButton = component.find('#login-button');
    loginButton.simulate('click');
    expect(mockonTryAutoSignup).toHaveBeenCalledTimes(2);
    expect(mockSignup).toHaveBeenCalledTimes(1);
  });
  it('should redirect to login when not there is no selected user', () => {
    const component = shallow(<Signup.WrappedComponent selectedUser={null} />);
    const redirect = component.find('Redirect');
    expect(redirect.props().to).toEqual('/signup');
  });
  it('should replace to signup when not there is no selected user', () => {
    const component = shallow(<Signup.WrappedComponent isAuthenticated />);
    const redirect = component.find('Redirect');
    expect(redirect.props().to).toEqual('/search');
  });
  it('should not have SelectedUser with its logged_in=false', () => {
    const component = shallow(
      <Signup.WrappedComponent selectedUser={stubSeletedUserF} />,
    );
    const redirect = component.find('Redirect');
    expect(redirect.length).toBe(1);
  });
  it('should go to main page when logged in', () => {
    const component = shallow(
      <Signup.WrappedComponent selectedUser={stubSeletedUserT} />,
    );
    const redirect = component.find('Redirect');
    expect(redirect.props().to).toEqual('/signup');
  });
});

describe('<Signup />', () => {
  let signup; let spyGetUsers; let spyGetUser;
  beforeEach(() => {
    signup = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => (
                <Signup
                  {...props}
                />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetUsers = jest.spyOn(actions, 'authSignup')
      .mockImplementation(() => () => {});
    spyGetUser = jest.spyOn(actions, 'authCheckState')
      .mockImplementation(() => () => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should call mypageHandler', () => {
    const spyHistoryPush = jest.spyOn(history, 'replace')
      .mockImplementation((path) => {});
    const component = mount(signup);
    const wrapper = component.find('#sign-up-button');
    wrapper.simulate('click');
    expect(spyHistoryPush).toBeCalledTimes(2);
  });
  it('should call confirm', () => {
    const component = mount(signup);
    const usernameInput = component.find('#username-input');
    usernameInput.simulate('change', { target: { value: 'test_id' } });
    const emailInput = component.find('#email-input');
    emailInput.simulate('change', { target: { value: 'test_' } });
    const pwInput = component.find('#pw-input');
    pwInput.simulate('change', { target: { value: 'test_password' } });
    const nickInput = component.find('#nickname-input');
    nickInput.simulate('change', { target: { value: 'nick_password' } });
    const loginButton = component.find('#login-button');
    loginButton.simulate('click');
    expect(spyGetUsers).toHaveBeenCalledTimes(1);
  });
});
