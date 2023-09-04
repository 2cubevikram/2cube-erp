import moment from "moment";
import {Link} from "react-router-dom";
import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {generateSalary, generateSalaryData, getSalaryStatus, ReGenerateSalary} from "../../redux/actions/salaryActions";
import AddSalaryForm from "../salary-add-form";

const Current = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.user);
    const salaries = useSelector(state => state.salary);
    const dataGenerate = useSelector(state => state.salary.dataGenerate);
    const loading = useSelector((state) => state.salary.loading);
    const [calculatedData, setCalculatedData] = useState([]);
    const [addSalaryForm, setAddSalaryForm] = useState({
        id: null,
        state: false
    })

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    // const lastMonth = moment().subtract(1).format('YYYY-MM-DD');
    const lastMonth = moment().subtract(1, 'months').format('YYYY-MM-DD');

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

    const handleAddSalary = async (calculatedData) => {
        await dispatch(generateSalary({user, obj: calculatedData}));
    }

    const handleReGenerateSalary = async (calculatedData) => {
        await dispatch(ReGenerateSalary({user, obj: calculatedData}));
    }

    useEffect(() => {
        dispatch(generateSalaryData({user, filterDate: lastMonth}))
        dispatch(getSalaryStatus({user, filterDate: moment().format('YYYY-MM-DD')}))
        // eslint-disable-next-line
    }, [user]);

    useEffect(() => {

        // const calculatedSalaries = dataGenerate.map((item, index) => {
        //     const salaryIds = salaries.salary.map((item) => item.id);
        //     const leaveAndDays = item.leave_type.map((type, index) => `${item.days[index]}/${type}`).join(', ');
        //     const totalDays = item.days.reduce((sum, days) => sum + days, 0);
        //     const presentDays = lastDayOfMonth - totalDays;
        //     const salary = (item.basic_salary / lastDayOfMonth) * presentDays;
        //     item.finalSalary = salary;
        //     item.presentDays = presentDays;
        //     item.leaveAndDays = leaveAndDays;
        //
        //     return item;
        // });

        const calculatedSalaries = dataGenerate.map((item, index) => {
            const employeeId = item.id;
            const matchingSalary = salaries.salary.find(salaryItem => salaryItem.employee_id === employeeId);
            if (matchingSalary) {
                item.salaryIds = matchingSalary.id;
            } else {
                item.salaryIds = null;
            }
            const leaveAndDays = item.leave_type.map((type, index) => `${item.days[index]}/${type}`).join(', ');
            const totalDays = item.days.reduce((sum, days) => sum + days, 0);
            const presentDays = lastDayOfMonth - totalDays;
            const salary = (item.basic_salary / lastDayOfMonth) * presentDays;
            item.finalSalary = salary;
            item.presentDays = presentDays;
            item.leaveAndDays = leaveAndDays;

            return item;
        });
        setCalculatedData(calculatedSalaries);
        // eslint-disable-next-line
    }, [salaries, lastDayOfMonth]);

    const serverDate = salaries.salary.length > 0 ? moment(salaries.salary[0].salary_date).format('YYYY-MM-DD') : null;
    const currentDate1 = moment().format('YYYY-MM-DD');

    return (
        <>
            {
                serverDate !== currentDate1 ?
                    <button type="button" className="btn btn-primary me-2 salary-btn"
                            onClick={() => handleAddSalary(calculatedData)}
                    > Generate Salary</button> : ""
            }

            {
                serverDate === currentDate1 ?
                    <button type="button" className="btn btn-primary me-2 salary-btn"
                            onClick={() => handleReGenerateSalary(calculatedData)}
                    > Re-Generate Salary</button> : ""
            }


            <div className="flex-grow-1 container-p-y">
                <div className="card text-center">
                    <h5 className="card-header">Current Salary Status</h5>
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
                                        <th>Allowance</th>
                                        <th>Pay</th>
                                        <th>Credit Date</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody className="table-border-bottom-0">
                                    {
                                        salaries.salary.map((item, index) => {
                                            const finalSalary = (parseFloat(item.amount) + item.extra_allowance).toFixed(2)
                                            const extraAllowance = item.extra_allowance && item.extra_allowance !== null ? item.extra_allowance : '00';

                                            return (
                                                <Fragment key={item.id || index}>
                                                    <tr key={item.id || index}>
                                                        <td>{item.employee_name}</td>
                                                        <td>{item.total_leave}</td>
                                                        <td>{item.present_day}</td>
                                                        <td>{parseFloat(item.amount).toFixed(2)}</td>
                                                        <td>{extraAllowance}</td>
                                                        <td>{finalSalary}</td>
                                                        <td>{item.salary_date !== null ? moment(item.salary_date).format('DD-MM-YYYY') : "Pending"}</td>
                                                        <td>{item.status !== null ? item.status : "Pending"}</td>
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
                                                                    <AddSalaryForm data={item} type={addSalaryForm.type}
                                                                                   formClose={handleFormClose}/>
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

export default Current;