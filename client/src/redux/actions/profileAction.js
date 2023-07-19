import axios from "axios";

export const getProfile = ({user, id}) => async (dispatch) => {
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

export const getAttendance = ({user, id, filterDate}) => async (dispatch) => {
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

export const breakTimeEdit = ({user, obj}) => async (dispatch) => {
    console.log(obj)
    if (obj.status === "CHECK_IN" || obj.status === "CHECK_OUT") {
        console.log(obj.status)
        const response = await axios.patch(`/auth/check-time-edit`,
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
    } else {
        console.log(obj.status)
        const response = await axios.patch(`/auth/break-time-edit`,
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
