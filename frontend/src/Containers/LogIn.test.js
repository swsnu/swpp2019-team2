/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { getMockStore } from '../Mocks/mocks';
import LogIn from './LogIn';
import { history } from '../store/store';
import * as actions from '../store/actions/cosmos';

jest.mock('../Components/LoginForm', () => jest.fn((props) => (
  <div className="spyLogin">
    <input
      variant="outlined"
      margin="normal"
      id="username-input"
      label="Username"
      name="email"
      autoComplete="email"
      value={props.username}
      onChange={props.usernameChange}
    />
    <input
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password-input"
      autoComplete="current-password"
      value={props.password}
      onChange={props.passwordChange}
    />
    <input
      id="checkbox"
      label="Remember me"
      defaultChecked={props.check}
      onChange={props.verifiedChange}
    />
    <button
      id="signin"
      type="button"
      fullWidth
      variant="contained"
      color="primary"
      onClick={props.clickedSignin}
    >
              Sign In
    </button>

    <button id="signup" type="button" variant="body2" onClick={props.clickedSignup}>
                  Don&apos;t have an account? Sign Up
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
};
const mockStore = getMockStore(stubInitialState);
describe('<LogIn />', () => {
  let spygetLips;
  let spylogin;
  let spyauthCheckState;
  beforeEach(() => {
    spyauthCheckState = jest.spyOn(actions, 'authCheckState')
      .mockImplementation(() => (dispatch) => {});
    spylogin = jest.spyOn(actions, 'authLogin')
      .mockImplementation(() => (dispatch) => {});
  });
  it('should render and call authLogin', () => {
    const mockStore1 = getMockStore(stubStateC);
    const component = mount(
      <Provider store={mockStore1}>
        <BrowserRouter history={history}>
          <LogIn />
        </BrowserRouter>
      </Provider>,
    );
    const emailInput = component.find('#username-input');
    emailInput.simulate('change', { target: { value: 'test_id' } });
    const pwInput = component.find('#password-input');
    pwInput.simulate('change', { target: { value: 'test_password' } });
    const newInstance = component.find(LogIn.WrappedComponent).instance();
    newInstance.setState({ check: false });
    newInstance.setState({ signin: true });
    newInstance.setState({ error: 'test' });
    const loginButton = component.find('#signin');
    loginButton.simulate('click');
    const veriButton = component.find('#checkbox');
    veriButton.simulate('change', { target: { value: 'test_password' } });
    expect(spyauthCheckState).toBeCalledTimes(1);
  });

  it('should render', () => {
    const component = shallow(<LogIn.WrappedComponent />);
    const wrapper = component.find('.Login');
    expect(wrapper.length).toBe(1);
  });
  it('should have login button and button should show alert when id or pw is incorrect', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const mockonTryAutoSignup = jest.fn();
    const mockonLogin = jest.fn();
    const component = mount(
      <BrowserRouter>
        <LogIn.WrappedComponent
          onTryAutoSignup={mockonTryAutoSignup}
          Login={mockonLogin}
        />
      </BrowserRouter>,
    );
    const emailInput = component.find('#username-input');
    emailInput.simulate('change', { target: { value: 'etest' } });
    const pwInput = component.find('#password-input');
    pwInput.simulate('change', { target: { value: 'ptest' } });
    const newInstance = component.find(LogIn.WrappedComponent).instance();
    newInstance.setState({ check: true });
    const loginButton = component.find('#signin');
    loginButton.simulate('click');
    const veriButton = component.find('#checkbox');
    veriButton.simulate('change', { target: { value: 'test_password' } });
    expect(window.alert).toHaveBeenCalledTimes(0);
  });
  it('should have login button and button should work when inputs are incorrect', () => {
    const mockonTryAutoSignup = jest.fn();
    const spyHistoryPush = jest.spyOn(history, 'replace')
      .mockImplementation((path) => {});
    const mockonLogin = jest.fn();
    const component = mount(
      <BrowserRouter history={history}>
        <LogIn.WrappedComponent
          onTryAutoSignup={mockonTryAutoSignup}
          Login={mockonLogin}
        />
      </BrowserRouter>,
    );
    const emailInput = component.find('#username-input');
    emailInput.simulate('change', { target: { value: 'test_id' } });
    const pwInput = component.find('#password-input');
    pwInput.simulate('change', { target: { value: 'test_password' } });
    const newInstance = component.find(LogIn.WrappedComponent).instance();
    newInstance.setState({ check: false });
    newInstance.setState({ signin: true });
    newInstance.setState({ error: 'test' });
    const loginButton = component.find('#signin');
    loginButton.simulate('click');
    // const signupButton = component.find('#signup');
    // signupButton.simulate('click');
    const veriButton = component.find('#checkbox');
    veriButton.simulate('change', { target: { value: 'test_password' } });
    expect(mockonTryAutoSignup).toHaveBeenCalledTimes(1);
    expect(mockonLogin).toHaveBeenCalledTimes(1);
  });
  it('should have login button and button should work when inputs are corrent', () => {
    const mockonTryAutoSignup = jest.fn();
    const mockonLogin = jest.fn();
    const component = mount(
      <BrowserRouter>
        <LogIn.WrappedComponent
          error={!null}
          onTryAutoSignup={mockonTryAutoSignup}
          Login={mockonLogin}
        />
      </BrowserRouter>,
    );
  });
  it('should replace to signup when not there is no selected user', () => {
    const component = shallow(<LogIn.WrappedComponent isAuthenticated />);
    const redirect = component.find('Redirect');
    expect(redirect.props().to).toEqual('/search');
  });
});
