const initialState = {}

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_EMPLOYEE_SUCCESS':
            return action.payload;
        case 'GET_EMPLOYEE_FAILURE':
            return action.payload;
        case 'BREAK_TIME_EDIT':
            return action.payload;
        case 'USER_DELETE_SUCCESS':
            return action.payload;
        case 'USER_DELETE_FAILURE':
            console.log(action.payload)
            return {
                error: action.payload,
            }
        default:
            return state;
    }
}
export default employeeReducer;