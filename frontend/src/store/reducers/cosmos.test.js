import reducer from './cosmos';
<<<<<<< HEAD
import * as actionTypes from '../actions/actionTypes';

=======
import React from 'react';
import * as actionTypes from '../actions/actionTypes'; 
>>>>>>> ce5f934287255c8528127115e05d59f5a760cbee



const stubuser = {id: 1, name: 'lip_test_name', price: 5000, category: '립스틱', brand: 1, color: 1};
describe('post reducer', () => {
<<<<<<< HEAD
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({Lip:[],User:[],error:null,loading:false,token:null});
  });
  it('should handle GET_LIP', () => {
    const startAction = {
      type: actionTypes.GET_LIP
    };
    const expectedActions =
        {Lip:undefined,User:[],error:null,loading:false,token:null};
        
    expect(reducer(undefined, startAction)).toEqual(expectedActions)
  });


  it('should handle AUTH_START', () => {
    const startAction = {
      type: actionTypes.AUTH_START
    };
    const expectedActions =
          {Lip:[],User:[],error:null,loading:true,token:null};
        
    expect(reducer(undefined, startAction)).toEqual(expectedActions)
  });

  it('should handle AUTH_SUCCESS', () => {
    const startAction = {
      type: actionTypes.AUTH_SUCCESS
    };
    const expectedActions =
          {Lip:[],User:[],error:null,loading:false,token:undefined};
        
    expect(reducer(undefined, startAction)).toEqual(expectedActions)
  });


  it('should handle AUTH_FAIL', () => {
    const startAction = {
      type: actionTypes.AUTH_FAIL
    };
    const expectedActions =
          {Lip:[],User:[],error:undefined,loading:false,token:null};
        
    expect(reducer(undefined, startAction)).toEqual(expectedActions)
  });


  it('should handle AUTH_LOGOUT', () => {
    const startAction = {
      type: actionTypes.AUTH_LOGOUT
    };
    const expectedActions =
          {Lip:[],User:[],error:null,loading:false,token:null};
        
    expect(reducer(undefined, startAction)).toEqual(expectedActions)
  });
=======
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual({Lip:[],User:[],error:null,loading:false,token:null});
    });


     
     
      it('should handle GET_LIP', () => {
        const startAction = {
          type: actionTypes.GET_LIP
        };
        const expectedActions =
        {Lip:undefined,User:[],error:null,loading:false,token:null};
        
        expect(reducer(undefined, startAction)).toEqual(expectedActions)
      });


      it('should handle AUTH_START', () => {
        const startAction = {
          type: actionTypes.AUTH_START
        };
        const expectedActions =
          {Lip:[],User:[],error:null,loading:true,token:null};
        
        expect(reducer(undefined, startAction)).toEqual(expectedActions)
      });

      it('should handle AUTH_SUCCESS', () => {
        const startAction = {
          type: actionTypes.AUTH_SUCCESS
        };
        const expectedActions =
          {Lip:[],User:[],error:null,loading:false,token:undefined};
        
        expect(reducer(undefined, startAction)).toEqual(expectedActions)
      });


      it('should handle AUTH_FAIL', () => {
        const startAction = {
          type: actionTypes.AUTH_FAIL
        };
        const expectedActions =
          {Lip:[],User:[],error:undefined,loading:false,token:null};
        
        expect(reducer(undefined, startAction)).toEqual(expectedActions)
      });


      it('should handle AUTH_LOGOUT', () => {
        const startAction = {
          type: actionTypes.AUTH_LOGOUT
        };
        const expectedActions =
          {Lip:[],User:[],error:null,loading:false,token:null};
        
        expect(reducer(undefined, startAction)).toEqual(expectedActions)
      });
>>>>>>> ce5f934287255c8528127115e05d59f5a760cbee

  




<<<<<<< HEAD
});
=======
});
>>>>>>> ce5f934287255c8528127115e05d59f5a760cbee
