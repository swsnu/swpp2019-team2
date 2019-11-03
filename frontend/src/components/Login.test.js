import React from "react";
import { shallow, mount } from "enzyme";
import LogIn from "./Login";
import { Provider } from "react-redux";
import {BrowserRouter} from 'react-router-dom';
import { ConnectedRouter } from "connected-react-router";
import { getMockStore } from "../mock";
import { createBrowserHistory } from "history";
import { Route } from "react-router-dom";
import * as actions from "../store/actions/cosmos";


const stubStateC = {
  Lip:[],
  Users: [],
  token: null,
  loading: false,
  error: null,
};
const stubSeletedUserF = {
  logged_in: false
};
const stubSeletedUserT = {
  logged_in: true
};
describe("<LogIn />", () => {
  let spygetLips;
  let spylogout;
  let spyauthCheckState;
  beforeEach(() => {

  spyauthCheckState = jest.spyOn(actions, 'authCheckState')
  .mockImplementation(() => { return dispatch => {}; });
  })
  it("should render and call authLogin", () => {
   /* let spyauthLogin = jest
      .spyOn(actionCreators, "authLogin")
      .mockImplementation(() => {
        return dispatch => {};
      });*/

    const mockStore = getMockStore(stubStateC);
    const history = createBrowserHistory();
    const component = mount(
      <Provider store={mockStore}>
        <BrowserRouter history={history}>
          <LogIn />
        </BrowserRouter>
      </Provider>
    );

    expect(spyauthCheckState).toBeCalledTimes(1);
  });

  it("should render", () => {
    const component = shallow(<LogIn.WrappedComponent />);
    const wrapper = component.find(".Signin");
    expect(wrapper.length).toBe(1);
  });
  it("should have input for email and should change state", () => {
    const component = shallow(<LogIn.WrappedComponent />);
    const emailInput = component.find("#username-input");
    emailInput.simulate("change", { target: { value: "test" } });
    expect(emailInput.length).toBe(1);
    expect(component.state().username).toEqual("test");
  });
  it("should have input for password and should change state", () => {
    const component = shallow(<LogIn.WrappedComponent />);
    const pwInput = component.find("#pw-input");
    pwInput.simulate("change", { target: { value: "ptest" } });
    expect(pwInput.length).toBe(1);
    expect(component.state().password).toEqual("ptest");
  });
  it("should have login button and button should show alert when id or pw is incorrect", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    const mockonTryAutoSignup = jest.fn();
    const mockonLogin = jest.fn();
    const component = mount(
      <BrowserRouter><LogIn.WrappedComponent  onTryAutoSignup={ mockonTryAutoSignup} Login={mockonLogin} /></BrowserRouter>
    );
    const emailInput = component.find("#username-input");
    emailInput.simulate("change", { target: { value: "etest" } });
    const pwInput = component.find("#pw-input");
    pwInput.simulate("change", { target: { value: "ptest" } });
    const loginButton = component.find("#login-button");
    loginButton.simulate("click");
    expect(window.alert).toHaveBeenCalledTimes(0);
  });
  /*it("should have signup button and button should show signup page", () => {////
    //const spyHistoryPush1 = jest.spyOn(history, 'replace')
    //.mockImplementation(path => {});

    

    jest.spyOn(window, "alert").mockImplementation(() => {});
    const component = shallow(<LogIn.WrappedComponent />);
    const emailInput = component.find("#username-input");
    emailInput.simulate("change", { target: { value: "etest" } });
    const pwInput = component.find("#pw-input");
    pwInput.simulate("change", { target: { value: "ptest" } });
    const loginButton = component.find("#sign-up-button");
    loginButton.simulate("click");
    expect(spyHistoryPush1).toBeCalledTimes(1);
  });*/
  it("should have login button and button should work when inputs are corrent", () => {
    const mockonTryAutoSignup = jest.fn();
    const mockonLogin = jest.fn();
    const component = mount(
      <BrowserRouter><LogIn.WrappedComponent  error={!null} onTryAutoSignup={ mockonTryAutoSignup} Login={mockonLogin} /></BrowserRouter>
    );
    const emailInput = component.find("#username-input");
    emailInput.simulate("change", { target: { value: "test_id" } });
    const pwInput = component.find("#pw-input");
    pwInput.simulate("change", { target: { value: "test_password" } });
    const loginButton = component.find("#login-button");
    loginButton.simulate("click");
    expect(mockonTryAutoSignup).toHaveBeenCalledTimes(2);
    expect(mockonLogin).toHaveBeenCalledTimes(1);
  });
  it("should redirect to login when not there is no selected user", () => {
    const component = shallow(<LogIn.WrappedComponent selectedUser={null} />);
    const redirect = component.find("Redirect");
    expect(redirect.props().to).toEqual("/login");
  });
  it("should replace to signup when not there is no selected user", () => {
    const component = shallow(<LogIn.WrappedComponent isAuthenticated={true} />);
    const redirect = component.find("Redirect");
    expect(redirect.props().to).toEqual("/search");
  });
  it("should not have SelectedUser with its logged_in=false", () => {
    const component = shallow(
      <LogIn.WrappedComponent selectedUser={stubSeletedUserF} />
    );
    const redirect = component.find("Redirect");
    expect(redirect.length).toBe(1);
  });
  it("should go to main page when logged in", () => {
    const component = shallow(
      <LogIn.WrappedComponent selectedUser={stubSeletedUserT} />
    );
    const redirect = component.find("Redirect");
    expect(redirect.props().to).toEqual("/login");
  });

});