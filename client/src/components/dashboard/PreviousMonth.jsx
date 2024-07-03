import {useDispatch, useSelector} from "react-redux";
import React, {Fragment, useEffect, useState} from "react";
import {getAllPreviousLeave} from "../../redux/actions/leaveActions";
import moment from "moment/moment";
import {useLocation} from "react-router-dom";

const PreviousMonth = ({date}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login.user);
    const leaves = useSelector((state) => state.prleave);
    const loading = useSelector((state) => state.prleave.loading);
    const [highlightedId, setHighlightedId] = useState(null);
    const location = useLocation();
    const notification_id = location.state ? location.state.id : 0 || 0;

    const now = new Date();

    // Get the current date components
    const currentYear = now.getFullYear();
    const currentMonth = String(now.getMonth()).padStart(2, '0');
    const filterDate = `${currentYear}-${currentMonth}-01`;

    useEffect(() => {
        setHighlightedId(notification_id);
        dispatch(getAllPreviousLeave({user, filterDate}));
        // eslint-disable-next-line
    }, [user]);

    return (
        <>
            <div className="card">
                <h5 className="card-header">Previous Month Leaves</h5>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="table-responsive text-nowrap">

                        <table className="table">
                            <thead>
                            <tr>
                                <th>Emp. Name</th>
                                <th>Applied Date</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Leave Type</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            {leaves.prleave.length === 0 ? (
                                <table className="table">
                                    <tbody className="table-border-bottom-0">
                                    <tr>
                                        <td colSpan="7">No Leave Applied</td>
                                    </tr>
                                    </tbody>
                                </table>
                            ) : (
                                <tbody className="table-border-bottom-0">
                                {leaves.prleave.map((item, index) => (
                                    <Fragment key={item.id || index}>
                                        <tr className={highlightedId === item.id ? "highlighted-row" : ""}>
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
                                                <span className="badge bg-label-warning me-1">{item.status}</span>
                                            </td>
                                            <td></td>
                                        </tr>
                                    </Fragment>
                                ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

export default PreviousMonth;