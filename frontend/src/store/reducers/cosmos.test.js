
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
      User: [], User2: [], ML: null, error: null, loading: false, token: null, result: [],
    });
  });

  it('should handle GET_PRODUCT', () => {
    const startAction = {
      type: actionTypes.GET_PRODUCT,
    };
    const expectedActions = {
      User: [], User2: [], ML: null, error: null, loading: false, token: null, result: undefined,
    };

    expect(reducer(undefined, startAction)).toEqual(expectedActions);
  });


  it('should handle AUTH_START', () => {
    const startAction = {
      type: actionTypes.AUTH_START,
    };
    const expectedActions = {
      User: [], User2: [], ML: null, error: null, loading: true, token: null, result: [],
    };

    expect(reducer(undefined, startAction)).toEqual(expectedActions);
  });
  it('should handle SEND_PICTURE', () => {
    const startAction = {
      type: actionTypes.SEND_PICTURE,
    };
    const expectedActions = {
      User: [], User2: [], ML: null, error: null, loading: false, token: null, result: [],
    };

    expect(reducer(undefined, startAction)).toEqual(expectedActions);
  });

  it('should handle AUTH_SUCCESS', () => {
    const startAction = {
      type: actionTypes.AUTH_SUCCESS,
    };
    const expectedActions = {
      User: [], User2: [], ML: null, error: null, loading: false, token: undefined, result: [],
    };

    expect(reducer(undefined, startAction)).toEqual(expectedActions);
  });


  it('should handle AUTH_FAIL', () => {
    const startAction = {
      type: actionTypes.AUTH_FAIL,
    };
    const expectedActions = {
      User: [], User2: [], error: undefined, loading: false, token: null, ML: null, result: [],
    };

    expect(reducer(undefined, startAction)).toEqual(expectedActions);
  });


  it('should handle AUTH_LOGOUT', () => {
    const startAction = {
      type: actionTypes.AUTH_LOGOUT,
    };
    const expectedActions = {
      User: [], User2: [], error: null, loading: false, token: null, ML: null, result: [],
    };

    expect(reducer(undefined, startAction)).toEqual(expectedActions);
  });
});

it('should handle RUN_ANALYSIS', () => {
  const startAction = {
    type: actionTypes.RUN_ANALYSIS,
  };
  const expectedActions = {
    User: [],
    User2: [],
    ML: {
      base: undefined,
      id: undefined,
      product: undefined,
      result_b: undefined,
      result_g: undefined,
      result_r: undefined,
      user_id: undefined,
    },
    error: null,
    loading: false,
    token: null,
    result: [],
  };

  expect(reducer(undefined, startAction)).toEqual(expectedActions);
});

it('should handle GET_ANALYSIS_RESULT', () => {
  const startAction = {
    type: actionTypes.GET_ANALYSIS_RESULT,
  };
  const expectedActions = {
    User: [], User2: [], ML: null, error: null, loading: false, token: null, result: [],
  };

  expect(reducer(undefined, startAction)).toEqual(expectedActions);
});
