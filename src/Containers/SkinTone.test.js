import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import SkinTone from './SkinTone'

import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';

import * as actionCreators from '../store/actions/cosmos';
import { italic } from 'ansi-colors';
import expectExport from 'expect';

const stubInitialState = {
    selectedUser:{id:1,email:'TEST_EMAIL',password:'TEST_PASS',name:'TEST',logged_in:false},
    Users : [{id:1,email:'TEST_EMAIL',password:'TEST_PASS',name:'TEST',logged_in:false},
    {id:2,email:'TEST_EMAIL2',password:'TEST_PASS2',name:'TEST2',logged_in:false},
    {id:3,email:'TEST_EMAIL3',password:'TEST_PASS3',name:'TEST3',logged_in:false}],
};

const mockStore = getMockStore(stubInitialState);

describe('<SkinTone />', () =>{
    let skintone, spygetusers, spygetuser, spyuserlogout;
    beforeEach(() => {
        skintone = (
          <Provider store={mockStore}>
            <ConnectedRouter history={history}>
            <Switch>
              <Route path='/' 
              render = { props => <SkinTone  {...props} onGETUSERS = {spygetusers} onGETUSER = {spygetuser} UserLogOut = {spyuserlogout}  /> } />
            </Switch>
            </ConnectedRouter>
          </Provider>
        );
        spygetusers = jest.spyOn(actionCreators, 'getUsers')
          .mockImplementation(() => { return dispatch => {};});
        spygetuser = jest.spyOn(actionCreators,'getUser')
          .mockImplementation(()=>{return dispatch => {};});
        spyuserlogout = jest.spyOn(actionCreators, 'putUser')
          .mockImplementation(td => { return dispatch => {};});
    })
    
    afterEach(()=> {
        jest.clearAllMocks()
    });

    it('should render Skin Tone',() => {
        const component = mount(skintone);
        const wrapper = component.find('SkinTone');
        expect(wrapper.length).toBe(1);
    })
});