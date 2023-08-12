const initialState = {
    salary: [],
    loading: true,
    error: null
};

const salaryReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_SALARY_SUCCESSFULLY':
            return {
                ...state,
                salary: action.payload,
                loading: false,
            }
        case 'GET_SALARY_SUCCESSFULLY':
            return {
                ...state,
                salary: action.payload,
                loading: false,

            }
        case 'SALARY_ACTION_FAILED':
            return {
                ...state,
                salary: [],
                loading: false,
                error: action.payload,
            }
        default:
            return state;

    }
};

export default salaryReducer;

