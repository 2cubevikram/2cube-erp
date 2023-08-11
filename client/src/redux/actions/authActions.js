import axios from 'axios';
import API_BASE_URL from '../../apiConfig'

export const login = (email, password) => async dispatch => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {email, password});
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    }catch (error) {
        dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.message });
        throw error.response.data.message;
    }
};

export const register = ({userData}) => async dispatch => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
        dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'REGISTER_FAILURE', payload: error.response.data.message });
    }
};

export const logoutUser = data => ({
    type: 'LOG_OUT',
    payload: data
})


