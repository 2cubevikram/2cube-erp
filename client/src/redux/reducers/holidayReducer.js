const initialState = {
    holiday: [],
    loading: true,
    error: null
};

const holidayReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_HOLIDAY_SUCCESSFULLY':
            return {
                ...state,
                holiday: action.payload,
                loading: false,
                error: null
            };
        case 'GET_HOLIDAY_SUCCESSFULLY':
            return {
                ...state,
                holiday: action.payload,
                loading: false,
                error: null,
            };
        case 'HOLIDAY_ACTION_FAILED':
            return {
                ...state,
                holiday: [],
                loading: false,
                error: action.payload,
            };
        case 'DELETE_HOLIDAY_SUCCESSFULLY':
            return {
                ...state,
                holiday: action.payload,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
}

export default holidayReducer;


