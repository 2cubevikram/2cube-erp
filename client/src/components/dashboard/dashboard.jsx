import React, {useEffect, useState} from 'react';
import moment from 'moment';
import io from 'socket.io-client';
import {Link} from "react-router-dom";
import CheckAction from "../user-action/check-action";
import BreakAction from "../user-action/break-action";
import {useDispatch, useSelector} from "react-redux";
import {getDayStatus} from "../../redux/actions/breakAction";
import {getAttendance} from "../../redux/actions/profileAction";
import {getBirthday} from "../../redux/actions/dayActions";
import {getDayOfWeekInCurrentYear, isBirthdayToday} from "../../function/excerpt";


const Dashboard = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.user);
    const break_status = useSelector(state => state.break);
    const check_status = useSelector(state => state.check);
    const birthday = useSelector(state => state.birthday);


    const savedNotification = localStorage.getItem('notification');
    const [notification, setNotification] = useState(savedNotification ? JSON.parse(savedNotification) : null);

    useEffect(() => {
        const newSocket = io('http://localhost:3030');
        dispatch(getDayStatus({user}));
        dispatch(getAttendance({user}));
        dispatch(getBirthday({user}));

        newSocket.on('new_leave_application', (notificationMessage) => {
            setNotification(notificationMessage);
        });

        return () => {
            newSocket.off('new_leave_application');
        };
    }, [dispatch, user]);

    useEffect(() => {
        if (notification) {
            localStorage.setItem('notification', JSON.stringify(notification));
        } else {
            localStorage.removeItem('notification');
        }
    }, [notification]);

    const _break = useSelector(state => state.break.status);
    const _check = useSelector(state => state.check.status);

    // const today_status = (moment(check_status._in).format('YYYY-MM-DD'))
    const today_status = check_status.status;
    console.log(today_status)

    return (
        <>
            <div className="content-wrapper">
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="row">
                        <div className="col-lg-8 mb-4 order-0">
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
                                            {today_status === "CHECK_OUT" ? (
                                                <div className="alert alert-primary" role="alert">Your Day Was Completed! Have a great day! If you need any assistance, please contact the authorized person. 🌞</div>
                                            ) : (
                                                <div className="btn_wrp1">
                                                    <CheckAction break_status={_break} check_status={_check}/>
                                                    <BreakAction break_status={_break} check_status={_check}/>
                                                </div>)
                                            }
                                        </div>
                                    </div>

                                    {notification &&
                                        <div className="notification__cover">
                                            <div className="notification">
                                                <Link to={notification.link}>
                                                    {notification.message}
                                                </Link>
                                                <button onClick={() => setNotification(null)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px"
                                                         viewBox="0 0 24 24">
                                                        <path fill="none" stroke="#000000" stroke-width="2"
                                                              d="M7,7 L17,17 M7,17 L17,7"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                    }

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

                        <div className="col-md-6 col-lg-4 order-2 mb-4">
                            <div className="card h-100">
                                <div className="card-header d-flex align-items-center justify-content-between">
                                    <h5 className="card-title m-0 me-2">Birth Day</h5>
                                </div>
                                <div className="card-body">
                                    {
                                        birthday && birthday.length > 0 && (
                                            birthday.map((item, index) => (
                                                <ul className="p-0 m-0" key={index}>
                                                    {/*<li className="d-flex mb-4 pb-1">*/}
                                                    <li className={`d-flex mb-4 pb-1 ${isBirthdayToday(item.birth_date) ? 'birthday-highlight' : ''}`}>
                                                        <div className="avatar flex-shrink-0 me-3">
                                                            <img src={PF + item.profile} alt="User"
                                                                 className="rounded"/>
                                                        </div>
                                                        <div
                                                            className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                                            <div className="me-2">
                                                                <small
                                                                    className="text-muted d-block mb-1">{item.first_name}</small>
                                                                <h6 className="mb-0">{item.last_name}</h6>
                                                            </div>
                                                            <div className="user-progress d-flex align-items-center gap-1">
                                                                <h6 className="mb-0">{getDayOfWeekInCurrentYear(item.birth_date)} : </h6>
                                                                <span
                                                                    className="text-muted">{moment(item.birth_date).format('DD-M')}</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            ))
                                        )
                                    }
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
                                                                Check out
                                                                - {moment(check_status.day._out).format('hh:mm A')}
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