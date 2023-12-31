const initialState = {
    profile: null,
    attendance: {
        check: null,
        break: null
    }
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_PROFILE':
            return {
                ...state,
                profile: action.payload
            }
        case 'GET_USER_ATTENDANCE':
            return {
                ...state,
                attendance: action.payload
            }
        case 'CHECK_TIME_EDIT':
            return {
                ...state,
                attendance: {
                    ...state.attendance,
                    check: {
                        id: action.payload.id,
                        employee_id: action.payload.employee_id,
                        _in: action.payload._in,
                        _out: action.payload._out,
                        status: action.payload.status
                    }
                }
            };
        case 'CHECK_TIME_EDIT_FAILED':
            return {
                ...state
            };
        case 'BREAK_TIME_EDIT':
            return {
                ...state,
                attendance: {
                    ...state.attendance,
                    breakin: state.attendance.breakin.map((item) => {
                        if (item.id === action.payload.id) {
                            return {
                                "id": action.payload.id,
                                "employee_id": action.payload.employee_id,
                                "_in": action.payload._in,
                                "_out": action.payload._out,
                                "status": action.payload.status,
                            };
                        }
                        return item;
                    })
                }
            };
        case 'ADD_USER_PROFILE':
            // localStorage.setItem("user", JSON.stringify(action.payload))
            return {
                ...state,
                profile: action.payload
            }
        case 'UPDATE_USER_PROFILE':
            // localStorage.setItem("user", JSON.stringify(action.payload))
            return {
                ...state,
                profile: action.payload
            }
        default:
            return state;
    }
}

export default profileReducer;