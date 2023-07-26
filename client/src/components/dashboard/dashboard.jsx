import React, {useEffect} from 'react';
import CheckAction from "../user-action/check-action";
import BreakAction from "../user-action/break-action";
import {useDispatch, useSelector} from "react-redux";
import {getDayStatus} from "../../redux/actions/breakAction";
import {getAttendance} from "../../redux/actions/profileAction";
import moment from 'moment';

const Dashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.user);
    const break_status = useSelector(state => state.break);
    const check_status = useSelector(state => state.check);

    console.log(check_status)
    useEffect(() => {
        dispatch(getDayStatus({user}))
        dispatch(getAttendance({user}));
    }, [dispatch, user]);

    const _break = useSelector(state => state.break.status);
    const _check = useSelector(state => state.check.status);

    return (
        <>
            <div className="content-wrapper">
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="row">
                        <div className="col-lg-12 mb-4 order-0">
                            <div className="card">
                                <div className="d-flex align-items-end row">

                                    <div className="col-sm-7">
                                        <div className="card-body">
                                            <h5 className="card-title text-primary">Welcome, {user.first_name} {user.last_name} !
                                                🎉</h5>
                                            <p className="mb-4">
                                                🌞 It's time for our daily check-in to get the day started on the right
                                                foot. Looking forward to a productive and successful day ahead! 💪
                                            </p>
                                            <div className="btn_wrp1">
                                                <CheckAction break_status={_break} check_status={_check}/>
                                                <BreakAction break_status={_break} check_status={_check}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-5 text-center text-sm-left">
                                        <div className="card-body pb-0 px-0 px-md-4">
                                            <img
                                                src="../assets/img/illustrations/man-with-laptop-light.png"
                                                height="140"
                                                alt="View Badge User"
                                                data-app-dark-img="illustrations/man-with-laptop-dark.png"
                                                data-app-light-img="illustrations/man-with-laptop-light.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12  order-2 order-md-3 mb-4">
                            <div className="card">
                                <div className="row row-bordered g-0">
                                    <div className="col-md-12">
                                        <div className="cs-card-body ">
                                            <div className="card-body">
                                                {check_status.status && check_status.status !== null ? (
                                                    check_status.day && (
                                                        <div className="text-center">
                                                            <div className="alert alert-danger" role="alert">
                                                                Check In - {moment(check_status.day._in).format('hh:mm A')}
                                                            </div>
                                                        </div>
                                                    )) : (
                                                    <div className="text-center">
                                                        <div className="alert alert-danger" role="alert">
                                                            <p>No check data available.</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {break_status.break && break_status.break.length > 0 ? (
                                                    break_status.break.map((item, index) => (
                                                        <div className="text-center" key={item.id}>
                                                            <div className="alert alert-success" role="alert">
                                                                Break In - {moment(item._in).format('hh:mm A')}
                                                            </div>
                                                            {item._out && (
                                                                <div className="alert alert-info" role="alert">
                                                                    Break Out - {moment(item._out).format('hh:mm A')}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-center">
                                                        <div className="alert alert-danger" role="alert">
                                                            <p>No break data available.</p>
                                                        </div>
                                                    </div>

                                                )}

                                                {check_status.status && check_status.day._out !== null ? (
                                                    check_status.day && (
                                                        <div className="text-center">
                                                            <div className="alert alert-danger" role="alert">
                                                                Check out - {moment(check_status.day._out).format('hh:mm A')}
                                                            </div>
                                                        </div>
                                                    )) : (
                                                    ""
                                                    // <div className="text-center">
                                                    //     <div className="alert alert-danger" role="alert">
                                                    //         <p>No check data available.</p>
                                                    //     </div>
                                                    // </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="content-backdrop fade"></div>
            </div>
        </>
    )
}

export default Dashboard
// export default connect(null, {getAttendance})(Dashboard);