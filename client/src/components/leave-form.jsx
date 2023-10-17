import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {leaveApplied, updateLeave} from "../redux/actions/leaveActions";
import moment from "moment";
// import io from "socket.io-client";


// Type --> APPLIED,UPDATE

const LeaveForm = ({data = null, type = "APPLIED", formClose = null}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login.user);

    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [leave_type, setLeaveType] = useState("");
    const [reason, setReason] = useState("");
    const [status, setStatus] = useState("");
    const submitHandler = async (e) => {
        e.preventDefault();

        if (type === "APPLIED") {
            const obj = {
                start_date: start_date,
                end_date: end_date,
                leave_type: leave_type,
                reason: reason
            }
            await dispatch(leaveApplied({user, obj}))
            setStartDate("");
            setEndDate("");
            setLeaveType("");
            setReason("");
        } else if (type === "UPDATE") {
            const obj = {
                id: data.id,
                employee_id: data.employee_id,
                start_date: start_date,
                end_date: end_date,
                leave_type: leave_type,
                reason: reason,
                status: status
            }
            try {
                await dispatch(updateLeave({user, obj}))
                formClose({id: null, state: false})
            } catch (error) {
                console.log(error)
                alert(error);
                // navigate('/to-day');
            }

        }

    };

    const handleFormClose = (event) => {
        formClose({id: null, state: false})
    };

    useEffect(() => {
        if (data) {
            setStartDate(moment(data.start_date).format("YYYY-MM-DD"));
            setEndDate(moment(data.end_date).format("YYYY-MM-DD"));
            setLeaveType(data.leave_type);
            setReason(data.reason);
            setStatus(data.status)
        }
    }, [data])


    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="card">
                {
                    type === "APPLIED" ? (
                        <>
                            <h5 className="card-header">Leave Application</h5>
                            <hr className="my-0"/>
                        </>
                    ) : ""
                }

                <div className="card-body">
                    <form id="formAccountSettings" onSubmit={submitHandler}>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label htmlFor="firstName" className="form-label">
                                    Start Date
                                </label>
                                <input
                                    className="form-control"
                                    type="date"
                                    id="start_date"
                                    name="StartDate"
                                    value={start_date}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="lastName" className="form-label">
                                    End Date
                                </label>
                                <input
                                    className="form-control"
                                    type="date"
                                    id="end_date"
                                    name="EndDate"
                                    value={end_date}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="leaveType" className="form-label">
                                    Leave Type
                                </label>
                                <select className="form-select placement-dropdown" id="selectPlacement"
                                        value={leave_type}
                                        onChange={(e) => setLeaveType(e.target.value)}
                                        required
                                >
                                    <option value="" disabled>Select Type</option>
                                    <option value="CL">Casual Leave</option>
                                    <option value="PL">Paid Leave</option>
                                    <option value="SL">Sick Leave</option>
                                    <option value="HL">Half-Day</option>
                                    <option value="HPL">Half-Day PL</option>
                                </select>
                            </div>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="organization" className="form-label">
                                    Reason Of leave
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="leave_reason"
                                    name="leaveReason"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    required
                                />
                            </div>
                            {
                                (user.role === "Admin" || user.role === "HR") && type !== "APPLIED" ? (
                                    <div className="mb-3 col-md-12">
                                        <label htmlFor="leaveType" className="form-label">Status</label>
                                        <select className="form-select placement-dropdown" id="selectPlacement"
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}>
                                            <option value="" disabled>Select Type</option>
                                            <option value="In Review">In Review</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Denied">Denied</option>
                                            <option value="Approved for Less Days">Approved for Less Days</option>
                                        </select>
                                    </div>
                                ) : ""
                            }
                        </div>
                        <div className="mt-2">
                            <button type="submit" className="btn btn-primary me-2">Submit</button>
                            {
                                formClose ? (
                                    <button
                                        type="reset"
                                        className="btn btn-outline-secondary"
                                        onClick={handleFormClose}>Cancel</button>
                                ) : ""
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LeaveForm;