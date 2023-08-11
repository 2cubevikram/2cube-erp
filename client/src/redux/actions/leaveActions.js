import axios from "axios";
import API_BASE_URL from "../../apiConfig";

export const leaveApplied = ({user, obj}) => async (dispatch) => {
    dispatch({type: 'LEAVE_APPLY_START'});
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/leave-applied`, obj, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        dispatch({type: 'LEAVE_APPLIED_SUCCESSFUL', payload: response.data});
    } catch (error) {
        dispatch({type: 'LEAVE_APPLIED_FAILED', payload: error.message});
    }
};

export const getLeaveById = ({user}) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/leave-by-id`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            params: {
                id: `${user.id}`,
            }
        });
        dispatch({type: 'GET_LEAVE_SUCCESS', payload: response.data});
    } catch (error) {
        dispatch({type: 'GET_LEAVE_FAILED', payload: error.message});
    }
};

export const getAllLeave = ({user}) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/all-leaves`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            params: {
                id: `${user.id}`,
            }
        });
        dispatch({type: 'GET_ALL_LEAVES_SUCCESS', payload: response.data});
    } catch (error) {
        dispatch({type: 'GET_ALL_LEAVES_FAILED', payload: error.message});
    }
};

export const updateLeave = ({user, obj}) => async (dispatch) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/auth/leave-update`, obj, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        dispatch({type: 'UPDATE_LEAVES_SUCCESS', payload: response.data});
    } catch (error) {
        dispatch({type: 'UPDATE_LEAVES_FAILED', payload: error.message});
    }
};