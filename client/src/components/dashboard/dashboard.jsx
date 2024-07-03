import React, {useEffect} from 'react';
import moment from 'moment';
import CheckAction from "../user-action/check-action";
import BreakAction from "../user-action/break-action";
import {useDispatch, useSelector} from "react-redux";
import {getDayStatus} from "../../redux/actions/breakAction";
import {getAttendance} from "../../redux/actions/profileAction";
import {getBirthday, getLastStatus} from "../../redux/actions/dayActions";
import {
    getDayOfWeekInCurrentYear,
    isBirthdayToday,
    isBirthdayTomorrow, isDateAfterToday, isDateBeforeToday, isDateMonthBeforeToday,
    isThisWeek
} from "../../function/excerpt";
import {getHoliday} from "../../redux/actions/holidayActions";
import {checkLogin} from "../../function/check_login";
import GraphBar from './GraphBar';
import CurrentMonth from './CurrentMonth';
import PreviousMonth from './PreviousMonth';


const Dashboard = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.user);
    const break_status = useSelector(state => state.break);
    const check_status = useSelector(state => state.check);
    const birthday = useSelector(state => state.birthday.birthday);
    const holidays = useSelector(state => state.holiday);
    const lastCheckStatus = useSelector(state => state.lastCheck);


    useEffect(() => {
        checkLogin();
        dispatch(getDayStatus({user}));
        dispatch(getAttendance({user}));
        dispatch(getBirthday({user}));
        dispatch(getHoliday({user}));
        dispatch(getLastStatus({user}));
    }, [dispatch, user]);


    const _break = useSelector(state => state.break.status);
    const _check = useSelector(state => state.check.status);

    return (
        <>
            <div className="content-wrapper">
                <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="row">
                        <div className="col-lg-8 mb-4">
                            <div className="card dashboard-banner">
                                <div className="d-flex align-items-end row">
                                    <div className="col-sm-7">
                                        <div className="card-body">
                                            <h5 className="card-title text-primary">Welcome, {user.first_name} {user.last_name} 🎉</h5>
                                            <p className="mb-4">
                                                🌞 It's time for our daily check-in to get the day started on the right
                                                foot. Looking forward to a productive and successful day ahead! 💪
                                            </p>
                                            {lastCheckStatus === undefined ? (
                                                <p>Loading...</p>
                                            ) : lastCheckStatus !== null ? (
                                                lastCheckStatus.isSameDate === false && lastCheckStatus.lastStatus && lastCheckStatus.lastStatus.status === "CHECK_IN" ? (
                                                    <div className="alert alert-danger" role="alert">
                                                        <strong>Your Last Day Was not Completed! If you need any
                                                            assistance, please contact the authorized person. 🌞</strong>
                                                    </div>
                                                ) : (
                                                    check_status.status === "CHECK_OUT" ? (
                                                        <div className="alert alert-primary" role="alert">
                                                            Your Day Was Completed! Have a great day! If you need any
                                                            assistance, please contact the authorized person. 🌞
                                                        </div>
                                                    ) : (
                                                        <div className="btn_wrp1">
                                                            <CheckAction break_status={_break} check_status={_check}/>
                                                            <BreakAction break_status={_break} check_status={_check}/>
                                                        </div>
                                                    )
                                                )
                                            ) : check_status.day.id === undefined && check_status.day._in === undefined && check_status.day._out === null ? (
                                                <div className="btn_wrp1">
                                                    <CheckAction break_status={_break} check_status={_check}/>
                                                </div>
                                            ) : null}
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

                            {/* i want to display here graph bar*/}

                            <div className="mt-4 card box__top">
                                <div className="row row-bordered g-0">
                                    <div className="col-md-12">
                                        <div className="cs-card-body">
                                            <div className="card-body">
                                                {check_status.status && check_status.status !== null ? (
                                                    check_status.day && (
                                                        <GraphBar
                                                            checkInTime={check_status.day._in}
                                                            breakTimes={break_status.break}
                                                            checkOutTime={check_status.day._out}
                                                        />
                                                    )) : (
                                                    <div className="text-center">
                                                        <div className="alert alert-danger" role="alert">
                                                            <p>Time Report data No available.</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 card box__top check-in-statusbox">
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

                            {/* current month leaves */}
                            { 
                                (user.role === 'Admin' || user.role === 'HR') ? (
                                    <div className="mt-4 card box__top check-in-statusbox">
                                        <div className="row row-bordered g-0">
                                            <div className="col-md-12">
                                                <div className="cs-card-body ">
                                                    <CurrentMonth />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : ""
                            }

                            {/* Previous month leaves */}
                            { 
                                (user.role === 'Admin' || user.role === 'HR') ? (
                                    <div className="mt-4 card box__top check-in-statusbox">
                                        <div className="row row-bordered g-0">
                                            <div className="col-md-12">
                                                <div className="cs-card-body ">
                                                    <PreviousMonth />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : ""
                            }

                        </div>

                        <div className="scroll__bar col-md-6 col-lg-4  mb-4">
                            <div className="card">
                                <div className="card-header d-flex align-items-center justify-content-between">
                                    <h5 className="card-title m-0 me-2">UPCOMING BIRTHDAY'S</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="p-0 m-0 birthday-list birthday-list-v2">
                                        {
                                            birthday && birthday.length > 0 && (
                                                [...birthday].sort((a, b) => {
                                                    const today = new Date(a.serverCurrentTime);
                                                    const aDate = new Date(today.getFullYear(), new Date(a.birth_date).getMonth(), new Date(a.birth_date).getDate());
                                                    const bDate = new Date(today.getFullYear(), new Date(b.birth_date).getMonth(), new Date(b.birth_date).getDate());

                                                    if (aDate < today && bDate >= today) return -1;
                                                    if (bDate < today && aDate >= today) return 1;
                                                    return aDate - bDate;
                                                }).map((item, index) => (

                                                    <li key={index}
                                                        className={`d-flex ${isBirthdayToday(item.birth_date, item.serverCurrentTime) ? 'active-highlight' : ''} ${isDateMonthBeforeToday(item.birth_date) ? 'completed-highlight' : ''}`}>
                                                        <div className="avatar flex-shrink-0 me-3">
                                                        <img src={item.profile !== null ? PF + item.profile : PF + 'avatar.png'} alt="User" className="rounded"/>
                                                        </div>
                                                        <div
                                                            className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                                            <div className="me-2">
                                                                <strong>{item.first_name} {item.last_name}</strong>
                                                            </div>
                                                            <div className="user-progress">
                                                                <span
                                                                    className="text-muted m-date">{moment(item.birth_date).format('DD/MM')}
                                                                    {moment().format('/YY')}
                                                                </span>
                                                                <span
                                                                    className={`date badge  ${isBirthdayToday(item.birth_date, item.serverCurrentTime) ? 'bg-black' : 'bg-primary'}`}>
                                                                    {
                                                                        isBirthdayToday(item.birth_date, item.serverCurrentTime) ? 'Today' :
                                                                            isBirthdayTomorrow(item.birth_date, item.serverCurrentTime) ? 'Tomorrow' :
                                                                                getDayOfWeekInCurrentYear(item.birth_date)
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="card mt-4 ">
                                <h5 className="card-header">UPCOMING HOLIDAY'S</h5>
                                <div className={`card-body scroll__bar`}>
                                    <ul className={`p-0 m-0 birthday-list`}>
                                        {
                                            [...holidays.holiday]
                                                .filter(item => isBirthdayToday(item.date, item.serverCurrentTime) || isThisWeek(item.date) || isDateAfterToday(item.date))
                                                .sort((a, b) => new Date(a.date) - new Date(b.date))
                                                .map((item, index) => (
                                                        <li key={index}
                                                            className={`d-flex ${isThisWeek(item.date) ? 'active-highlight' : ''} ${isDateBeforeToday(item.date) ? 'completed-highlight' : ''}`}>

                                                            {/*<li className={`d-flex ${isThisWeek(item.date) ? 'active-highlight' : ''}`}>*/}
                                                            <div
                                                                className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                                                <div className="me-2"><strong>{item.label}</strong></div>
                                                                <div className="user-progress">
                                                            <span
                                                                className="text-muted m-date">{moment(item.date).format('DD/MM/YY')}</span>
                                                                    <span
                                                                        className={`date badge  ${isBirthdayToday(item.date, item.serverCurrentTime) ? 'bg-black' : 'bg-primary'}`}>
                                                                {
                                                                    isBirthdayToday(item.date, item.serverCurrentTime) ? 'Today' :
                                                                        isBirthdayTomorrow(item.date, item.serverCurrentTime) ? 'Tomorrow' :
                                                                            getDayOfWeekInCurrentYear(item.date)
                                                                }
                                                                        {/*{getDayOfWeekInCurrentYear(item.date)}*/}
                                                            </span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                )
                                        }
                                    </ul>
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

export default Dashboard;