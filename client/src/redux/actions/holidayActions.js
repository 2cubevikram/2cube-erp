import axios from "axios";
import API_BASE_URL from "../../apiConfig";

export const addHoliday = ({user, obj}) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/add-holiday`, obj, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        });
        dispatch({type: 'ADD_HOLIDAY_SUCCESSFULLY', payload: response.data});
    } catch (error) {
        dispatch({type: 'HOLIDAY_ACTION_FAILED', payload: error.message});
    }
};

export const getHoliday = ({user}) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/get-holiday`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        });
        dispatch({type: 'GET_HOLIDAY_SUCCESSFULLY', payload: response.data});
    } catch (error) {
        dispatch({type: 'HOLIDAY_ACTION_FAILED', payload: error.message});
    }
};

export const deleteHoliday = ({user, id}) => async (dispatch) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/auth/delete-holiday`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        });
        dispatch({type: 'DELETE_HOLIDAY_SUCCESSFULLY', payload: response.data});
    } catch (error) {
        dispatch({type: 'HOLIDAY_ACTION_FAILED', payload: error.message});
    }
}