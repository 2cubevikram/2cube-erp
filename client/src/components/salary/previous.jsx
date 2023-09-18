import moment from "moment";
import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteSalary, getSalaryStatus} from "../../redux/actions/salaryActions";
import {Link} from "react-router-dom";

const Previous = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.user);
    const salaries = useSelector(state => state.salary);
    const loading = useSelector((state) => state.salary.loading);
    const [filterDate, setFilterDate] = useState();

    const lastMonth = moment().subtract(1, 'months').format('YYYY-MM-DD');

    const handleClick = () => {
        dispatch(getSalaryStatus({user, filterDate}));
    };
    const handleChange = (event) => {
        setFilterDate(event.target.value);
    };

    const handleClear = () => {
        setFilterDate('');
        dispatch(getSalaryStatus({user}));
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


    // const lastMonth = moment().format('YYYY-MM-DD');
    // console.log(lastMonth);

    useEffect(() => {
        dispatch(getSalaryStatus({user, filterDate: lastMonth}))
        // eslint-disable-next-line
    }, [user])


    // console.log();

    return (
        <>
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
                                        salaries.salary.map((item, index) => {
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