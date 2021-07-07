import {
    LOGIN,
    LOGOUT,
    INVALIDATE_ALL,
    ADD_GROUPS
} from '../constants/actionTypes';

import dentapp from '../api/dentapp';
import notification from '../utility/Notification';
import history from '../history';

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
            notification.error('Service unavailable. Please contact with support.');
            return false;
        }
        if ((error.response.status) && error.response.status == 401 || error.response.status == 419) {
            notification.error('Your session has been expired. Please login to continue');
        } else {
            notification.error('Service unavailable. Please contact with support.');
        }
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('token');
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
            notification.error('Service unavailable. Please contact with support.');
        }

        let errors = [];

        if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
            errors = [...error.response.data.errors];
        } else if (error.response.data.errors !== null && typeof error.response.data.errors == 'object') {
            Object.values(error.response.data.errors).forEach(individual_errors_array => {
                errors = [...errors, ...individual_errors_array];
            });
        }

        if (errors.length == 0) {
            notification.error('An error occurred. Please contact with support.');
        } else {
            errors.forEach(error_message => {
                notification.error(error_message);
            });
        }
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
        history.push('/');
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
            notification.error("Service unavailable. Please contact with support.");
            return;
        }

        if (error.response.status == 401) {
            notification.error("Your session has been expired. Please login to continue.");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            history.push("/");
            dispatch({ type: INVALIDATE_ALL });
            return;
        }

        let errors = [];

        if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
            errors = [...error.response.data.errors];
        } else if (error.response.data.errors !== null && typeof error.response.data.errors == 'object') {
            Object.values(error.response.data.errors).forEach(individual_errors_array => {
                errors = [...errors, ...individual_errors_array];
            });
        }

        if (errors.length == 0) {
            notification.error('An error occurred. Please contact with support.');
        } else {
            errors.forEach(error_message => {
                notification.error(error_message);
            });
        }        
    }
};

export const addUser = (formValues) => async (dispatch, getState) => {
    try {
        const response = await dentapp.post("/register", { ...formValues }, {
            headers: {
                "Authorization": `Bearer ${getState().auth.token}`
            }
        });

        notification.success("User has been registered.");
    } catch (error) {
        if (! error.response) {
            notification.error("Service unavailable. Please contact with support.");
            return;
        }

        if (error.response.status == 401) {
            notification.error("Your session has been expired. Please login to continue.");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            history.push("/");
            dispatch({ type: INVALIDATE_ALL });
            return;
        }

        let errors = [];

        if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
            errors = [...error.response.data.errors];
        } else if (error.response.data.errors !== null && typeof error.response.data.errors == 'object') {
            Object.values(error.response.data.errors).forEach(individual_errors_array => {
                errors = [...errors, ...individual_errors_array];
            });
        }

        if (errors.length == 0) {
            notification.error('An error occurred. Please contact with support.');
        } else {
            errors.forEach(error_message => {
                notification.error(error_message);
            });
        }
    }
};