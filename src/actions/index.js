import {
    LOGIN,
    LOGOUT,
    ADD_ALERT,
    CLEAR_ALERTS
} from '../constants/actionTypes';

import dentapp from '../api/dentapp';
import notification from '../utility/Notification';

export const login = (email, password) => async (dispatch, getState) => {
    try {
        var response = await dentapp.post('/login', {
            email: email,
            password: password
        });

        dispatch({
            type: LOGIN,
            payload: {
                user: response.data.user,
                token: response.data.token
            }
        });

        notification.success(`Welcome back, ${response.data.user.first_name} ${response.data.user.last_name}`);
    } catch (error) {
        let errors = [];

        if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
            errors = [ ...error.response.data.errors ];
        } else if (error.response.data.errors !== null && typeof error.response.data.errors == 'object') {
            Object.values(error.response.data.errors).forEach(individual_errors_array => {
                errors = [ ...errors, ...individual_errors_array ];
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