// const initialState = {};
const initialState = null;
const lastCheckReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHECK_LAST_STATUS':
            // return {
            //     ...state,
            //     ... action.payload,
            // }
            return action.payload;
        default:
            return state;
    }
}

export default lastCheckReducer;