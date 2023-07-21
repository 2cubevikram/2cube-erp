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
            localStorage.setItem("user", JSON.stringify(action.payload))
            return {
                isLoggedIn: true,
                user: action.payload,
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
        default:
            return state;
    }
};
export const getUser = (state) => state.login.user;
export default authReducer;
