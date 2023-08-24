import {checkLogin, setCookie} from "../../function/check_login";

let initialState = {
    isLoggedIn: false,
    user: null,
    error: null,
};

if (localStorage.getItem("user")) {
    initialState.isLoggedIn = true;
    initialState.user = JSON.parse(localStorage.getItem("user"));
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS': {
            console.log(action.payload)
            // localStorage.setItem("user", JSON.stringify(action.payload));
            const userJson = JSON.stringify(action.payload.data);
            localStorage.setItem("user", userJson);

            if (action.payload.data.isRemember) {
                // const expirationTimeInSeconds = 60; // Example: 1 minutes
                const expirationTimeInSeconds = 30 * 24 * 60 * 60; // 30 days (approximately)
                const expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + expirationTimeInSeconds * 1000);
                setCookie('user', userJson, {expires: expirationDate, path: '/'});
            }

            checkLogin();
            return {
                isLoggedIn: true,
                user: action.payload.data,
                error: null,
            };
        }
        case 'LOGIN_FAILURE':
            return {
                isLoggedIn: false,
                user: null,
                error: action.payload,
            };
        case 'LOG_OUT':
            localStorage.removeItem("user");
            // setCookie('user', '', { expires: -1, path: '/' });
            return {
                isLoggedIn: false,
                user: null,
                error: action.payload,
            };
        case 'REGISTER_SUCCESS':
            return {
                isLoggedIn: false,
                user: null,
                error: null,
            };
        case 'REGISTER_FAILURE':
            return {
                isLoggedIn: false,
                user: null,
                error: action.payload,
            }
        case 'SEND_EMAIL_SUCCESS':
            return {
                isLoggedIn: false,
                user: null,
                error: null,
            };
        case 'SEND_EMAIL_FAILURE':
            return {
                isLoggedIn: false,
                user: null,
                error: action.payload,
            }
        case 'CHANGE_PASSWORD_SUCCESS':
            return {
                isLoggedIn: false,
                user: null,
                error: null,
            };
        case 'CHANGE_PASSWORD_FAILURE':
            return {
                isLoggedIn: false,
                user: null,
                error: action.payload,
            }
        default:
            return state;
    }
};
export const getUser = (state) => state.login.user;
export default authReducer;
