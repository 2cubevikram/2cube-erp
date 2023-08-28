const initialState = {
    birthday: [],
    notification: [],
    loading: false,
};

const birthdayReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BIRTHDAY_SUCCESSFULLY':
            // return action.payload;
            return {
                ...state,
                birthday: action.payload,
                loading: false,
            }
        case 'GET_BIRTHDAY_FAILED':
            return action.payload;
        case 'GET_NOTIFICATION_SUCCESS':
            return {
                ...state,
                notification: action.payload,
                loading: false,
            };
        case 'GET_NOTIFICATION_FAILURE':
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}

export default birthdayReducer;