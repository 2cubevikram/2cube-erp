import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import authReducer from "./authReducer";
import checkReducer from "./checkReducer";
import breakReducer from "./breakReducer";
import employeeReducer from "./employeeReducer";
import profileReducer from "./profileReducer";
import dayReducer from "./dayReducer";
import leaveReducer from "./leaveReducer";
import birthdayReducer from "./birthDayReducer";

const rootReducer = combineReducers({
    counter: counterReducer,
    login:authReducer,
    check:checkReducer,
    break:breakReducer,
    employee:employeeReducer,
    user:profileReducer,
    today:dayReducer,
    leave:leaveReducer,
    birthday:birthdayReducer,
});

export default rootReducer;
