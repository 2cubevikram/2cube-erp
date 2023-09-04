import moment from "moment";
import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSalaryStatus} from "../../redux/actions/salaryActions";

const Previous = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.user);
    const salaries = useSelector(state => state.salary);
    const loading = useSelector((state) => state.salary.loading);
    const [filterDate, setFilterDate] = useState();

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

    const lastMonth = moment().subtract(1, 'months').format('YYYY-MM-DD');
    // const lastMonth = moment().format('YYYY-MM-DD');
    // console.log(lastMonth);

    useEffect(() => {
        dispatch(getSalaryStatus({user, filterDate: lastMonth}))
        // eslint-disable-next-line
    }, [user])


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
                                    <th>Emp. Name</th>
                                    <th>Leave</th>
                                    <th>Present Days</th>
                                    <th>Salary</th>
                                    <th>Extra Allowance</th>
                                    {/*<th>Join Date</th>*/}
                                    {/*<th>Next Increment</th>*/}
                                    <th>Credit Date</th>
                                    <th>Status</th>
                                    <input type="date" name="filterDate" value={filterDate} onChange={handleChange} />
                                    <button onClick={handleClick}>filter</button>
                                    <button onClick={handleClear}>clear</button>
                                </tr>
                                </thead>
                                {salaries.salary.length === 0 ? (
                                    <table className="table">
                                        <tbody className="table-border-bottom-0">
                                        <tr>
                                            <td colSpan="7">Data Not Found</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                ) : (
                                    <tbody className="table-border-bottom-0">
                                    {
                                        salaries.salary.map((item, index) => {
                                            return (
                                                <Fragment key={item.id || index}>
                                                    <tr key={item.id || index}>
                                                        <td>{item.employee_name}</td>
                                                        <td>{item.total_leave}</td>
                                                        <td>{item.present_day}</td>
                                                        <td>{parseFloat(item.amount).toFixed(2)}</td>
                                                        <td>{item.extra_allowance}</td>
                                                        <td>{item.salary_date !== null ? moment(item.salary_date).format('DD-MM-YYYY') : "Pending"}</td>
                                                        <td>{item.status !== null ? item.status : "Pending"}</td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </Fragment>
                                            );
                                        })
                                    }
                                    </tbody>
                                )}
                            </table>

                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Previous;