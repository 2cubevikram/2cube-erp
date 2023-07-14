import {connect, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {getAttendance} from "../../redux/actions/profileAction";
import {formatDateTime} from "../../function/time";


const Attendance = ({getAttendance}) => {
    const location = useLocation();

    const id = location.state.id;
    const user = useSelector((state) => state.login.user);
    const attendance = useSelector((state) => state.user.attendance);

    const footer_data = {
        break: 0,
        break_time: 0,
        working_hours: 0,
        remaining_hours: 0
    }

    if (attendance.breakin && attendance.check) {
        footer_data.break = attendance.breakin.length;
        footer_data.break_time = formatDateTime.calculateTotal(attendance.breakin);

        let checkin_to_current_time = formatDateTime.getCheckTimeToCurrentTime(attendance.check._in);
        let checkin_to_current_time_minutes = formatDateTime.convertToMinutes(checkin_to_current_time);
        const totalBreakMinutes = formatDateTime.convertToMinutes(footer_data.break_time);
        const minutes_to_hours = checkin_to_current_time_minutes - totalBreakMinutes;
        const h = formatDateTime.convertToHour("8:00");
        const hh = h - minutes_to_hours;
        footer_data.remaining_hours = formatDateTime.convertMinutesToHours(hh);

        footer_data.working_hours = formatDateTime.convertMinutesToHours(minutes_to_hours);
    }

    useEffect(() => {
        getAttendance({user, id});
    }, [user]);

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
                    <TR data={attendance.check}/>
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
                                <th>Actions</th>
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
    const {data, remainWork} = props;

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


    const inTime = formatDateTime.getTime(data._in)

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

    return (
        <tr className="table-default" key={"id"}>
            <td>
                {inTime}
            </td>
            <td>{outTime}</td>
            <td>
                {
                    data.status
                }
            </td>

            <td>
                {CheckoutTime ? (
                    <span className="badge bg-label-primary me-1">
                      {differenceTime}
                    </span>
                ) : (
                    <span>Out time not available</span>
                )}
            </td>
            <td>
                <div className="dropdown">
                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow"
                            data-bs-toggle="dropdown">
                        <i className="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div className="dropdown-menu">
                        {/*<Link to={`/profile/${item.id}`} className="dropdown-item"><i*/}
                        {/*    className="bx bx-edit-alt me-1"></i>Profile</Link>*/}
                        <a className="dropdown-item" href="/"><i
                            className="bx bx-edit-alt me-1"></i> Edit</a>
                        <a className="dropdown-item" href="/"><i
                            className="bx bx-trash me-1"></i> Delete</a>
                    </div>
                </div>
            </td>
        </tr>
    )
}


export default connect(null, {getAttendance})(Attendance);