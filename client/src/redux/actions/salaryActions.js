import axios from "axios";
import API_BASE_URL from "../../apiConfig";

export const addSalary = ({user, obj}) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/add-salary`, obj, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        });
        dispatch({type: 'ADD_SALARY_SUCCESSFULLY', payload: response.data});
    } catch (error) {
        dispatch({type: 'SALARY_ACTION_FAILED', payload: error.message});
    }
}

export const getSalary = ({user}) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/salary`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        });
        dispatch({type: 'GET_SALARY_SUCCESSFULLY', payload: response.data});
    } catch (error) {
        dispatch({type: 'SALARY_ACTION_FAILED', payload: error.message});
    }
}