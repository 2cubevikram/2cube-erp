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

export const getAttendance = ({user,id, filterDate }) => async (dispatch) => {
    try {
        const response = await axios.get(`/auth/check-in-status`, {
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

export const breakTimeEdit = ({ user, obj }) => async (dispatch) => {
    let url;
    switch (obj.status) {
        case "CHECK_IN":
        case "CHECK_OUT":
            url = "/auth/check-time-edit";
            break;
        default:
            url = "/auth/break-time-edit";
    }

    try {
        const response = await axios.patch(url,
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
        console.log(response.data)
        dispatch(break_time_edit(response.data));
    } catch (error) {
        console.log(error);
        // Add error handling logic or dispatch error actions here
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

export const break_time_edit = (payload) => ({
    type: "BREAK_TIME_EDIT",
    payload: payload,
});
