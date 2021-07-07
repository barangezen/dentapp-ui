import { INVALIDATE_ALL, LOGIN, LOGOUT } from '../constants/actionTypes';

const INITIAL_STATE = {
    isLoggedIn: null,
    token: null,
    user: null
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return { 
                ...state, 
                isLoggedIn: true, 
                token: action.payload.token, 
                user: action.payload.user 
            };
        case LOGOUT:
        case INVALIDATE_ALL:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                user: null
            }
        default:
            return state;
    }
};

export default authReducer;