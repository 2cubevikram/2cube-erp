import React, {useEffect, useState} from "react";
import {getEmployee} from "../../redux/actions/employeeAction";
import {useDispatch, useSelector} from "react-redux";

const Report = () => {
    const dispatch = useDispatch();
    let user = useSelector(state => state.login.user);
    let employee = useSelector(state => state.employee);
    const [employeeId, SetEmployeeId] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        dispatch(getEmployee({user}));
        // eslint-disable-next-line
    }, [getEmployee, user]);

    const handleEmployeeSelection = (employeeId) => {
        // Do something with the selected employee ID
        console.log("Selected employee ID:", employeeId);
        // You can set it to component state or dispatch an action
    };

    const handleClick = () => {
        // // Perform action with selectedEmployeeId, fromDate, and endDate
        console.log("Selected Employee ID:", employeeId);
        console.log("From Date:", fromDate);
        console.log("End Date:", endDate);
    };
    

    return(
        <>
            <div class="content-wrapper">
                <div class="container-xxl flex-grow-1 container-p-y">
                    <div class="card" id="dropdown-variation-demo">
                        <h5 class="card-header">Dropdown Variations</h5>
                        <hr class="m-0" />
                        <div class="card-body">
                            <div class="row gy-3">
                                <div class="col-xl-12">
                                    <div class="demo-inline-spacing">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Select Employee
                                            </button>
                                            {Array.isArray(employee) && (
                                                <ul className="dropdown-menu">
                                                    {employee.map(employee => (
                                                        <li key={employee.id}><a className="dropdown-item" href="javascript:void(0);" onClick={() => handleEmployeeSelection(employee.id)}>{employee.first_name} {employee.last_name}</a></li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                        <div class="btn-group">
                                            From : <input type="date" name="fromDate" className="btn btn-primary dropdown-toggle" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                                        </div>
                                        <div class="btn-group">
                                            End :<input type="date" name="endDate" className="btn btn-primary dropdown-toggle" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                        </div>
                                        <div class="btn-group">
                                            <button type="submit" className="btn btn-primary" onClick={handleClick}>Click</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Report;