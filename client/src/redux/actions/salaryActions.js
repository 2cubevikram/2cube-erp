import axios from "axios";
import API_BASE_URL from "../../apiConfig";

export const getSalaryStatus = ({user, filterDate}) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/get-salary-satus`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            params: {
                date: filterDate,
            }
        });
        dispatch({type: 'GET_SALARY_SUCCESSFULLY', payload: response.data});
    } catch (error) {
        dispatch({type: 'GET_SALARY_ACTION_FAILED', payload: error.message});
    }
}

export const generateSalaryData = ({user,filterDate}) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/salary-data-generate`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            params: {
                date: filterDate,
            }
        });
        dispatch({type: 'GET_DATA_FOR_SALARY_GENERATE', payload: response.data});
    } catch (error) {
        dispatch({type: 'FAILED_SALARY_DATA_GENERATE', payload: error.message});
    }
}

export const generateSalary = ({user, obj}) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/salary-generate`, obj, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        });
        dispatch({type: 'GENERATE_SALARY_SUCCESSFULLY', payload: response.data});
    } catch (error) {
        dispatch({type: 'GENERATE_SALARY_ACTION_FAILED', payload: error.message});
    }
}

export const ReGenerateSalary = ({user, obj}) => async (dispatch) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/auth/salary-re-generate`, obj, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        });
        dispatch({type: 'REGENERATE_SALARY_SUCCESSFULLY', payload: response.data});
    } catch (error) {
        dispatch({type: 'REGENERATE_SALARY_ACTION_FAILED', payload: error.message});
    }
}

export const updateSalary = ({user, obj}) => async (dispatch) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/auth/update-salary`,
            {
                id: obj.id,
                amount: obj.amount,
                date: obj.date,
                extra_allowance: obj.extra_allowance,
                status: obj.status,
            },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        dispatch({type: 'GET_SALARY_SUCCESSFULLY', payload: response.data});
    } catch (error) {
        dispatch({type: 'UPDATE_SALARY_ACTION_FAILED', payload: error.message});
    }
}

export const manualSalaryAdd = ({user, obj}) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/manual-salary-add`, obj, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        });
        dispatch({type: 'ADD_MANUAL_SALARY_SUCCESSFULLY', payload: response.data});
    } catch (error) {
        dispatch({type: 'MANUAL_SALARY_ADD_ACTION_FAILED', payload: error.message});
    }
}