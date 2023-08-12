import moment from "moment";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSalary} from "../../redux/actions/salaryActions";

const Salary = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.user);
    const salaries = useSelector(state => state.salary);
    const loading = useSelector((state) => state.salary.loading);

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
                                        <th>Join Date</th>
                                        <th>Next inc. date</th>
                                        <th>Net Pay</th>
                                        <th>Credit Date</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody className="table-border-bottom-0">
                                    {
                                        salaries.salary.map((item, index) => (
                                            <tr key={item.id || index}>
                                                <td>{`${item.first_name} ${item.last_name}`}</td>
                                                <td>{moment(item.join_date).format('DD-MM-YYYY')}</td>
                                                <td>{moment(item.join_date).format('DD-MM-YYYY')}</td>
                                                <td>{item.amount}</td>
                                                <td>{moment(item.salary_date).format('DD-MM-YYYY')}</td>
                                                <td>{item.status}</td>
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
                                                                    // onClick={e => LeaveFormOpen(index)}
                                                                    className="dropdown-item"><i
                                                                    className="bx bx-edit-alt me-1"></i>Edit</Link>

                                                                {/*<a className="dropdown-item" href="/"><i*/}
                                                                {/*    className="bx bx-trash me-1"></i> Delete</a>*/}
                                                            </div>
                                                        </div>
                                                    }
                                                </td>
                                            </tr>
                                        ))
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