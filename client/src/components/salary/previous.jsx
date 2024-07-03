import moment from "moment";
import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteSalary, generateSalary, generateSalaryData, getSalaryStatus, ReGenerateSalary} from "../../redux/actions/salaryActions";
import {Link} from "react-router-dom";

const Previous = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.user);
    const salaries = useSelector(state => state.salary);
    const dataGenerate = useSelector(state => state.salary.dataGenerate);
    const loading = useSelector((state) => state.salary.loading);
    const [filterDate, setFilterDate] = useState();
    const [calculatedData, setCalculatedData] = useState([]);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();
    const lastMonth = moment().subtract(1, 'months').format('YYYY-MM-DD');

    const preMonth = String(new Date().getMonth()).padStart(2, '0');
    const prevMonthSalary = `${currentYear}-${preMonth}-${lastDayOfMonth}`;

    // console.log(prevMonthSalary)

    const handleAddSalary = async (calculatedData) => {
        await dispatch(generateSalary({user, obj: calculatedData}));
    }

    const handleReGenerateSalary = async (calculatedData) => {
        await dispatch(ReGenerateSalary({user, obj: calculatedData}));
    }

    const handleClick = () => {
        dispatch(getSalaryStatus({user, filterDate}));
    };
    const handleChange = (event) => {
        setFilterDate(event.target.value);
    };

    const handleClear = () => {
        setFilterDate('');
        dispatch(getSalaryStatus({user, filterDate: lastMonth}));
        // eslint-disable-next-line
    }

    const footer_data = {
        total_salary: 0,
        total_allowance: 0,
    }

    // count total salary and allowance
    salaries.salary.forEach((item) => {
        footer_data.count = salaries.salary.length;
        footer_data.total_salary += parseFloat(item.amount);
        footer_data.total_allowance += parseFloat(item.extra_allowance);
    });

    const deleteSalaryById = async (id) => {
        try {
            await dispatch(deleteSalary({user,id, date:filterDate}))
            alert('Data Delete Successfully!')
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        console.log('this is test')
        dispatch(generateSalaryData({user, filterDate: lastMonth}))
        dispatch(getSalaryStatus({user, filterDate: lastMonth }))
        // eslint-disable-next-line
    }, [user]);

    useEffect(() => {
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
            const presentDays = lastDayOfMonth - totalDays + (parseFloat(item.halfDayCount) + parseFloat(item.halfDay) + parseFloat(item.halfDayCl));
            const paidDays = lastDayOfMonth - item.plDays - parseFloat(item.halfDayCount);
            item.finalSalary = ((item.basic_salary + item.increment) / lastDayOfMonth) * paidDays;
            item.presentDays = presentDays;
            item.leaveAndDays = leaveAndDays;
            item.createDate = prevMonthSalary;

            return item;
        });
        setCalculatedData(calculatedSalaries);
        // eslint-disable-next-line
    }, [salaries, lastDayOfMonth]);


    const serverDate = salaries.salary.length > 0 ? moment(salaries.salary[0].salary_date).format('YYYY-MM') : null;
    const currentDate1 = moment().subtract(1, 'months').format('YYYY-MM');

    // console.log({serverDate, currentDate1})

    return (
        <>
            {
                serverDate == null || (serverDate !== currentDate1 && serverDate < currentDate1) ?
                <div className="salary_btn_cover">
                    <button type="button" className="btn btn-primary me-2 salary-btn" onClick={() => handleAddSalary(calculatedData)}> Generate Salary</button>
                </div> : ""
            }

            {
                serverDate === currentDate1 ?
                <div className="salary_btn_cover">
                    <button type="button" className="btn btn-primary me-2 salary-btn" onClick={() => handleReGenerateSalary(calculatedData)}> Re-Generate Salary</button>
                </div> : ""
            }

            <div className="flex-grow-1 container-p-y">
                <div className="card text-center">
                    <h5 className="card-header">Status of Employee Salary</h5>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="table-responsive text-nowrap">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th className={`left-align`}>Emp. Name</th>
                                    <th>Leave</th>
                                    <th>Present Days</th>
                                    <th>Salary</th>
                                    <th>Extra Allowance</th>
                                    {/*<th>Join Date</th>*/}
                                    {/*<th>Next Increment</th>*/}
                                    <th>Credit Date</th>
                                    <th>Status</th>
                                    <input type="date" name="filterDate" value={filterDate} onChange={handleChange}/>
                                    <button onClick={handleClick}>filter</button>
                                    <button onClick={handleClear}>clear</button>
                                </tr>
                                </thead>
                                {salaries.salary.length === 0 ? (
                                    <tr className="full-width">
                                        <td colSpan="8">
                                            <div className="container-xxl flex-grow-1 container-p-y">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row g-0"><h2 className="m-0 text-center">No Data
                                                            Available</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <tbody className="table-border-bottom-0">
                                    {
                                        salaries.salary
                                            .slice()
                                            .sort((a, b) => a.employee_name.localeCompare(b.employee_name))
                                            .map((item, index) => {
                                            return (
                                                <Fragment key={item.id || index}>
                                                    <tr key={item.id || index}>
                                                        <td className={`left-align`}>{item.employee_name}</td>
                                                        <td>{item.total_leave}</td>
                                                        <td>{item.present_day}</td>
                                                        <td>{parseFloat(item.amount).toFixed(2)}</td>
                                                        <td>{item.extra_allowance}</td>
                                                        <td>{item.salary_date !== null ? moment(item.salary_date).format('DD-MM-YYYY') : "Pending"}</td>
                                                        <td>{item.status !== null ? item.status : "Pending"}</td>
                                                        <td></td>
                                                        <td>
                                                            {

                                                                <div className="dropdown">
                                                                    <button type="button"
                                                                            className="btn p-0 dropdown-toggle hide-arrow"
                                                                            data-bs-toggle="dropdown">
                                                                        <i className="bx bx-dots-vertical-rounded"></i>
                                                                    </button>
                                                                    <div className="dropdown-menu">
                                                                        <Link
                                                                            onClick={e => deleteSalaryById(item.id)}
                                                                            className="dropdown-item"><i
                                                                            className="bx bx-trash"></i></Link>

                                                                        {/*<a className="dropdown-item" href="/"><i*/}
                                                                        {/*    className="bx bx-trash me-1"></i> Delete</a>*/}
                                                                    </div>
                                                                </div>
                                                            }
                                                        </td>

                                                    </tr>
                                                </Fragment>
                                            );
                                        })
                                    }
                                    </tbody>
                                )}
                                {
                                    footer_data.count > 0 ? (
                                        <tfoot className={`bg-label-dark`}>
                                            <tr className="text-nowrap">
                                                <th className="left-align"> Total: {footer_data.count}</th>
                                                <th></th>
                                                <th></th>
                                                <th>{parseFloat(footer_data.total_salary).toFixed(2)}</th>
                                                <th>{footer_data.total_allowance} </th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </tfoot>
                                    ):""
                                }
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Previous;