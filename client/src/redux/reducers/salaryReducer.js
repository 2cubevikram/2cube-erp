const initialState = {
    dataGenerate: [],
    salary: [],
    loading: true,
    error: null
};

const salaryReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_SALARY_SUCCESSFULLY':
            return {
                ...state,
                salary: action.payload,
                loading: false,
                error: null
            }
        case 'GET_SALARY_ACTION_FAILED':
            return {
                ...state,
                salary: [],
                loading: false,
                error: null
            }
        case 'GET_DATA_FOR_SALARY_GENERATE':
            return {
                ...state,
                dataGenerate: action.payload,
                loading: false,
                error: null
            }
        case 'FAILED_SALARY_DATA_GENERATE':
            return {
                ...state,
                dataGenerate: [],
                loading: false,
                error: null
            }
        case 'GENERATE_SALARY_SUCCESSFULLY':
            return {
                ...state,
                salary: action.payload,
                loading: false,
                error: null
            }
        case 'GENERATE_SALARY_ACTION_FAILED':
            return {
                ...state,
                salary: [],
                loading: false,
                error: action.payload
            }
        case 'REGENERATE_SALARY_SUCCESSFULLY':
            return {
                ...state,
                salary: action.payload,
                loading: false,
                error: null
            }
        case 'REGENERATE_SALARY_ACTION_FAILED':
            return {
                ...state,
                salary: [],
                loading: false,
                error: action.payload
            }
        case 'DELETE_SALARY_SUCCESSFULLY':
            return {
                ...state,
                salary: action.payload,
                loading: false,
                error: null
            }
        case 'SALARY_DELETE_ACTION_FAILED':
            return {
                ...state,
                salary: [],
                loading: false,
                error: action.payload
            }

        default:
            return state;

    }
};

export default salaryReducer;

