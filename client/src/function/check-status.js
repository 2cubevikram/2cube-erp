const statusOrder = ['CHECK_IN', 'BREAK_IN', 'BREAK_OUT', 'CHECK_OUT'];

const LabelObj = {
    CHECK_IN: 'Check In',
    CHECK_OUT: 'Check Out',
    BREAK_IN: 'Break In',
    BREAK_OUT: 'Break Out',
    '': 'Not Available'
}

export const getLastStatus = (userStatuses) => {
    for (let i = statusOrder.length - 1; i >= 0; i--) {
        const status = statusOrder[i];
        if (userStatuses.includes(status)) {
            return LabelObj[status];
        }
    }
    return null; // Default status when no valid status is found
}