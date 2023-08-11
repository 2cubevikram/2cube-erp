import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import moment from "moment";
import {getAttendance, breakTimeEdit} from "../../redux/actions/profileAction";
import {formatDateTime} from "../../function/time";

const Attendance = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [filterDate, setFilterDate] = useState();

    const id = location.state.id;
    const user = useSelector((state) => state.login.user);
    const attendance = useSelector((state) => state.user.attendance);

    const footer_data = {
        break: 0,
        break_time: 0,
        working_hours: 0,
        remaining_hours: 0
    }
    let checkin_to_current_time;
    if (attendance.breakin && attendance.check) {
        footer_data.break = attendance.breakin.length;
        footer_data.break_time = formatDateTime.calculateTotal(attendance.breakin);
        if (attendance.check._out == null) {
            checkin_to_current_time = formatDateTime.getCheckTimeToCurrentTime(attendance.check._in);
        } else {
            checkin_to_current_time = formatDateTime.getCheckTimeToComplateTime(attendance.check._in, attendance.check._out);
        }
        let checkin_to_current_time_minutes = formatDateTime.convertToMinutes(checkin_to_current_time);
        const totalBreakMinutes = formatDateTime.convertToMinutes(footer_data.break_time);
        const minutes_to_hours = checkin_to_current_time_minutes - totalBreakMinutes;
        const h = formatDateTime.convertToHour("8:00");
        const hh = h - minutes_to_hours;

        footer_data.remaining_hours = hh > 0 ? formatDateTime.convertMinutesToHours(hh) : 'completed';
        footer_data.working_hours = formatDateTime.convertMinutesToHours(minutes_to_hours);
    }

    const handleClick = () => {
        dispatch(getAttendance({user, id, filterDate}));
    };
    const handleChange = (event) => {
        setFilterDate(event.target.value);
    };

    const handleClear = () => {
        setFilterDate('');
        dispatch(getAttendance({user, id}));
    }

    useEffect(() => {
        dispatch(getAttendance({user, id, filterDate}));
        // eslint-disable-next-line
    }, [getAttendance, user, id]);

    let DATA = "";

    if (attendance.check === null) {
        DATA = (
            <tr>
                <td><h1>Loading...</h1></td>
            </tr>
        )
    } else {
        DATA = (
            <>
                {
                    <TR  data={attendance.check}/>
                }
                {
                    attendance.breakin.map((item, index) => {
                        return <TR key={index} data={item}/>
                    })
                }
            </>
        )
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <h5 className="card-header">Employee List</h5>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>In</th>
                                <th>OUT</th>
                                <th>TYPE</th>
                                <th>Total Time</th>
                                {/*<th>Actions</th>*/}
                                <input
                                    type="date"
                                    name="filterDate"
                                    value={filterDate}
                                    onChange={handleChange}
                                />
                                <button onClick={handleClick}>filter</button>
                                <button onClick={handleClear}>clear</button>
                            </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                            {
                                DATA
                            }
                            </tbody>
                            <Tfooter data={footer_data}/>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

const Tfooter = (props) => {
    const {data} = props;

    return (
        <tfoot className="table-border-bottom-0">
        <tr>
            <th>toltalBreak : {data.break}</th>
            <th>-</th>
            <th>working_hours {data.working_hours}</th>
            <th>{data.break_time} Hours</th>
            <th>remaining hour: {data.remaining_hours}</th>
        </tr>
        </tfoot>
    )
}

const TR = ({data}) => {

    const user = useSelector((state) => state.login.user);
    const inTime = formatDateTime.getTime(data._in);

    let outTime = '';
    if (data._out) {
        outTime = formatDateTime.getTime(data._out);
    } else {
        outTime = 'Out time not available';
    }

    const CheckinTime = new Date(data._in);
    let CheckoutTime = '';

    if (data._out) {
        CheckoutTime = new Date(data._out);
    } else {
        CheckoutTime = null;
    }

    const differenceTime = formatDateTime.TimeDifference(CheckinTime, CheckoutTime);

    const [childValue, setChildValue] = useState(false);
    // const [childValueMsg, setChildValueMsg] = useState(false);
    const handleChange = (event) => {
        // if (user.role !== "HR"){
        const newValue = !childValue;
        setChildValue(newValue);

        // }else {
        //     setChildValueMsg("MSG");
        // }
    };

    const handleChildEditableRow = () => {
        const newValue = !childValue;
        setChildValue(newValue);
    };

    return (
        <>

            <tr className="table-default" key={data.id}>
                <td>
                    {inTime}
                </td>
                <td>{outTime}</td>
                <td>{data.status}</td>
                <td>
                    {
                        CheckoutTime ? (
                            <span className="badge bg-label-primary me-1">{differenceTime}</span>
                        ) : (<span>Out time not available</span>)
                    }
                </td>
                {user.role === 'Admin' || user.role === 'HR' ? (
                    <td>

                        <div className="dropdown">
                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow"
                                    data-bs-toggle="dropdown">
                                <i className="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div className="dropdown-menu">
                                <>
                                    <a
                                        onClick={handleChange}
                                        className="dropdown-item"><i
                                        className="bx bx-edit me-1"></i> Edit</a>
                                </>
                            </div>
                        </div>
                    </td>
                ) : null}
            </tr>
            {
                childValue ? (
                    <EditableRow  _data={data} inTime={inTime} outTime={outTime}
                                 onChildClick={handleChildEditableRow}
                    />
                ) : ""
            }
            {/*{*/}
            {/*    childValueMsg === "MSG" ? (*/}
            {/*        <div className="error__msg">"Sorry, HR can't edit their own records."</div>*/}
            {/*    ) : ""*/}
            {/*}*/}
        </>
    )
}

const EditableRow = ({_data, inTime, outTime, onChildClick}) => {
    const status = _data.status;
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const [_inTime, setInTime] = useState(inTime);
    const [_outTime, setOutTime] = useState(outTime);
    const [_status, setStatus] = useState(status);
    const navigate = useNavigate();

    const _date = formatDateTime.getDate(_data._in)

    const user = useSelector((state) => state.login.user);

    const dateParts = _date.split('/');
    const day = dateParts[0].padStart(2, '0');
    const month = dateParts[1].padStart(2, '0');
    const year = dateParts[2];

    const formattedDate = `${year}-${month}-${day}`;

    const handleInTimeChange = (event) => {
        setInTime(event.target.value);
    };
    const handleOutTimeChange = (event) => {
        setOutTime(event.target.value);
    };

    // const handleStatusChange = (event) => {
    //     setStatus(event.target.value);
    // }

    const _newInTime = moment(_inTime, "h:mm A").format("HH:mm:ss");
    const _newOutTime = moment(_outTime, "h:mm A").format("HH:mm:ss");

    const handleSave = async () => {
        const obj = {
            'id': _data.id,
            'employee_id': _data.employee_id,
            'date': formattedDate,
            '_in': _newInTime,
            '_out': _newOutTime,
            'status': _status
        };
        try {
            await dispatch(breakTimeEdit({user, obj}));
            onChildClick();
        } catch (error) {
            // console.log(error)
            alert(error);
            navigate('/');
        }
    };

    return (
        <tr className="full-width" key={"id"}>
            <td colSpan="5">
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className=" col-md-3">
                                    <label htmlFor="firstName" className="form-label">
                                        Start Date
                                    </label>
                                    <input className={"form-control"} type="time" name="inTime" value={moment(_inTime, "h:mm A").format("HH:mm:ss")} onChange={handleInTimeChange}/>
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="firstName" className="form-label">
                                        Start Date
                                    </label>
                                    <input className={"form-control"} type="time" name="outTime" value={moment(_outTime, "h:mm A").format("HH:mm:ss")} onChange={handleOutTimeChange}/>
                                </div>
                                <div className=" col-md-3">
                                    <label htmlFor="firstName" className="form-label">
                                        Start Date
                                    </label>
                                    <div className={"form-control"}>{_status}</div>
                                </div>
                                <div className=" col-md-3">
                                    <button className={"btn btn-primary"} onClick={handleSave}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default Attendance;
// export default connect(null, {getAttendance})(Attendance);