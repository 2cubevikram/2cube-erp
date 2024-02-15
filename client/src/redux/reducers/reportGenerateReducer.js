const initialState = {
    report: [],
    loading: true,
    error: null
};

const reportGenerateReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_REPORT_SUCCESSFULLY':
            return {
                ...state,
                report: action.payload,
                loading: false,
                error: null,
            };
        case 'GET_REPORT_ACTION_FAILED':
            return {
                ...state,
                report: [],
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default reportGenerateReducer;


