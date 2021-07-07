import {
    LOGIN,
    LOGOUT,
    INVALIDATE_ALL
} from '../constants/actionTypes';

import dentapp from '../api/dentapp';
import notification from '../utility/Notification';
import history from '../history';

export const checkAuth = async token => {
    try {
        var response = await dentapp.get('/check', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return true;
    } catch (error) {
        if ((error.response.status) && error.response.status == 401 || error.response.status == 419) {
            notification.remove();
            notification.error('Your session has been expired. Please log in to continue');
        } else {
            notification.remove();
            notification.error('Service unavailable. Please contact with support.');
        }
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('token');
        return false;
    }
};

export const login = (email, password) => async (dispatch, getState) => {
    try {
        var response = await dentapp.post('/login', {
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
        try {
            let errors = [];

            if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
                errors = [ ...error.response.data.errors ];
            } else if (error.response.data.errors !== null && typeof error.response.data.errors == 'object') {
                Object.values(error.response.data.errors).forEach(individual_errors_array => {
                    errors = [ ...errors, ...individual_errors_array ];
                });
            }

            if (errors.length == 0) {
                notification.remove();
                notification.error('An error occurred. Please contact with support.');
            } else {
                errors.forEach(error_message => {
                    notification.error(error_message);
                });
            }  
        } catch (error) {
            notification.remove();
            notification.error('Service unavailable. Please contact with support.');
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