let initialState = {
    status: null,
    message: null,
    day: {
        id: null,
        _in: null,
        _out: null
    },
    work: []
};

const checkReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHECK_IN':
            return {
                ...state,
                status: action.payload.status,
                day: {
                    ...state.day,
                    _in: action.payload._in,
                    id: action.payload.id,
                    _out: action.payload._out || null
                }
            }
        case 'CHECK_OUT':
            return {
                ...state,
                status: action.payload.status,
                day: {
                    ...state.day,
                    _out: action.payload._out,
                }
            }
        default:
            return state;
    }
}


export default checkReducer;