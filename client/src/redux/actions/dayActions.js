import axios from "axios";
import API_BASE_URL from '../../apiConfig'

export const getToDayStatus = ({user}) => async (dispatch) => {
    try {
        dispatch({ type: 'GET_TODAY_STATUS_START' });
        const response = await axios.get(`${API_BASE_URL}/auth/to-day`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        dispatch({ type: 'GET_TODAY_STATUS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'GET_TODAY_STATUS_ERROR', payload: error.message });
    }
};

export const getBirthday = ({user}) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/get-birthday`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        });
        dispatch({type: 'GET_BIRTHDAY_SUCCESSFULLY', payload: response.data});
    } catch (error) {
        dispatch({type: 'GET_BIRTHDAY_FAILED', payload: error.message});
    }
};