import axios from "axios";
import API_BASE_URL from '../../apiConfig'

export const getEmployee = ({user}) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/employees`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        dispatch(get_employee(response.data));
    } catch (error) {
        console.log(error);
    }
};

export const get_employee = (payload) => ({
    type: "GET_EMPLOYEE_SUCCESS",
    payload: payload,
});


