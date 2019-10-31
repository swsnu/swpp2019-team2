import * as actionTypes from '../actions/actionTypes';

const initialState = {
    Users : [],
    selectedUser:null,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_USERS:
            return { ...state, Users : action.Users};
        case actionTypes.GET_USER:
            return {...state, selectedUser : action.target };
        case actionTypes.PUT_USER:
            const userstatus = state.Users.map((User) =>
            {
                if(User.id === action.targetID){
                    User.logged_in = action.logged_in
                    return User
                }
                else{
                    return User
                }
            });
            return {...state, Users : userstatus, selectedUser : action.target};
        
            default:
            break;
    }
    return state;
}

export default reducer;