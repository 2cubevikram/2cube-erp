import { combineReducers } from 'redux';
import authReducer from "./authReducer";
import checkReducer from "./checkReducer";
import breakReducer from "./breakReducer";
import employeeReducer from "./employeeReducer";
import profileReducer from "./profileReducer";
import dayReducer from "./dayReducer";
import leaveReducer from "./leaveReducer";
import birthdayReducer from "./birthDayReducer";
import holidayReducer from "./holidayReducer";
import salaryReducer from "./salaryReducer";
import lastCheckReducer from "./lastCheckReducer";

const rootReducer = combineReducers({
    login:authReducer,
    check:checkReducer,
    break:breakReducer,
    employee:employeeReducer,
    user:profileReducer,
    today:dayReducer,
    leave:leaveReducer,
    birthday:birthdayReducer,
    holiday:holidayReducer,
    salary:salaryReducer,
    lastCheck: lastCheckReducer,
});

export default rootReducer;
