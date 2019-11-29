
import reducer from './cosmos';
import * as actionTypes from '../actions/actionTypes';

/*
disabled not used variable
const stubuser = {
  id: 1, name: 'lip_test_name', price: 5000, category: '립스틱', brand: 1, color: 1,
};
*/
describe('post reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      Lip: [], User: [], ML: null, error: null, loading: false, token: null, result: [],
    });
  });

  it('should handle GET_LIP', () => {
    const startAction = {
      type: actionTypes.GET_LIP,
    };
    const expectedActions = {
      Lip: undefined, User: [], ML: null, error: null, loading: false, token: null, result: [],
    };

    expect(reducer(undefined, startAction)).toEqual(expectedActions);
  });


  it('should handle AUTH_START', () => {
    const startAction = {
      type: actionTypes.AUTH_START,
    };
    const expectedActions = {
      Lip: [], User: [], ML: null, error: null, loading: true, token: null, result: [],
    };

    expect(reducer(undefined, startAction)).toEqual(expectedActions);
  });

  it('should handle AUTH_SUCCESS', () => {
    const startAction = {
      type: actionTypes.AUTH_SUCCESS,
    };
    const expectedActions = {
      Lip: [], User: [], ML: null, error: null, loading: false, token: undefined, result: [],
    };

    expect(reducer(undefined, startAction)).toEqual(expectedActions);
  });


  it('should handle AUTH_FAIL', () => {
    const startAction = {
      type: actionTypes.AUTH_FAIL,
    };
    const expectedActions = {
      Lip: [], User: [], error: undefined, loading: false, token: null, ML: null, result: [],
    };

    expect(reducer(undefined, startAction)).toEqual(expectedActions);
  });


  it('should handle AUTH_LOGOUT', () => {
    const startAction = {
      type: actionTypes.AUTH_LOGOUT,
    };
    const expectedActions = {
      Lip: [], User: [], error: null, loading: false, token: null, ML: null, result: [],
    };

    expect(reducer(undefined, startAction)).toEqual(expectedActions);
  });
});
