import moment from "moment/moment";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteHoliday, getHoliday} from "../../redux/actions/holidayActions";
import HolidayForm from "./holiday-form";


const Holidays = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.user);
    const holidays = useSelector(state => state.holiday);
    const loading = useSelector((state) => state.holiday.loading);


    useEffect(() => {
        dispatch(getHoliday({user}))
        // eslint-disable-next-line
    }, [user])

    function deleteHolidayById(id) {
        dispatch(deleteHoliday({user,id}))
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <h5 className="card-header">List of Holiday's</h5>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="table-responsive text-nowrap">
                            {holidays.holiday.length === 0 ? (
                                <table className="table">
                                    <tbody className="table-border-bottom-0">
                                    <tr>
                                        <td colSpan="7">No Holiday's</td>
                                    </tr>
                                    </tbody>
                                </table>
                            ) : (
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Create Date</th>
                                        <th>date of holiday</th>
                                        <th>Label</th>
                                        <th>Leave Reason</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody className="table-border-bottom-0">
                                    {
                                        holidays.holiday.map((item, index) => (
                                            <tr key={item.key || index}>
                                                <td>{moment(item.created_at).format("DD-MM-YYYY")}</td>
                                                <td>{moment(item.date).format("DD-MM-YYYY")}</td>
                                                <td>{item.label}</td>
                                                <td>{item.post_by}</td>
                                                <td>
                                                    {

                                                        <div className="dropdown">
                                                            <button type="button"
                                                                    className="btn p-0 dropdown-toggle hide-arrow"
                                                                    data-bs-toggle="dropdown">
                                                                <i className="bx bx-dots-vertical-rounded"></i>
                                                            </button>
                                                            <div className="dropdown-menu">
                                                                <Link
                                                                    onClick={e => deleteHolidayById(item.id)}
                                                                    className="dropdown-item"><i
                                                                    className="bx bx-trash"></i></Link>

                                                                {/*<a className="dropdown-item" href="/"><i*/}
                                                                {/*    className="bx bx-trash me-1"></i> Delete</a>*/}
                                                            </div>
                                                        </div>
                                                    }
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

            <HolidayForm/>
        </>
    );
}

export default Holidays;