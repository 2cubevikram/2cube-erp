const initialState = {
    today: [],
    loading: true,
    error: null,
};

const todayReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TODAY_STATUS_START':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'GET_TODAY_STATUS_SUCCESS':
            return {
                ...state,
                today: action.payload,
                loading: false, // Make sure this is set to false when data is fetched successfully
                error: null,
            };
        case 'GET_TODAY_STATUS_ERROR':
            return {
                ...state,
                today: [],
                loading: false, // Make sure this is set to false when there's an error
                error: action.payload,
            };
        default:
            return state;
    }
};

export default todayReducer;
