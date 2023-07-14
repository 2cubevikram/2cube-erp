import axios from "axios";
import {checkin} from "./checkAction";

export const BreakIn = (user) => async dispatch => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
    };

    let data = {
        "method": "ADD",
        "status": "BREAK_IN",
        "action": "break"
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
            dispatch(breakin(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
};

export const BreakOut = ({user, lastBreakData}) => async dispatch => {

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
    };

    let data = {
        "method": "UPDATE",
        "status": "BREAK_OUT",
        "action": "break",
        "id": lastBreakData.id
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
            dispatch(breakout(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
};


export const getDayStatus = ({user}) => async dispatch => {

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
    };

    // let data = {
    //     "date":"2023-07-11"
    // }
    let config = {
        method: "GET",
        maxBodyLength: Infinity,
        url: '/auth/check-in-status',
        headers: headers,
        // data: data
    };
    const response = await axios.request(config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });

    dispatch(checkin(response.check));

    response.breakin.map((breaks) => {
        console.log("breaks", breaks);
        if (breaks.status === "BREAK_IN") {
            dispatch(breakAll(breaks));
        }
        if (breaks.status === "BREAK_OUT") {
            dispatch(breakAll(breaks));
        }
    })
};

export const breakin = (payload) => ({
    type: 'BREAK_IN',
    payload: payload,
});

export const breakout = (payload) => ({
    type: 'BREAK_OUT',
    payload: payload,
});

export const breakAll = (payload) => ({
    type: 'BREAK_ALL',
    payload: payload,
});


