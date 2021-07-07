import { combineReducers } from "redux";
import authReducer from "./authReducer";
import groupReducer from "./groupReducer";

export default combineReducers({
    auth: authReducer,
    group: groupReducer
});