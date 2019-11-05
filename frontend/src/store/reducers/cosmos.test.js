
import reducer from './cosmos';
import * as actionTypes from '../actions/actionTypes';


const stubUser = {
  id: 0,
  email: 'TEST_EMAIL',
  password: 'TEST_PASS',
  name: 'TEST',
  logged_in: false,
};


describe('Article Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({ Users: [], selectedUser: null });
  });

  it('should change/put User', () => {
    const stubInitialState = {
      Users: [stubUser,
        {
          id: 1, email: 'TEST_EMAIL2', password: 'TEST_PASS2', name: 'TEST2', logged_in: false,
        }],
      selectedUser: null,
    };
    let newState = reducer(stubInitialState, {
      type: actionTypes.PUT_USER,
      targetID: 0,
      target: stubUser,
      logged_in: true,
    });
    expect(newState).toEqual({
      Users: [{ ...stubUser, logged_in: true },
        {
          id: 1, email: 'TEST_EMAIL2', password: 'TEST_PASS2', name: 'TEST2', logged_in: false,
        }],
      selectedUser: stubUser,
    });
    newState = reducer(newState, {
      type: actionTypes.PUT_USER,
      targetID: 0,
      target: stubUser,
      logged_in: false,
    });
    expect(newState).toEqual({
      Users: [{ ...stubUser, logged_in: false },
        {
          id: 1, email: 'TEST_EMAIL2', password: 'TEST_PASS2', name: 'TEST2', logged_in: false,
        }],
      selectedUser: stubUser,
    });
  });

  it('should get User', () => {
    const stubSelectedUser = {
      id: 0, email: 'TEST_EMAIL', password: 'TEST_PASS', name: 'TEST', logged_in: false,
    };
    const newState = reducer(undefined, {
      type: actionTypes.GET_USER,
      target: stubSelectedUser,
    });
    expect(newState).toEqual({
      Users: [],
      selectedUser: stubSelectedUser,
    });
  });


  it('should get all Users', () => {
    const stubUsers = [
      {
        id: 0, email: 'TEST_EMAIL', password: 'TEST_PASS', name: 'TEST', logged_in: false,
      },
      {
        id: 1, email: 'TEST_EMAIL2', password: 'TEST_PASS2', name: 'TEST2', logged_in: false,
      },
      {
        id: 2, email: 'TEST_EMAIL3', password: 'TEST_PASS3', name: 'TEST3', logged_in: false,
      },
    ];
    const newState = reducer(undefined, {
      type: actionTypes.GET_USERS,
      Users: stubUsers,
    });
    expect(newState).toEqual({
      Users: stubUsers,
      selectedUser: null,
    });
  });
});
