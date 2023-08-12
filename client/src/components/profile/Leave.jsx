import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {getLeaveById, leaveApplied} from "../../redux/actions/leaveActions";
import LeaveForm from "../leave-form";
import {excerpt} from "../../function/excerpt";

const Leave = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login.user);
    const leaves = useSelector((state) => state.leave);
    const loading = useSelector((state) => state.leave.loading);

    useEffect(() => {
        dispatch(getLeaveById({user}));
        // eslint-disable-next-line
    }, [user]);
    console.log(leaves)
    return (
        <>
            <div className=" flex-grow-1 container-p-y">
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
                                        <th>Applied Date</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Leave Type</th>
                                        <th>Leave Reason</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody className="table-border-bottom-0">
                                    {
                                        leaves.leave.map((item, index) => (
                                            <tr key={item.key || index}>
                                                <td>
                                                    {moment(item.app_date).format("DD-MM-YYYY")}
                                                </td>
                                                <td>
                                                <span className="badge bg-label-warning me-1">
                                                    {moment(item.start_date).format("DD-MM-YYYY")}
                                                </span>
                                                </td>
                                                <td>
                                                <span className="badge bg-label-warning me-1">
                                                    {moment(item.end_date).format("DD-MM-YYYY")}
                                                </span>
                                                </td>
                                                <td>
                                                    <span
                                                        className="badge bg-label-warning me-1">{item.leave_type}</span>
                                                </td>
                                                <td><span
                                                    className="badge bg-label-warning me-1">{excerpt(item.reason)}</span>
                                                </td>

                                                <td>
                                                    <span className="badge bg-label-warning me-1">{item.status}</span>
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

            <LeaveForm type={"APPLIED"}/>

        </>
    );
};

export default Leave;
