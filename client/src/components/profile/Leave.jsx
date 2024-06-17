import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {getLeaveById, getYearlyLeaveById} from "../../redux/actions/leaveActions";
import LeaveForm from "../leave-form";
import {excerpt} from "../../function/excerpt";
import {useLocation} from "react-router-dom";

const Leave = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login.user);
    const leaves = useSelector((state) => state.leave);
    const loading = useSelector((state) => state.leave.loading);
    const [highlightedId, setHighlightedId] = useState(null);
    const location = useLocation();
    const notification_id = location.state ? location.state.id : 0 || 0;
    // const [filterDate, setFilterDate] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndtDate] = useState();

    // const currentDate = new Date();
    // const currentYear = currentDate.getFullYear();

    // const startDate = `${currentYear}-04-01`; 
    // const endDate = `${currentYear + 1}-04-01`;
    const current_user_id = user.id;

    const startDateChange = (event) => {
        setStartDate(event.target.value);
    }

    const endDateChange = (event) => {
        setEndtDate(event.target.value);
    }

    // const handleChange = (event) => {
    //     setFilterDate(event.target.value);
    // };

    const handleClick = () => {
        dispatch(getLeaveById({user, startDate, endDate}));
    }

    const handleClear = () => {
        // setFilterDate('');
        dispatch(getLeaveById({user}));
        // eslint-disable-next-line
    }

    useEffect(() => {
        setHighlightedId(notification_id);
        dispatch(getLeaveById({user}));
        // eslint-disable-next-line
    }, [user]);    

    useEffect(() => {
        setHighlightedId(notification_id);
        dispatch(getYearlyLeaveById({user, startDate, endDate, current_user_id}));
        // eslint-disable-next-line
    }, [user]);    

    const calculateLeaveStats = (yearlyleave) => {
        const totalLeave = 10;
        let usedLeave = 0;

        leaves.leave.forEach((leave) => {
            if (leave.leave_type !== 'PL' && leave.leave_type !== 'HPL' && leave.status === 'Approved' ) {
                if (leave.leave_type === 'HCL' || leave.leave_type === 'HSL') {
                    usedLeave += 0.5 * leave.days;
                } else {
                    usedLeave += leave.days;
                }
            }
        });

        const remainingLeave = totalLeave - usedLeave;
        return { totalLeave, usedLeave, remainingLeave };
    };

    return (
        <>
            <LeaveForm type={"APPLIED"}/>

            <div className="flex-grow-1 container-p-y">
                <div className="card">
                    <h5 className="card-header">List Of Leaves</h5>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="table-responsive text-nowrap">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Applied Date</th>
                                    <th>Total Days</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Leave Type</th>
                                    <th>Leave Reason</th>
                                    <th>Status</th>
                                    {/* <input type="date" name="filterDate" value={filterDate} onChange={handleChange}/> */}
                                    <input type="date" name="startDate" value={startDate} onChange={startDateChange}/>
                                    <input type="date" name="endDate" value={endDate} onChange={endDateChange}/>
                                    <button onClick={handleClick}>filter</button>
                                    <button onClick={handleClear}>clear</button>
                                </tr>
                                </thead>
                                {leaves.leave.length === 0 ? (
                                    <tr className="full-width">
                                        <td colSpan="8">
                                            <div className="container-xxl flex-grow-1 container-p-y">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row g-0"><h2 className="m-0 text-center">No Leave Available</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <tbody className="table-border-bottom-0">
                                    {
                                        leaves.leave.map((item, index) => (
                                        // leaves.yearlyleave.map((item, index) => (
                                            <Fragment key={item.key || index}>
                                                <tr className={highlightedId === item.id ? "highlighted-row" : ""}>
                                                    <td>
                                                        {moment(item.app_date).format("DD-MM-YYYY")}
                                                    </td>
                                                    <td>
                                                        {/*<span className="badge bg-label-warning me-1">*/}
                                                        { item.leave_type === 'HPL' || item.leave_type === 'HCL' || item.leave_type === 'HSL' ? '0.5' :  item.days}
                                                        {/*</span>*/}
                                                    </td>
                                                    <td>{moment(item.start_date).format("DD-MM-YYYY")}</td>
                                                    <td>{moment(item.end_date).format("DD-MM-YYYY")}</td>
                                                    <td>{item.leave_type}</td>
                                                    <td>{excerpt(item.reason)}</td>
                                                    <td>
                                                        <span className="badge bg-label-warning me-1">{item.status}</span>
                                                    </td>
                                                </tr>
                                            </Fragment>
                                        ))
                                    }
                                    </tbody>
                                )}
                                <tfoot className="table-border-bottom-0">
                                <tr>
                                    <th>Total Leave: {calculateLeaveStats(leaves.leave).totalLeave}</th>
                                    <th>-</th>
                                    <th>Used Leave: {calculateLeaveStats(leaves.leave).usedLeave}</th>
                                    <th>-</th>
                                    <th>Remaining Leave: {calculateLeaveStats(leaves.leave).remainingLeave}</th>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Leave;
