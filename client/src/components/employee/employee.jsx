import React, {useEffect} from "react";
import {getEmployee} from "../../redux/actions/employeeAction";
import {useDispatch, useSelector} from "react-redux";
import {EmployeeList} from "../ul-component";


const Employee = () => {
    const dispatch = useDispatch();
    let user = useSelector(state => state.login.user);
    let employee = useSelector(state => state.employee);

    useEffect(() => {
        dispatch(getEmployee({user}));
        // eslint-disable-next-line
    }, [getEmployee, user]);

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <h5 className="card-header">Employee List</h5>
                    <div className="table-responsive text-nowrap">
                        <EmployeeList active_tab={1} employees={employee}/>
                    </div>
                </div>
            </div>
        </>
    )
}

// export default Employee
export default Employee;