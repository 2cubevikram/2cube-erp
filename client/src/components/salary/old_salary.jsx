import moment from "moment";
import {Link} from "react-router-dom";
import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSalary} from "../../redux/actions/salaryActions";
import AddSalaryForm from "../salary-add-form";
import {type} from "@testing-library/user-event/dist/type";
import {getAttendance} from "../../redux/actions/profileAction";

const Salary = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.user);
    const salaries = useSelector(state => state.salary);
    const loading = useSelector((state) => state.salary.loading);
    const [filterDate, setFilterDate] = useState();
    const [addSalaryForm, setAddSalaryForm] = useState({
        id: null,
        state: false
    })

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    function AddFormOpen(id, type) {
        setAddSalaryForm({
            id: id,
            type: type,
            state: !addSalaryForm.state
        })
    }

    const handleFormClose = () => {
        setAddSalaryForm({
            id: null,
            state: false
        })
    }

    const handleClick = () => {
        dispatch(getSalary({user, filterDate}));
    };
    const handleChange = (event) => {
        setFilterDate(event.target.value);
    };

    const handleClear = () => {
        setFilterDate('');
        dispatch(getSalary({user}));
    }

    useEffect(() => {
        dispatch(getSalary({user}))
    }, [user])


    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card text-center">
                    <h5 className="card-header">Status of Employee Salary</h5>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="table-responsive text-nowrap">
                            {salaries.salary.length === 0 ? (
                                <table className="table">
                                    <tbody className="table-border-bottom-0">
                                    <tr>
                                        <td colSpan="7">Data Not Found</td>
                                    </tr>
                                    </tbody>
                                </table>
                            ) : (
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Emp. Name</th>
                                        <th>Leave</th>
                                        <th>Present Days</th>
                                        <th>Salary</th>
                                        <th>Extra Allowance</th>
                                        <th>Join Date</th>
                                        <th>Next Increment</th>
                                        <th>Credit Date</th>
                                        <th>Status</th>
                                        <input
                                            type="date"
                                            name="filterDate"
                                            value={filterDate}
                                            onChange={handleChange}
                                        />
                                        <button onClick={handleClick}>filter</button>
                                        <button onClick={handleClear}>clear</button>
                                    </tr>
                                    </thead>
                                    <tbody className="table-border-bottom-0">
                                    {
                                        salaries.salary.map((item, index) => {
                                            const leaveAndDays = item.leave_type.map((type, index) => `${item.days[index]}/${type}`).join(', ');
                                            const totalDays = item.days.reduce((sum, days) => sum + days, 0);
                                            const increment = moment(item.join_date).add(1, 'years').format('DD');
                                            const incrementDate = increment > 15 ? 1 : 0;
                                            const incrementMonth = item.increment;
                                            const salary = ((item.basic_salary / lastDayOfMonth) * (lastDayOfMonth - totalDays)) + item.extra_allowance;

                                            return (
                                                <Fragment key={item.id || index}>
                                                    <tr key={item.id || index}>
                                                        <td>{`${item.first_name} ${item.last_name}`}</td>
                                                        <td>{leaveAndDays}</td>
                                                        <td>{lastDayOfMonth - totalDays}</td>
                                                        <td>{parseFloat(salary).toFixed(2)}</td>
                                                        <td>{item.extra_allowance}</td>
                                                        <td>{moment(item.join_date).format('DD-MM-YYYY')}</td>
                                                        <td>{incrementMonth}</td>
                                                        <td>{item.salary_date !== '' ? moment(item.salary_date).format('DD-MM-YYYY') : "Pending"}</td>
                                                        <td>{item.status !== '' ? item.status : "Pending"}</td>
                                                        <td></td>
                                                        <td></td>
                                                        <td>
                                                            <div className="dropdown">
                                                                <button
                                                                    type="button"
                                                                    className="btn p-0 dropdown-toggle hide-arrow"
                                                                    data-bs-toggle="dropdown">
                                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                                </button>
                                                                <div className="dropdown-menu">
                                                                    <Link
                                                                        // onClick={e => AddFormOpen(item.id) }
                                                                        onClick={e => AddFormOpen(item.id, "ADD")}
                                                                        type={"ADD"}
                                                                        className="dropdown-item"
                                                                    ><i className="bx bx-pencil me-1"></i>Add</Link>
                                                                    <Link
                                                                        onClick={e => AddFormOpen(item.id, "UPDATE")}
                                                                        className="dropdown-item"
                                                                    >
                                                                        <i className="bx bx-edit-alt me-1"></i>Edit
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    {
                                                        addSalaryForm.state && addSalaryForm.id === item.id ? (
                                                            <tr className={"full-width"}>
                                                                <td colSpan="8">
                                                                    <AddSalaryForm data={item} type={addSalaryForm.type} date={filterDate} formClose={handleFormClose}/>
                                                                </td>
                                                            </tr>
                                                        ) : ""
                                                    }
                                                </Fragment>
                                            );
                                        })
                                    }
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Salary;