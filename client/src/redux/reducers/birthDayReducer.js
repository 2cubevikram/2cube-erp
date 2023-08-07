const initailState = {};

const birthdayReducer = (state = initailState, action) => {
    switch (action.type) {
        case 'GET_BIRTHDAY_SUCCESSFULLY':
            return action.payload;
        case 'GET_BIRTHDAY_FAILED':
            return action.payload;
        default:
            return state;
    }
}

export default birthdayReducer;