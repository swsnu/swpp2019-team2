import React from "react";
import { shallow, mount } from "enzyme";
import LogIn from "./LogIn";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { getMockStore } from "../Mocks/mocks";
import { createBrowserHistory } from "history";
import { Route } from "react-router-dom";
import * as actionCreators from "../store/actions/cosmos";
const stubStateC = {
  Users: [],
  selectedUser: null
};
const stubSeletedUserF = {
  logged_in: false
};
const stubSeletedUserT = {
  logged_in: true
};
describe("<LogIn />", () => {
  it("should render and call getUsers", () => {
    let spyGetUsers = jest
      .spyOn(actionCreators, "getUsers")
      .mockImplementation(() => {
        return dispatch => {};
      });

    const mockStore = getMockStore(stubStateC);
    const history = createBrowserHistory();
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <LogIn />
        </ConnectedRouter>
      </Provider>
    );

    expect(spyGetUsers).toHaveBeenCalledTimes(1);
  });

  it("should render", () => {
    const component = shallow(<LogIn.WrappedComponent />);
    const wrapper = component.find(".LogIn");
    expect(wrapper.length).toBe(1);
  });
  it("should have input for email and should change state", () => {
    const component = shallow(<LogIn.WrappedComponent />);
    const emailInput = component.find("#email-input");
    emailInput.simulate("change", { target: { value: "etest" } });
    expect(emailInput.length).toBe(1);
    expect(component.state().email).toEqual("etest");
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
    const component = shallow(<LogIn.WrappedComponent />);
    const emailInput = component.find("#email-input");
    emailInput.simulate("change", { target: { value: "etest" } });
    const pwInput = component.find("#pw-input");
    pwInput.simulate("change", { target: { value: "ptest" } });
    const loginButton = component.find("#login-button");
    loginButton.simulate("click");
    expect(window.alert).toHaveBeenCalledWith("Email or password is wrong");
  });
  it("should have login button and button should work when inputs are corrent", () => {
    const mockUserLogin = jest.fn();
    const mockOnGetUsers = jest.fn();
    const mockOnGetUser = jest.fn();
    const component = shallow(
      <LogIn.WrappedComponent
        UserLogIn={mockUserLogin}
        onGETUSERS={mockOnGetUsers}
        ongetUser={mockOnGetUser}
      />
    );
    const emailInput = component.find("#email-input");
    emailInput.simulate("change", { target: { value: "swpp@snu.ac.kr" } });
    const pwInput = component.find("#pw-input");
    pwInput.simulate("change", { target: { value: "iluvswpp" } });
    const loginButton = component.find("#login-button");
    loginButton.simulate("click");
    expect(component.state().submitted).toBe(true);
    expect(mockOnGetUser).toHaveBeenCalledTimes(1);
    expect(mockOnGetUsers).toHaveBeenCalledTimes(1);
    expect(mockUserLogin).toHaveBeenCalledTimes(1);
  });
  it("should redirect to login when not there is no selected user", () => {
    const component = shallow(<LogIn.WrappedComponent selectedUser={null} />);
    const redirect = component.find("Redirect");
    expect(redirect.props().to).toEqual("/login");
  });
  it("should not have SelectedUser with its logged_in=false", () => {
    const component = shallow(
      <LogIn.WrappedComponent selectedUser={stubSeletedUserF} />
    );
    const redirect = component.find("Redirect");
    expect(redirect.length).toBe(0);
  });
  it("should go to main page when logged in", () => {
    const component = shallow(
      <LogIn.WrappedComponent selectedUser={stubSeletedUserT} />
    );
    const redirect = component.find("Redirect");
    expect(redirect.props().to).toEqual("/main");
  });
  it("should call putUser", () => {
    let spyPutUser = jest
      .spyOn(actionCreators, "putUser")
      .mockImplementation(() => {
        return dispatch => {};
      });

    const mockStore = getMockStore(stubStateC);
    const history = createBrowserHistory();
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <LogIn />
        </ConnectedRouter>
      </Provider>
    );
    const emailInput = component.find("#email-input");
    emailInput.simulate("change", { target: { value: "swpp@snu.ac.kr" } });
    const pwInput = component.find("#pw-input");
    pwInput.simulate("change", { target: { value: "iluvswpp" } });
    const loginButton = component.find("#login-button");
    loginButton.simulate("click");
    expect(spyPutUser).toHaveBeenCalledTimes(1);
  });
});
