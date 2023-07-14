let initialState = {
    status: "BREAK_OUT",
    break: [],
};

const breakReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BREAK_IN':
            let obj = {
                id: action.payload.id,
                _in: action.payload._in,
                _out: null
            }
            return {
                ...state,
                status: action.payload.status,
                break: [...state.break, obj]
            }
        case 'BREAK_OUT':
            console.log("action", action.payload)
            return {
                ...state,
                status: action.payload.status,
                break: state.break.map((item) => {
                    if (item.id === action.payload.id) {
                        item._out = action.payload._out
                    }
                    return item;
                })
            }
        case 'BREAK_ALL':
            let obj1 = {
                id: action.payload.id,
                _in: action.payload._in,
                _out: action.payload._out
            }
            return {
                ...state,
                status: action.payload.status,
                break: [...state.break, obj1]
            }
        default:
            return state;
    }
}


export default breakReducer;