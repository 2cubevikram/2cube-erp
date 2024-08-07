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

export const getLeaveById = ({user, startDate, endDate}) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/leave-by-id`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            params: {
                id: `${user.id}`,
                start_date: startDate,
                end_date: endDate
            }
        });
        dispatch({type: 'GET_LEAVE_SUCCESS', payload: response.data});
    } catch (error) {
        dispatch({type: 'GET_LEAVE_FAILED', payload: error.message});
    }
};

export const getAllLeave = ({user, filterDate}) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/all-leaves`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            params: {
                id: `${user.id}`,
                date: filterDate,
            }
        });
        dispatch({type: 'GET_ALL_LEAVES_SUCCESS', payload: response.data});
    } catch (error) {
        dispatch({type: 'GET_ALL_LEAVES_FAILED', payload: error.message});
    }
};

export const getAllPreviousLeave = ({user, filterDate}) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/all-previous-leaves`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            params: {
                date: filterDate,
            }
        });
        console.log( response.data);
        dispatch({type: 'GET_PREIVIOUS_LEAVES_SUCCESS', payload: response.data});
    } catch (error) {
        dispatch({type: 'GET_PREIVIOUS_LEAVES_FAILED', payload: error.message});
    }
};

export const getYearlyLeaveById = ({user, startDate, endDate, current_user_id}) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/leaves-by-year`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            params: {
                id: current_user_id,
                start_date: startDate,
                end_date: endDate,
            }
        });
        dispatch({type: 'GET_ALL_YEARLY_LEAVE_SUCCESS', payload: response.data});
    } catch (error) {
        dispatch({type: 'GET_YEARLY_LEAVE_FAILED', payload: error.message});
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
        throw error.response.data.message;
    }
};

export const deleteLeave = ({user, id, date}) => async (dispatch) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/auth/leave-delete`, {
            params: {
                id: id,
                date:date,
            },
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        });
        dispatch({type: 'DELETE_LEAVE_SUCCESS', payload: response.data});
    } catch (error) {
        dispatch({type: 'DELETE_LEAVE_FAILED', payload: error.message});
    }
}