import {
    LOGIN,
    LOGOUT,
    INVALIDATE_ALL,
    ADD_GROUPS
} from '../constants/actionTypes';

import messages from '../constants/messages';

import dentapp from '../api/dentapp';
import notification from '../utility/Notification';
import history from '../history';

const printErrors = response_errors => {
    let errors = [];

    if (response_errors && Array.isArray(response_errors)) {
        errors = [...response_errors];
    } else if (response_errors !== null && typeof response_errors == 'object') {
        Object.values(response_errors).forEach(individual_errors_array => {
            errors = [...errors, ...individual_errors_array];
        });
    }

    if (errors.length == 0) {
        notification.error(messages.error.UNKNOWN_ERROR);
        return;
    }

    errors.forEach(msg => {
        notification.error(msg);
    });
}

const beforeInvalidation = () => {
    notification.error(messages.error.SESSION_EXPIRED);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    history.push("/");
    return;
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
        if (! error.response) {
            notification.error(messages.error.SERVICE_UNAVAILABLE);
            return;
        }

        printErrors(error.response.data.errors);
    }
};

export const getAuthStateFromSession = () => async dispatch => {
    const user = window.localStorage.getItem('user');
    const token = window.localStorage.getItem('token');

    if (! user || ! token) {
        dispatch({ type: LOGOUT });
        return;
    }

    const auth = await checkAuth(JSON.parse(token));

    if (! auth) {
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('token');
        dispatch({ type: INVALIDATE_ALL });
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
        if (! error.response) {
            notification.error(messages.error.SERVICE_UNAVAILABLE);
            return;
        }

        if (error.response.status == 401) {
            beforeInvalidation();
            dispatch({ type: INVALIDATE_ALL });
            return;
        }
        printErrors(error.response.data.errors);
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
        if (! error.response) {
            notification.error(messages.error.SERVICE_UNAVAILABLE);
            return;
        }
        if (error.response.status == 401) {
            beforeInvalidation();
            dispatch({ type: INVALIDATE_ALL });
            return;
        }
        printErrors(error.response.data.errors);
    }
};