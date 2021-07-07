import { ADD_ALERT, CLEAR_ALERTS } from '../constants/actionTypes';

const INITIAL_STATE = {
    messages: []
};

const alertReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_ALERT:
            return {
                ...state,
                messages: [ ...state.messages, action.payload ]
            };
        case CLEAR_ALERTS:
            return {
                ...state,
                messages: []
            };
        default:
            return state;
    }
};

export default alertReducer;