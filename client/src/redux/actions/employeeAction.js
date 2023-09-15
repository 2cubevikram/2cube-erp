import axios from "axios";
import API_BASE_URL from '../../apiConfig'

export const getEmployee = ({user}) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/employees`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        dispatch({type: 'GET_EMPLOYEE_SUCCESS', payload: response.data});
    } catch (error) {
        console.log(error);
    }
};

export const getAllEmployee = ({user}) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/all-employees`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        dispatch({type: 'GET_ALL_EMPLOYEE_SUCCESS', payload: response.data});
    } catch (error) {
        console.log(error);
    }
}


