const initialState = {
    leave: [],
    prleave:[],
    yearlyleave: [],
    loading: true,
    error: null
}

const leaveReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LEAVE_APPLY_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'LEAVE_APPLIED_SUCCESSFUL':
            return {
                // ...state,
                leave: action.payload,
                loading: false,
                error: null
            };
        case 'LEAVE_APPLIED_FAILED':
            return {
                ...state,
                leave: [],
                loading: false,
                error: action.payload,
            };
        case 'GET_LEAVE_SUCCESS':
            return {
                ...state,
                leave: action.payload,
                loading: false,
                error: null,
            };
        case 'GET_LEAVE_FAILED':
            return {
                ...state,
                leave: [],
                loading: false,
                error: action.payload,
            };
        case 'GET_ALL_LEAVES_SUCCESS':
            return {
                ...state,
                leave: action.payload,
                loading: false,
                error: null,
            };
        case 'GET_ALL_LEAVES_FAILED':
            return {
                ...state,
                leave: [],
                loading: false,
                error: action.payload,
            };

        case 'GET_PREIVIOUS_LEAVES_SUCCESS':
            return {
                ...state,
                prleave: action.payload,
                loading: false,
                error: null,
            };
        case 'GET_PREIVIOUS_LEAVES_FAILED':
            return {
                ...state,
                preleave: [],
                loading: false,
                error: action.payload,
            };

        case 'GET_ALL_YEARLY_LEAVE_SUCCESS':
            return {
                ...state,
                yearlyleave: action.payload,
                loading: false,
                error: null,
            };
        case 'GET_YEARLY_LEAVE_FAILED':
            return {
                ...state,
                yearlyleave: [],
                loading: false,
                error: action.payload,
            };
        case 'UPDATE_LEAVES_SUCCESS':
            return {
                ...state,
                leave: action.payload,
                loading: false,
                error: null,
            };
        case 'UPDATE_LEAVES_FAILED':
            // return {
            //     ...state,
            //     leave: [],
            //     loading: false,
            //     error: action.payload,
            // };
            return {
                ...state
            };
        case 'DELETE_LEAVE_SUCCESS':
            console.log('action.payload', action.payload)
            return {
                ...state,
                leave: action.payload,
                loading: false,
                error: null,
            }
        case 'DELETE_LEAVE_FAILED':
            return {
                ...state,
                leave: [],
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}
export default leaveReducer;