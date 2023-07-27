import axios from "axios";
import API_BASE_URL from "../../apiConfig";

export const getProfile = ({user, id}) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/id/${id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        dispatch(get_profile(response.data));
    } catch (error) {
        console.log(error);
    }
};

export const getAttendance = ({user, id, filterDate}) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/check-in-status`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            params: {
                id: id,
                date: filterDate,
            }
        });
        dispatch(get_user_attendance(response.data));
    } catch (error) {
        console.log(error);
    }
};

export const breakTimeEdit = ({user, obj}) => async (dispatch) => {
    if (obj.status === "CHECK_IN" || obj.status === "CHECK_OUT") {
        try {
            const response = await axios.patch(`${API_BASE_URL}/auth/check-time-edit`,
                {
                    id: obj.id,
                    date: obj.date,
                    _in: obj._in,
                    _out: obj._out,
                    status: obj.status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            dispatch(check_time_edit(response.data));
        } catch (error) {
            dispatch({type: 'CHECK_TIME_EDIT_FAILED', payload: error.response.data.message });
            throw error.response.data.message;
        }
    } else {
        const response = await axios.patch(`${API_BASE_URL}/auth/break-time-edit`,
            {
                id: obj.id,
                date: obj.date,
                _in: obj._in,
                _out: obj._out,
                status: obj.status,
            },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        dispatch(break_time_edit(response.data));
    }

};

export const addUserProfile = ({user, obj}) => async (dispatch) => {
    const formData = new FormData();
    formData.append("first_name", obj.first_name);
    formData.append("last_name", obj.last_name);
    formData.append("birth_date", obj.birth_date);
    const fileList = obj.file;
    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        formData.append("file", file);
    }
    const response = await axios.patch(`${API_BASE_URL}/auth/add`, formData, {
        headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data", // Set the content type to handle file uploads
        },
    });
    dispatch(add_user_profile(response.data));
};


export const get_profile = (payload) => ({
    type: "GET_USER_PROFILE",
    payload: payload,
});

export const get_user_attendance = (payload) => ({
    type: "GET_USER_ATTENDANCE",
    payload: payload,
});

export const break_time_edit = (payload) => ({
    type: "BREAK_TIME_EDIT",
    payload: payload,
});

export const check_time_edit = (payload) => ({
    type: "CHECK_TIME_EDIT",
    payload: payload,
});

export const add_user_profile = (payload) => ({
    type: "ADD_USER_PROFILE",
    payload: payload,
});

