import {
    ADD_GROUPS,
    INVALIDATE_ALL
} from '../constants/actionTypes';

const INITIAL_STATE = {
    groups: []
};

const groupReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_GROUPS:
            return { ...state, groups: [...state.groups, ...action.payload] };
        case INVALIDATE_ALL:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default groupReducer;