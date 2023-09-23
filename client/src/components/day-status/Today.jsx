import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getToDayStatus} from "../../redux/actions/dayActions";
import {Link} from "react-router-dom";
import {getAttendance} from "../../redux/actions/profileAction";
import {formatDateTime} from "../../function/time";
import {TimeBadge, UserProfile} from "../general-component";
import {formatText} from "../../function/format-text";
import {getLastStatus} from "../../function/check-status";

const Today = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.user);
    const toDayStatus = useSelector(state => state.today)
    const loading = useSelector((state) => state.today.loading);
    const attendance = useSelector((state) => state.user.attendance);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [openList, setOpenList] = useState({
        open: false,
        index: null
    });

    const openListHandler = (index) => {
        const id = index;
        dispatch(getAttendance({user, id}));
        if (openList.index === index) {
            // If the index is the same as the previous one, toggle the open state.
            setOpenList({
                index: index,
                open: !openList.open,
            });
        } else {
            // If the index is different, always open.
            setOpenList({
                index: index,
                open: true,
            });
        }
    }

    useEffect(() => {
        dispatch(getToDayStatus({user}));
        // eslint-disable-next-line
    }, [user]);

    let inTime;
    let outTime;
    let attendanceStatus;
    if (attendance.check !== null) {
        inTime = formatDateTime.getTime(attendance.check._in);
        outTime = attendance.check._out ? formatDateTime.getTime(attendance.check._out) : 'Out time not available';
        attendanceStatus = attendance.check.status;

    }

    const sortedTodayStatus = toDayStatus.today.sort((a, b) => {
        const nameA = a.first_name.toLowerCase();
        const nameB = b.first_name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <h5 className="card-header">To Day Status</h5>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            <div className="table-responsive text-nowrap">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Check</th>
                                        {/*<th>Break</th>*/}
                                        <th className={`text-center`}>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="table-border-bottom-0">
                                    {
                                        sortedTodayStatus.map((item, index) => {
                                            const attendanceID = item.id;
                                            return (
                                                <React.Fragment key={index}>
                                                    <tr>
                                                        <td className={` `}>
                                                            <div onClick={event =>
                                                                openListHandler(attendanceID)}>
                                                            <UserProfile profile={item.profile ? PF + item.profile : PF + "avatar.png"} name={`${item.first_name} ${item.last_name}`}  />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span
                                                                className="badge bg-label-warning me-1">
                                                                {
                                                                    getLastStatus([item.check, item.break])
                                                                }
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="dropdown">
                                                                <button type="button"
                                                                        className="btn p-0 dropdown-toggle hide-arrow table-center-dot"
                                                                        data-bs-toggle="dropdown">
                                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                                </button>
                                                                <div className="dropdown-menu">
                                                                    <Link to={`/employees/profile`}
                                                                          state={{id: item.id}}
                                                                          onClick={() => localStorage.setItem("account_tab", 2)}
                                                                          className="dropdown-item">
                                                                        <i className="bx bx-edit-alt me-1"></i>Edit
                                                                    </Link>
                                                                    {/*<a className="dropdown-item" href="/">*/}
                                                                    {/*    <i className="bx bx-trash me-1"></i> Delete</a>*/}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    {
                                                        item.id === openList.index && openList.open ? (
                                                            <tr className="full-width">
                                                                <td colSpan="5">
                                                                    <div
                                                                        className={`container-xxl flex-grow-1 container-p-y`}>
                                                                        <div className={`card`}>
                                                                            <div className={`card-body`}>
                                                                                <div className={`row g-0`}>
                                                                                    {
                                                                                        // if data is not available at that time want to add h2 tag with text "Data is not available"
                                                                                        attendance.check != null && attendance.check.in === null &&
                                                                                        attendance.breakin.length === 0 ? (
                                                                                            <h2 className={`m-0 text-center`}>Data
                                                                                                is not available</h2>
                                                                                        ) : (
                                                                                            <table className={`table `}>
                                                                                                <tbody
                                                                                                    className={`table-border-bottom-0`}>
                                                                                                {
                                                                                                    attendance.check === null ? "Loading " : (
                                                                                                        <tr className="">
                                                                                                            <td className={`p-2`}>{inTime}</td>
                                                                                                            <td className={`p-1`}>{outTime}</td>
                                                                                                            {/*<td className={`p-1`}>{attendanceStatus}</td>*/}
                                                                                                            <td className={`p-1`}>{attendanceStatus ? formatText(attendanceStatus) : 'Status not available'}</td>
                                                                                                            <td>
                                                                                                                <TimeBadge
                                                                                                                    _in={attendance.check._in}
                                                                                                                    _out={attendance.check._out}/>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    )
                                                                                                }
                                                                                                {
                                                                                                    attendance.check === null ? "Loading " : (
                                                                                                        attendance.breakin.map((item, index) => {
                                                                                                                const breakInTime = formatDateTime.getTime(item._in);
                                                                                                                const breakOutTime = item._out ? formatDateTime.getTime(item._out) : 'Out time not available';
                                                                                                                return (
                                                                                                                    <React.Fragment
                                                                                                                        key={index}>
                                                                                                                        <tr className="">
                                                                                                                            <td className={`p-2`}>{breakInTime}</td>
                                                                                                                            <td className={`p-1`}>{breakOutTime}</td>
                                                                                                                            {/*<td className={`p-1`}>{item.status}</td>*/}
                                                                                                                            <td className={`p-1`}>{item.status ? formatText(item.status) : 'Status not available'}</td>
                                                                                                                            <td>
                                                                                                                                <TimeBadge
                                                                                                                                    _in={item._in}
                                                                                                                                    _out={item._out}/>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                    </React.Fragment>
                                                                                                                )
                                                                                                            }
                                                                                                        )
                                                                                                    )
                                                                                                }
                                                                                                </tbody>
                                                                                            </table>
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ) : ""
                                                    }
                                                </React.Fragment>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Today;