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
            const { id, _in, _out, status } = action.payload;

            const isIdExists = state.break.some((item) => item.id === id);

            if (!isIdExists) {
                const newItem = { id, _in, _out };
                return {
                    ...state,
                    status: status,
                    break: [...state.break, newItem], // Add the new item to the array
                };
            }

            // If the id already exists, leave the array unchanged
            return {
                ...state,
                status: status,
            }
        default:
            return state;
    }
}


export default breakReducer;