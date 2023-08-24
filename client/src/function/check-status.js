const statusOrder = ['CHECK_IN', 'BREAK_IN', 'BREAK_OUT', 'CHECK_OUT'];


export const getLastStatus = (userStatuses) => {
    for (let i = statusOrder.length - 1; i >= 0; i--) {
        const status = statusOrder[i];
        if (userStatuses.includes(status)) {
            return status;
        }
    }
    return null; // Default status when no valid status is found
}