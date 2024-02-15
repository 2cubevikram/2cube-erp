import axios from "axios";
import API_BASE_URL from "../../apiConfig";


export const getReport = ({user, obj}) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/get-yearly-report`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            params: {
                id: `${user.id}`,
                employeeId: `${obj.employeeId}`,
                startDate: `${obj.startDate}`,
                endDate: `${obj.endDate}`
            }
        });
        dispatch({type: 'GET_REPORT_SUCCESSFULLY', payload: response.data});
    } catch (error) {
        dispatch({type: 'GET_REPORT_ACTION_FAILED', payload: error.message});
    }
};