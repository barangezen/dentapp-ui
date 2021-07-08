import {
    ADD_GROUPS,
    LOGOUT
} from '../constants/actionTypes';

const INITIAL_STATE = {
    groups: []
};

const groupReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_GROUPS:
            return { ...state, groups: [...action.payload] };
        case LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default groupReducer;