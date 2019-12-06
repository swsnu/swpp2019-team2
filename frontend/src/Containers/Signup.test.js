/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { getMockStore } from '../Mocks/mocks';
import Signup from './Signup';
import { history } from '../store/store';
import * as actions from '../store/actions/cosmos';

jest.mock('../Components/SignupForm', () => jest.fn((props) => (
  <div className="spySignup">
    <input
      autoComplete="fname"
      name="firstName"
      variant="outlined"
      required
      id="username-input"
      label="Username"
      value={props.username}
      onChange={props.usernameChange}
    />
    <input
      variant="outlined"
      required
      id="email-input"
      label="Email Address"
      name="email"
      autoComplete="email"
      value={props.email}
      onChange={props.emailChange}
    />
    <input
      variant="outlined"
      required
      name="password"
      label="Password"
      type="password"
      id="password-input"
      autoComplete="current-password"
      value={props.password}
      onChange={props.passwordChange}
    />
    <input
      id="signup"
      type="button"
      variant="contained"
      color="primary"
      onClick={props.clickedSignup}
    />
    <button id="signin" type="button" href="login" variant="body2" onClick={props.clickedSignin}>
Signin
    </button>
    <button id="main" type="button" href="search" variant="body2" onClick={props.clickedBack}>
Back to main page
    </button>
  </div>
)));

const stubStateC = {
  Lip: [],
  Users: [],
  Users2: [],
  token: null,
  loading: false,
  error: 'test',
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
  error: 'test',
};
const mockStore = getMockStore(stubInitialState);
describe('<LogIn />', () => {
  let spygetLips;
  let spylogin;
  let spyauthCheckState;
  beforeEach(() => {
    spyauthCheckState = jest.spyOn(actions, 'authCheckState')
      .mockImplementation(() => (dispatch) => {});
    spylogin = jest.spyOn(actions, 'authSignup')
      .mockImplementation(() => (dispatch) => {});
  });
  it('should render and call authLogin', () => {
    const mockStore1 = getMockStore(stubStateC);
    const component = mount(
      <Provider store={mockStore1}>
        <BrowserRouter history={history}>
          <Signup />
        </BrowserRouter>
      </Provider>,
    );
    const usernameInput = component.find('#username-input');
    usernameInput.simulate('change', { target: { value: 'test_id' } });
    const emailInput = component.find('#email-input');
    emailInput.simulate('change', { target: { value: 'test_id' } });
    const pwInput = component.find('#password-input');
    pwInput.simulate('change', { target: { value: 'test_password' } });
    const newInstance = component.find(Signup.WrappedComponent).instance();
    newInstance.setState({ check: false });
    newInstance.setState({ signin: true });
    newInstance.setState({ error: 'test' });
    const loginButton = component.find('#signup');
    loginButton.simulate('click');
    expect(spyauthCheckState).toBeCalledTimes(1);
  });

  it('should render', () => {
    const component = shallow(<Signup.WrappedComponent />);
    const wrapper = component.find('.Signup');
    expect(wrapper.length).toBe(1);
  });
  it('should have login button and button should show alert when id or pw is incorrect', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const mockonTryAutoSignup = jest.fn();
    const mockonLogin = jest.fn();
    const component = mount(
      <BrowserRouter>
        <Signup.WrappedComponent
          onTryAutoSignup={mockonTryAutoSignup}
          Signup={mockonLogin}
        />
      </BrowserRouter>,
    );
  });
  it('should have login button and button should work when inputs are incorrect', () => {
    const mockonTryAutoSignup = jest.fn();
    const spyHistoryPush = jest.spyOn(history, 'replace')
      .mockImplementation((path) => {});
    const mockonLogin = jest.fn();
    const component = mount(
      <BrowserRouter history={history}>
        <Signup.WrappedComponent
          onTryAutoSignup={mockonTryAutoSignup}
          Signup={mockonLogin}
        />
      </BrowserRouter>,
    );
    const usernameInput = component.find('#username-input');
    usernameInput.simulate('change', { target: { value: 'test_id' } });
    const emailInput = component.find('#email-input');
    emailInput.simulate('change', { target: { value: 'test_id' } });
    const pwInput = component.find('#password-input');
    pwInput.simulate('change', { target: { value: 'test_password' } });
    const newInstance = component.find(Signup.WrappedComponent).instance();
    newInstance.setState({ signin: true });
    newInstance.setState({ error: 'test' });
    const loginButton = component.find('#signup');
    loginButton.simulate('click');
    expect(mockonTryAutoSignup).toHaveBeenCalledTimes(1);
    expect(mockonLogin).toHaveBeenCalledTimes(0);
    expect(spyHistoryPush).toHaveBeenCalledTimes(0);
  });
  it('should have login button and button should work when inputs are corrent', () => {
    const mockonTryAutoSignup = jest.fn();
    const mockonLogin = jest.fn();
    const component = mount(
      <BrowserRouter>
        <Signup.WrappedComponent
          error={!null}
          onTryAutoSignup={mockonTryAutoSignup}
          Login={mockonLogin}
        />
      </BrowserRouter>,
    );
  });
  it('should replace to signup when not there is no selected user', () => {
    const component = shallow(<Signup.WrappedComponent isAuthenticated />);
    const redirect = component.find('Redirect');
    expect(redirect.props().to).toEqual('/search');
  });
  it('should replace to signup', () => {
    const mockonTryAutoSignup = jest.fn();
    const spyHistoryPush = jest.spyOn(history, 'replace')
      .mockImplementation((path) => {});
    const mockonLogin = jest.fn();
    const mockStore1 = getMockStore(stubStateC);
    const component = mount(
      <Provider store={mockStore1}>
        <BrowserRouter history={history}>
          <Signup />
        </BrowserRouter>
      </Provider>,
    );
    const usernameInput = component.find('#username-input');
    usernameInput.simulate('change', { target: { value: 'test_id' } });
    const emailInput = component.find('#email-input');
    emailInput.simulate('change', { target: { value: 'test@test.com' } });
    const pwInput = component.find('#password-input');
    pwInput.simulate('change', { target: { value: 'test_password' } });
    const newInstance = component.find(Signup.WrappedComponent).instance();
    newInstance.setState({ signup: true });
    newInstance.setState({ error: 'test' });
    const loginButton = component.find('#signup');
    loginButton.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledTimes(0);
  });
});

describe('<Signup />', () => {
  let signup; let spyGetUsers; let spyGetUser; let spylogout; let spyUserInfo;
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
    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should call mypageHandler', () => {
    const spyHistoryPush = jest.spyOn(history, 'replace')
      .mockImplementation((path) => {});
    const component = mount(signup);
    const wrapper = component.find('#main');
    wrapper.simulate('click');
    const sign = component.find('#signin');
    sign.simulate('click');
    expect(spyHistoryPush).toBeCalledTimes(2);
  });
});
