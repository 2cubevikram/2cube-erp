import axios from "axios";

export const getProfile = ({user,id}) => async (dispatch) => {
    try {
        const response = await axios.get(`/auth/id/${id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        dispatch(get_profile(response.data));
    } catch (error) {
        console.log(error);
    }
};

export const getAttendance = ({user,id}) => async (dispatch) => {
    try {
        const response = await axios.get(`/auth/check-in-status`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            params: {
                id: id,
                // date: "2023-07-13",
            }
        });
        dispatch(get_user_attendance(response.data));
    } catch (error) {
        console.log(error);
    }
};

export const get_profile = (payload) => ({
    type: "GET_USER_PROFILE",
    payload: payload,
});

export const get_user_attendance = (payload) => ({
    type: "GET_USER_ATTENDANCE",
    payload: payload,
});
