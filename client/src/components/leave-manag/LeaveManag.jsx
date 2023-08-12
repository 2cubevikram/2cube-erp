import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getAllLeave} from "../../redux/actions/leaveActions";
import moment from "moment/moment";
import {excerpt} from "../../function/excerpt";
import LeaveForm from "../leave-form";
import {Link, useLocation} from "react-router-dom";


const LeaveManag = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login.user);
    const leaves = useSelector((state) => state.leave);
    const loading = useSelector((state) => state.leave.loading);
    const [highlightedId, setHighlightedId] = useState(null);
    const location = useLocation();
    const notification_id = location.state ? location.state.id : 0 || 0;
    console.log(notification_id)
    const [leaveForm, setLeaveForm] = useState({
        id: null,
        state: false
    })

    useEffect(() => {
        setHighlightedId(notification_id);
        dispatch(getAllLeave({user}));
        // eslint-disable-next-line
    }, [user]);

    function LeaveFormOpen(index) {
        setLeaveForm({
            id: index,
            state: !leaveForm.state
        })
    }

    const handleFormClose = () => {
        setLeaveForm({
            id: null,
            state: false
        })
    }


    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <h5 className="card-header">List Of Leaves</h5>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="table-responsive text-nowrap">
                            {leaves.leave.length === 0 ? (
                                <table className="table">
                                    <tbody className="table-border-bottom-0">
                                    <tr>
                                        <td colSpan="7">No Leave Applied</td>
                                    </tr>
                                    </tbody>
                                </table>
                            ) : (
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Emp. Name</th>
                                        <th>Applied Date</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Leave Type</th>
                                        <th>Leave Reason</th>
                                        <th>Status</th>
                                        <th className={`text-center`}>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="table-border-bottom-0">
                                    {leaves.leave.map((item, index) => (
                                        <>
                                            <tr
                                                key={item.id || index}
                                                className={highlightedId === item.id ? "highlighted-row" : ""}>
                                                <td>
                                                    {item.first_name} {item.last_name}
                                                </td>
                                                <td>
                                                    {moment(item.app_date).format("DD-MM-YYYY")}
                                                </td>
                                                <td>
                                                    {/*<span className="badge bg-label-warning me-1">*/}
                                                    {moment(item.start_date).format("DD-MM-YYYY")}
                                                    {/*</span>*/}
                                                </td>
                                                <td>
                                                    {/*<span className="badge bg-label-warning me-1">*/}
                                                    {moment(item.end_date).format("DD-MM-YYYY")}
                                                    {/*</span>*/}
                                                </td>
                                                <td>
                                                    {/*<span className="badge bg-label-warning me-1">*/}
                                                        {item.leave_type}
                                                    {/*</span>*/}
                                                </td>
                                                <td>
                                                    {/*<span className="badge bg-label-warning me-1">*/}
                                                        {excerpt(item.reason)}
                                                    {/*</span>*/}
                                                </td>

                                                <td>
                                                    <span className="badge bg-label-warning me-1">{item.status}</span>
                                                </td>
                                                <td>
                                                    {
                                                        !leaveForm.state ? (
                                                            <div className="dropdown">
                                                                <button type="button"
                                                                        className="btn p-0 dropdown-toggle hide-arrow"
                                                                        data-bs-toggle="dropdown">
                                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                                </button>
                                                                <div className="dropdown-menu">
                                                                    <Link
                                                                        onClick={e => LeaveFormOpen(index)}
                                                                        className="dropdown-item"><i
                                                                        className="bx bx-edit-alt me-1"></i>Edit</Link>

                                                                    {/*<a className="dropdown-item" href="/"><i*/}
                                                                    {/*    className="bx bx-trash me-1"></i> Delete</a>*/}
                                                                </div>
                                                            </div>
                                                        ) : ""
                                                    }
                                                </td>
                                            </tr>
                                            {
                                                leaveForm.state && leaveForm.id === index ? (
                                                    <tr className={"full-width"}>
                                                        <td colSpan="8">
                                                            <LeaveForm data={item} type={"UPDATE"}
                                                                       formClose={handleFormClose}/>
                                                        </td>
                                                    </tr>
                                                ) : ""
                                            }
                                        </>
                                    ))}
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

export default LeaveManag;