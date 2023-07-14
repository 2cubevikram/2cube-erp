import React, {useContext, useEffect, useState, Fragment} from "react";
import {Link} from 'react-router-dom';
import {getEmployee} from "../../redux/actions/employeeAction";
import {connect, useSelector} from "react-redux";
import {EmployeeList} from "../ul-component";


const Employee = ({getEmployee}) => {
    let user = useSelector(state => state.login.user);
    let employee = useSelector(state => state.employee);

    useEffect(() => {
        getEmployee({user});
    }, [getEmployee]);

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <h5 className="card-header">Employee List</h5>
                    <div className="table-responsive text-nowrap">
                        <EmployeeList employees={employee}/>
                    </div>
                </div>
            </div>
        </>
    )
}

// export default Employee
export default connect(null, {getEmployee})(Employee);