import axios from "axios";

export const CheckIn = (user) => async dispatch => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
    };

    let data = {
        "method": "ADD",
        "status": "CHECK_IN",
        "action": "check"
    }
    let config = {
        method: "POST",
        maxBodyLength: Infinity,
        url: '/auth/timestamp',
        headers: headers,
        data: data
    };
    await axios.request(config)
        .then((response) => {
            dispatch(checkin(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
};

export const CheckOut = ({user,day}) => async dispatch => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
    };

    let data = {
        "method":"UPDATE",
        "status":"CHECK_OUT",
        "action":"check",
        "id":day.id
    }
    let config = {
        method: "PATCH",
        maxBodyLength: Infinity,
        url: '/auth/timestamp',
        headers: headers,
        data: data
    };
    await axios.request(config)
        .then((response) => {
            dispatch(checkout(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
};

export const checkin = (payload) => ({
    type: 'CHECK_IN',
    payload: payload,
});

export const checkout = (payload) => ({
    type: 'CHECK_OUT',
    payload: payload,
});