const initialState = {
    profile:null,
    attendance:{
        check:null,
        break:null
    }
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_PROFILE':
            return {
                ...state,
                profile:action.payload
            }
        case 'GET_USER_ATTENDANCE':
            return {
                ...state,
                attendance:action.payload
            }
        case 'BREAK_TIME_EDIT':
            return action.payload;
        default:
            return state;
    }
}

export default profileReducer;