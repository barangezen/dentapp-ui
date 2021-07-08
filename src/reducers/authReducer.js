import { LOGIN, LOGOUT, UPDATE_USER_PROFILE } from '../constants/actionTypes';

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
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                user: null
            }
        case UPDATE_USER_PROFILE:
            return {
                ...state,
                user: action.payload.user
            }
        default:
            return state;
    }
};

export default authReducer;