import axios from 'axios';

export const login = (email, password) => async dispatch => {
    try {
        const response = await axios.post('/auth/login', {email, password});
        console.log(response.data)
        dispatch(loginSuccess(response.data));
    } catch (error) {
        dispatch(loginFailure(error.response.data.message));
    }
};

export const register = ({userData}) => async dispatch => {
    try {
        const response = await axios.post('/auth/register', userData);
        dispatch(registerSuccess(response.data));
    } catch (error) {
        dispatch(registerFailure(error.response.data.message));
    }
}

export const loginSuccess = token => ({
    type: 'LOGIN_SUCCESS',
    payload: token,
});

export const loginFailure = error => ({
    type: 'LOGIN_FAILURE',
    payload: error,
});

export const logoutUser = data => ({
    type: 'LOG_OUT',
    payload: data
})

export const registerSuccess = payload => ({
    type: 'REGISTER_SUCCESS',
    payload: payload
})

export const registerFailure = payload => ({
    type: 'REGISTER_FAILURE',
    payload: payload
})


