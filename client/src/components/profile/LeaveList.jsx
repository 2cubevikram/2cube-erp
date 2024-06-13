import {useDispatch, useSelector} from "react-redux";
import React, {Fragment, useEffect, useState} from "react";
import {getYearlyLeaveById} from "../../redux/actions/leaveActions";
import moment from "moment/moment";
import {excerpt} from "../../function/excerpt";
// import LeaveForm from "../leave-form";
import {useLocation} from "react-router-dom";

const LeaveList = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login.user);
    const leaves = useSelector((state) => state.leave);
    const loading = useSelector((state) => state.leave.loading);
    const [highlightedId, setHighlightedId] = useState(null);
    const location = useLocation();
    const current_user_id = location.state.id;
    const notification_id = location.state ? location.state.id : 0 || 0;
    const [startDate, setStartDate] = useState();
    const [endDate, setEndtDate] = useState();
    // const [leaveForm, setLeaveForm] = useState({
    //     id: null,
    //     state: false
    // })
    const startDateChange = (event) => {
        setStartDate(event.target.value);
    }

    const endDateChange = (event) => {
        setEndtDate(event.target.value);
    }

    const handleClick = () => {
        dispatch(getYearlyLeaveById({user, startDate, endDate, current_user_id}));
    }

    const handleClear = () => {
        setStartDate('');
        setEndtDate('');
        dispatch(getYearlyLeaveById({user, current_user_id}));
        // eslint-disable-next-line
    }

    useEffect(() => {
        setHighlightedId(notification_id);
        dispatch(getYearlyLeaveById({user, startDate, endDate, current_user_id}));
        // eslint-disable-next-line
    }, [user]);

    // function LeaveFormOpen(index) {
    //     setLeaveForm({
    //         id: index,
    //         state: !leaveForm.state
    //     })
    // }

    // const handleFormClose = () => {
    //     setLeaveForm({
    //         id: null,
    //         state: false
    //     })
    // }

    // const handleLeaveDelete = async (id) => {
    //     await dispatch(deleteLeave({id, user, date:startDate}));
    // }

    const calculateLeaveStats = (yearlyleave) => {
        const totalLeave = 10;
        let usedLeave = 0;

        // yearlyleave.forEach((leave) => {
        //     if (leave.leave_type !== 'SL') {
        //         if (leave.leave_type === 'HL' || leave.leave_type === 'HPL') {
        //             usedLeave += 0.5 * leave.days;
        //         } else {
        //             usedLeave += leave.days;
        //         }
        //     }
        // });

        yearlyleave.forEach((leave) => {
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
            <div className="container-xxl flex-grow-1 container-p-y">
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
                                    <th>total days</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Leave Type</th>
                                    <th>Leave Reason</th>
                                    <input type="date" name="startDate" value={startDate} onChange={startDateChange}/>
                                    <input type="date" name="endDate" value={endDate} onChange={endDateChange}/>
                                    <button onClick={handleClick}>filter</button>
                                    <button onClick={handleClear}>clear</button>
                                </tr>
                                </thead>
                                {leaves.yearlyleave.length === 0 ? (
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
                                    {leaves.yearlyleave.map((item, index) => (
                                        <Fragment key={item.id || index}>
                                            <tr className={highlightedId === item.id ? "highlighted-row" : ""}>
                                                <td>
                                                    {moment(item.app_date).format("DD-MM-YYYY")}
                                                </td>
                                                <td>
                                                    {/*<span className="badge bg-label-warning me-1">*/}
                                                    {item.days}
                                                    {/*</span>*/}
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

                                                {/*<td>*/}
                                                {/*    {*/}
                                                {/*        !leaveForm.state ? (*/}
                                                {/*            <div className="dropdown">*/}
                                                {/*                <button type="button"*/}
                                                {/*                        className="btn p-0 dropdown-toggle hide-arrow table-btn-right"*/}
                                                {/*                        data-bs-toggle="dropdown">*/}
                                                {/*                    <i className="bx bx-dots-vertical-rounded"></i>*/}
                                                {/*                </button>*/}
                                                {/*                <div className="dropdown-menu">*/}
                                                {/*                    <Link*/}
                                                {/*                        onClick={e => LeaveFormOpen(index)}*/}
                                                {/*                        className="dropdown-item"><i*/}
                                                {/*                        className="bx bx-edit-alt me-1"></i>Edit</Link>*/}

                                                {/*                    <Link*/}
                                                {/*                        onClick={e => handleLeaveDelete(item.id)}*/}
                                                {/*                        className="dropdown-item"><i*/}
                                                {/*                        className="bx bx-trash me-1"></i> Delete</Link>*/}
                                                {/*                </div>*/}
                                                {/*            </div>*/}
                                                {/*        ) : ""*/}
                                                {/*    }*/}
                                                {/*</td>*/}
                                            </tr>
                                            {/*{*/}
                                            {/*    leaveForm.state && leaveForm.id === index ? (*/}
                                            {/*        <tr className={"full-width"}>*/}
                                            {/*            <td colSpan="10">*/}
                                            {/*                <LeaveForm data={item} type={"UPDATE"}*/}
                                            {/*                           formClose={handleFormClose}/>*/}
                                            {/*            </td>*/}
                                            {/*        </tr>*/}
                                            {/*    ) : ""*/}
                                            {/*}*/}
                                        </Fragment>
                                    ))}
                                    </tbody>

                                )}
                                <tfoot className="table-border-bottom-0">
                                <tr>
                                    <th>Total Leave: {calculateLeaveStats(leaves.yearlyleave).totalLeave}</th>
                                    <th>-</th>
                                    <th>Used Leave: {calculateLeaveStats(leaves.yearlyleave).usedLeave}</th>
                                    <th>-</th>
                                    <th>Remaining Leave: {calculateLeaveStats(leaves.yearlyleave).remainingLeave}</th>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default LeaveList;