const initialState = {}

const oldEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_OLD_EMPLOYEE_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}
export default oldEmployeeReducer;