import axios from 'axios';
import API_BASE_URL from '../../apiConfig'

export const login = (email, password, isRemember = false) => async dispatch => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {email, password});
        response.data.isRemember = isRemember;
        dispatch({type: 'LOGIN_SUCCESS', payload: response});
    } catch (error) {
        dispatch({type: 'LOGIN_FAILURE', payload: error.response.data.message});
        throw error.response.data.message;
    }
};

export const register = ({userData}) => async dispatch => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
        dispatch({type: 'REGISTER_SUCCESS', payload: response.data});
    } catch (error) {
        dispatch({type: 'REGISTER_FAILURE', payload: error.response.data.message});
        throw error.response.data.message;
    }
};

export const sendEmail = (email) => async dispatch => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/send-email`, {
            params: {
                email: email,
            }
        });
        dispatch({type: 'SEND_EMAIL_SUCCESS', payload: response.data});
    } catch (error) {
        dispatch({type: 'SEND_EMAIL_FAILURE', payload: error.response.data.message});
        throw error.response.data.message;
    }
};

export const changePassword = (password, token) => async dispatch => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/auth/reset-password`, {password, token});
        dispatch({type: 'CHANGE_PASSWORD_SUCCESS', payload: response.data});
    } catch (error) {
        dispatch({type: 'CHANGE_PASSWORD_FAILURE', payload: error.response.data.message});
        throw error.response.data.message;
    }
};

export const userDelete = ({params, user}) => async dispatch => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/auth/delete-user`, params, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        dispatch({type: 'USER_DELETE_SUCCESS', payload: response.data});
    } catch (error) {
        dispatch({type: 'USER_DELETE_FAILURE', payload: error.response.data.message});
        throw error.response.data.message;
    }
};

// get all notification
export const getNotification = ({user}) => async dispatch => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/get-notification`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        dispatch({type: 'GET_NOTIFICATION_SUCCESS', payload: response.data});
    } catch (error) {
        dispatch({type: 'GET_NOTIFICATION_FAILURE', payload: error.response.data.message});
        throw error.response.data.message;
    }
}

export const logoutUser = data => ({
    type: 'LOG_OUT',
    payload: data
})


