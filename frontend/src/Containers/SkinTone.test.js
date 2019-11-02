import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import SkinTone from './SkinTone';

import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';

import * as actionCreators from '../store/actions/cosmos';

const stubInitialState = {
    selectedUser:{id:1,email:'TEST_EMAIL',password:'TEST_PASS',name:'TEST',logged_in:false},
    Users : [{id:1,email:'TEST_EMAIL',password:'TEST_PASS',name:'TEST',logged_in:false},
    {id:2,email:'TEST_EMAIL2',password:'TEST_PASS2',name:'TEST2',logged_in:false},
    {id:3,email:'TEST_EMAIL3',password:'TEST_PASS3',name:'TEST3',logged_in:false}],
};

const mockStore = getMockStore(stubInitialState);

describe('<SkinTone />', () => {
  let skintone, spyGetUsers, spyGetUser,spylogout;
  beforeEach(() => {
    skintone = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' 
          render = { props => <SkinTone  {...props}  UserLogOut = {spylogout}  onGETUSERS = { spyGetUsers} onGETUSER= {spyGetUser} /> } />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetUsers = jest.spyOn(actionCreators, 'getUsers')
      .mockImplementation(() => { return dispatch => {};});
    spyGetUser = jest.spyOn(actionCreators,'getUser')
      .mockImplementation(()=>{return dispatch => {};});
    spylogout = jest.spyOn(actionCreators, 'putUser')
      .mockImplementation(td => { return dispatch => {};});
  })

  afterEach(()=> {
    jest.clearAllMocks()
  });

  it('should render SkinTone', () => {
    const component = mount(skintone);
    const wrapper = component.find('SkinTone');
    expect(wrapper.length).toBe(1);
    expect(spyGetUsers).toBeCalledTimes(1);
    expect(spyGetUser).toBeCalledTimes(1);
  });

  it('should call fileinputHandler',() => {
    const fileContents = 'test_picture'
    const readAsDataURL = jest.fn();
    const onloadend = jest.fn();
    const dummyFileReader = {onloadend, readAsDataURL, result: fileContents};
    window.FileReader = jest.fn(()=> dummyFileReader);
    const mock_file = new Blob([fileContents],{type : 'img/png'});
    const component = mount(skintone);
    const newInstance = component.find(SkinTone.WrappedComponent).instance();
    const wrapper = component.find('#photo-input');
    wrapper.simulate('change',{target:{files : [mock_file]}});
    expect(FileReader).toHaveBeenCalled();
    expect(readAsDataURL).toHaveBeenCalledWith(mock_file);
  })
  
  it('should call submitHandler & flag = false',() => {
    window.alert = jest.fn();
    const component = mount(skintone);
    const wrapper = component.find('#submit-button');
    wrapper.simulate('click');
    const newInstance = component.find(SkinTone.WrappedComponent).instance();
    newInstance.setState({ flag: false });
    expect(window.alert).toHaveBeenCalledWith('Please submit a picture with your face');
  })

  it('should call submitHandler & flag = true',() => {
    window.alert = jest.fn();
    const component = mount(skintone);
    const newInstance = component.find(SkinTone.WrappedComponent).instance();
    newInstance.setState({ flag: true });
    const wrapper = component.find('#submit-button');
    wrapper.simulate('click');
    expect(window.alert).toBeCalledTimes(0);
  })
  
  it('should call mypageHandler',() => {
    const spyHistoryPush = jest.spyOn(history, 'replace')
    .mockImplementation(path => {});
    const component = mount(skintone);
    const wrapper = component.find('#my-page-button');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('../mypage/1');

  })


  it('should call logoutHandler',()=>{
    const spyHistoryPush = jest.spyOn(history, 'push')
    .mockImplementation(path => {});
    const component = mount(skintone);
    const wrapper = component.find('#log-out-button');
    wrapper.simulate('click');
    expect(spyGetUsers).toBeCalledTimes(2);
    expect(spyGetUser).toBeCalledTimes(2);
    expect(spylogout).toBeCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith('/login');
  })

  it('should redirect to /login when not logged_in', () => {
    const component = mount(skintone);
    expect(component.find(Redirect)).toHaveLength(1);
  })
it('should not redirect to /login when logged_in', () => {
  const mockInitialStore = getMockStore({
  selectedUser:{id:1,email:'TEST_EMAIL',password:'TEST_PASS',name:'TEST',logged_in:true},
  Users : [{id:1,email:'TEST_EMAIL',password:'TEST_PASS',name:'TEST',logged_in:false},
  {id:2,email:'TEST_EMAIL2',password:'TEST_PASS2',name:'TEST2',logged_in:false},
  {id:3,email:'TEST_EMAIL3',password:'TEST_PASS3',name:'TEST3',logged_in:false}],});
    const component = mount(
        <Provider store={mockInitialStore}>
            <ConnectedRouter history={history}>
            <Switch>
                <Route path='/' 
                render = { props => <SkinTone  {...props}  UserLogOut = {spylogout}  onGETUSERS = { spyGetUsers} onGETUSER= {spyGetUser} /> } />
            </Switch>
            </ConnectedRouter>
        </Provider>
    );
  expect(component.find(Redirect)).toHaveLength(0);
})

it('does not have a selectedUser',() => {
  const spyHistoryPush = jest.spyOn(history, 'push')
  const mockInitialStore = getMockStore({
  selectedUser:null,
  Users : [{id:1,email:'TEST_EMAIL',password:'TEST_PASS',name:'TEST',logged_in:false},
  {id:2,email:'TEST_EMAIL2',password:'TEST_PASS2',name:'TEST2',logged_in:false},
  {id:3,email:'TEST_EMAIL3',password:'TEST_PASS3',name:'TEST3',logged_in:false}],
  });
    const component = mount(
        <Provider store={mockInitialStore}>
            <ConnectedRouter history={history}>
            <Switch>
                <Route path='/' 
                render = { props => <SkinTone  {...props}  UserLogOut = {spylogout}  onGETUSERS = { spyGetUsers} onGETUSER= {spyGetUser} /> } />
            </Switch>
            </ConnectedRouter>
        </Provider>
    );
    expect(component.find(Redirect)).toHaveLength(0);
    const wrapper = component.find('#log-out-button');
    wrapper.simulate('click');
    expect(spyGetUsers).toBeCalledTimes(1);
    expect(spyGetUser).toBeCalledTimes(1);
    expect(spylogout).toBeCalledTimes(0);
    expect(spyHistoryPush).toBeCalledTimes(0);

})
it('does have a selectedUser && logged_in ',() => {
  const spyHistoryPush = jest.spyOn(history, 'push')
  const mockInitialStore = getMockStore({
  selectedUser:{id:1,email:'TEST_EMAIL',password:'TEST_PASS',name:'TEST',logged_in:true},
  Users : [{id:1,email:'TEST_EMAIL',password:'TEST_PASS',name:'TEST',logged_in:false},
  {id:2,email:'TEST_EMAIL2',password:'TEST_PASS2',name:'TEST2',logged_in:false},
  {id:3,email:'TEST_EMAIL3',password:'TEST_PASS3',name:'TEST3',logged_in:false}],
  });
    const component = mount(
        <Provider store={mockInitialStore}>
            <ConnectedRouter history={history}>
            <Switch>
                <Route path='/' 
                render = { props => <SkinTone  {...props}  UserLogOut = {spylogout}  onGETUSERS = { spyGetUsers} onGETUSER= {spyGetUser} /> } />
            </Switch>
            </ConnectedRouter>
        </Provider>
    );
    expect(component.find(Redirect)).toHaveLength(0);
    const wrapper = component.find('#log-out-button');
    wrapper.simulate('click');
    expect(spyGetUsers).toBeCalledTimes(2);
    expect(spyGetUser).toBeCalledTimes(2);
    expect(spylogout).toBeCalledTimes(1);
    expect(spyHistoryPush).toBeCalledTimes(0);

})

});
