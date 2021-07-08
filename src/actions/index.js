import {
    LOGIN,
    LOGOUT,
    ADD_GROUPS
} from '../constants/actionTypes';

import messages from '../constants/messages';

import dentapp from '../api/dentapp';
import notification from '../utility/Notification';
import history from '../history';

const clearLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
}

export const syncStateWithLocalStorage = () => async (dispatch, getState) =>{
    const user = window.localStorage.getItem('user');
    const token = window.localStorage.getItem('token');

    if (user !== getState().auth.token || ! user) {
        clearLocalStorage();
        dispatch({
            type: LOGOUT
        });
        history.push('/');
        notification.error(messages.error.SESSION_EXPIRED);
    }
};

const handleErrors = (error, dispatch) => {
    if (error.response) {
        if (error.response.status == 401) {
            clearLocalStorage();
            dispatch({
                type: LOGOUT
            });
            history.push("/");
            notification.error(messages.error.SESSION_EXPIRED);
        } else {
            let errors = [];

            if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
                errors = [...error.response.data.errors];
            } else if (error.response.data.errors !== null && typeof error.response.data.errors == 'object') {
                Object.values(error.response.data.errors).forEach(item => {
                    if (Array.isArray(item)) {
                        errors = [...errors, ...item];
                    } else if (item !== null && typeof item == "string") {
                        errors.push(item);
                    }
                });
            }
            if (errors.length < 1) {
                notification.error(messages.error.UNKNOWN_ERROR);
            } else {
                errors.forEach(msg => {
                    notification.error(msg);
                });
            }
        }
    } else if (error.request) {
        notification.error(messages.error.SERVICE_UNAVAILABLE);
    } else {
        notification.error(messages.error.UNKNOWN_ERROR);
    }
};

export const checkAuth = async token => {
    try {
        const response = await dentapp.get('/check', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (error) {
        if (! error.response) {
            notification.error(messages.error.SERVICE_UNAVAILABLE);
            return false;
        }
        if ((error.response.status) && error.response.status == 401 || error.response.status == 419) {
            notification.error(messages.error.SESSION_EXPIRED);
        } else {
            notification.error(messages.error.SERVICE_UNAVAILABLE);
        }
        return false;
    }
};

export const login = (email, password) => async (dispatch, getState) => {
    try {
        const response = await dentapp.post('/login', {
            email: email,
            password: password
        });

        window.localStorage.setItem('user', JSON.stringify(response.data.user));
        window.localStorage.setItem('token', JSON.stringify(response.data.token));

        dispatch({
            type: LOGIN,
            payload: {
                user: response.data.user,
                token: response.data.token
            }
        });

        notification.success(`Welcome back, ${response.data.user.first_name} ${response.data.user.last_name}`);
    } catch (error) {
        handleErrors(error, dispatch);
    }
};

export const getAuthStateFromSession = () => async dispatch => {
    const user = window.localStorage.getItem('user');
    const token = window.localStorage.getItem('token');

    if (! user || ! token) {
        clearLocalStorage();
        dispatch({ type: LOGOUT });
        return;
    }

    const auth = await checkAuth(JSON.parse(token));

    if (! auth) {
        clearLocalStorage();
        dispatch({ type: LOGOUT });
        return;
    }

    dispatch({
        type: LOGIN,
        payload: {
            user: JSON.parse(user),
            token: JSON.parse(token)
        }
    });
};

export const fetchGroups = () => async (dispatch, getState) => {
    try {
        const response = await dentapp.get('/groups', {
            headers: {
                "Authorization": `Bearer ${getState().auth.token}`
            }
        });

        dispatch({
            type: ADD_GROUPS,
            payload: response.data
        });
    } catch (error) {
        handleErrors(error, dispatch);
    }
};

export const addUser = (formValues) => async (dispatch, getState) => {
    try {
        const response = await dentapp.post("/register", { ...formValues }, {
            headers: {
                "Authorization": `Bearer ${getState().auth.token}`
            }
        });
        notification.success(messages.success.REGISTER_SUCCESSFUL);
    } catch (error) {
        handleErrors(error, dispatch);
    }
};