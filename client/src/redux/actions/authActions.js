import axios from 'axios';

export const login = (email, password) => async dispatch => {
    try {
        const response = await axios.post('/auth/login', { email, password });
        dispatch(loginSuccess(response.data));
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

export const loginSuccess = token => ({
    type: 'LOGIN_SUCCESS',
    payload: token,
});

export const loginFailure = error => ({
    type: 'LOGIN_FAILURE',
    payload: error,
});


export const logoutUser = data => ({
    type : 'LOG_OUT',
    payload:data
})