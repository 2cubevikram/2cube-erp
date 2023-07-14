const initailState = {};

const attendanceReducer = (state = initailState, action) => {
    switch (action.type) {
        case 'GET_USER_ATTENDANCE':
            return action.payload;
        default:
            return state;
    }
}

export default attendanceReducer;