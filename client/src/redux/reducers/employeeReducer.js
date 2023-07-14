const initialState = {}

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_EMPLOYEE_SUCCESS':
            return action.payload;
        case 'GET_EMPLOYEE_FAILURE':
            return action.payload;
        default:
            return state;
    }
}
export default employeeReducer;