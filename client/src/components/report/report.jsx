import React, {useEffect, useState} from "react";
import {getEmployee} from "../../redux/actions/employeeAction";
import {useDispatch, useSelector} from "react-redux";
import {getReport} from "../../redux/actions/reportGenerateActions";
import {formatDateTime} from "../../function/time";
import $ from "jquery";
import moment from "moment/moment";
import {getDayOfWeek} from "../../function/excerpt";

const Report = () => {
    const dispatch = useDispatch();
    let user = useSelector(state => state.login.user);
    let employee = useSelector(state => state.employee);
    const [employeeId, setEmployeeId] = useState("");
    const [startDate, setFromDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const generatedReport = useSelector((state) => state.getReportGenerate.report);
    const [generatedReportData, setGeneratedReportData] = useState([]);

    useEffect(() => {
        dispatch(getEmployee({ user }));
        console.log({user})
        // eslint-disable-next-line
    }, [getEmployee, user]);

    const handleEmployeeSelection = (id, firstName, lastName) => {
        setEmployeeId(id);
        $(".employee-name").text(`${firstName} ${lastName}`);
    };

    const handleClick = () => {
        const obj = {
            employeeId, startDate, endDate
        }
        dispatch(getReport({ user, obj }));

    };

    useEffect(() => {
        // Check if generatedReport is not empty and contains payload data
        if (generatedReport && Array.isArray(generatedReport.attendance)) {
            setGeneratedReportData(generatedReport.attendance);
            console.log('Attendance data:', generatedReport.attendance); // Log attendance data
        }
    }, [generatedReport]);

    return(
        <>
            <div className="content-wrapper">
                <div className="container-xxl flex-grow-1 container-p-y">

                    <div className="card" id="dropdown-variation-demo">
                        <h5 className="card-header">Time Report</h5>
                        <hr className="m-0" />
                        <div className="card-body">
                            <div className="row gy-3">
                                <div className="col-xl-12">
                                    <div className="demo-inline-spacing">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-primary dropdown-toggle employee-name" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Select Employee
                                            </button>
                                            {Array.isArray(employee) && (
                                                <ul className="dropdown-menu">
                                                    {employee.map(employee => (
                                                        <li key={employee.id}><a className="dropdown-item" onClick={() => handleEmployeeSelection(employee.id, employee.first_name, employee.last_name)}>{employee.first_name} {employee.last_name}</a></li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                        <div className="btn-group">
                                            <div><span className="startDate">From :</span></div><div><input type="date" name="startDate" className="btn btn-primary dropdown-toggle" value={startDate} onChange={(e) => setFromDate(e.target.value)} /></div>
                                        </div>
                                        <div className="btn-group">
                                            <div className="text__"><span className="startDate">From :</span></div><div className="btn__input"><input type="date" name="endDate" className="btn btn-primary dropdown-toggle" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></div>
                                        </div>
                                        <div className="btn-group">
                                            <button type="submit" className="btn btn-primary" onClick={handleClick}>Generate</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card" id="dropdown-variation-demo">
                            <hr className="m-0" />
                            <div className="card-body">
                                <div className="row gy-3">
                                    <div className="col-xl-12">
                                        <div className="table-responsive text-nowrap">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Check In</th>
                                                    <th>Check Out</th>
                                                    <th>Total</th>
                                                    <th>Break Time</th>
                                                    <th>Actual Hours</th>
                                                    <th>Working Hours</th>
                                                </tr>
                                                </thead>
                                                <tbody className="table-border-bottom-0">
                                                    {generatedReportData.length === 0 ? (
                                                        <tr>
                                                            <td colSpan="7">No Data Available</td>
                                                        </tr>
                                                    ) : (
                                                        generatedReportData.map((item, index) => {
                                                            const total_check_time = formatDateTime.TimeDifference(item.check_in, item.check_out);
                                                            const [hoursStr, minutesStr] = total_check_time.split(':');
                                                            const check_time_in_minutes = parseInt(hoursStr) * 60 + parseInt(minutesStr);
                                                            const actual_time = check_time_in_minutes - ((item.total_break_hours < 60 && item.total_break_hours !== 0) ? 60 : item.total_break_hours);
                                                            const total_time_in_hours = formatDateTime.convertMinutesToHours(actual_time)

                                                            return (
                                                                <tr key={index}>
                                                                    <td>{moment(item.date).format('DD-MM-YYYY')} / {getDayOfWeek(item.date)}</td>
                                                                    <td>{formatDateTime.formatTime(item.check_in)}</td>
                                                                    <td>{formatDateTime.formatTime(item.check_out)}</td>
                                                                    <td>{formatDateTime.TimeDifference(item.check_in, item.check_out)}</td>
                                                                    <td>
                                                                        {/*{item.total_break_hours < 60 ? (*/}
                                                                        {/*    `${item.total_break_hours} min`*/}
                                                                        {/*) : (*/}
                                                                        {/*    `${Math.floor(item.total_break_hours / 60)} hr ${Math.floor(item.total_break_hours % 60)} min`*/}
                                                                        {/*)}*/}
                                                                        {formatDateTime.convertMinutesToHours(item.total_break_hours)}
                                                                    </td>
                                                                    <td>{total_time_in_hours}</td>
                                                                    <td>
                                                                        {Math.floor((item.check_hours * 60 - item.total_break_hours) / 60)}:
                                                                        {Math.floor((item.check_hours * 60 - item.total_break_hours) % 60)}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })
                                                    )}
                                                </tbody>

                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

$(document).ready(function () {

});
export default Report;

