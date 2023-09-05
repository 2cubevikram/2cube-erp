import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
import {getUser} from "../../redux/reducers/authReducer";
import {useDispatch} from 'react-redux';
import {getNotification, logoutUser} from "../../redux/actions/authActions";
import React, {useEffect, useState} from "react";
import io from "socket.io-client";

const Navbar = () => {
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const loading = useSelector(state => state.birthday.loading);
    const notifications = useSelector(state => state.birthday.notification);

    const savedNotification = localStorage.getItem('notification');
    const [notification, setNotification] = useState(savedNotification ? JSON.parse(savedNotification) : null);

    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(logoutUser());
    };

    useEffect(() => {
        const newSocket = io('http://localhost:3030');

        dispatch(getNotification({user}));

        newSocket.on('new_leave_application', (notificationMessage) => {
            setNotification(notificationMessage);
        });

        return () => {
            newSocket.off('new_leave_application');
        };
    }, [dispatch, user]);

    // useEffect(() => {
    //     if (notification) {
    //         localStorage.setItem('notification', JSON.stringify(notification));
    //     } else {
    //         localStorage.removeItem('notification');
    //     }
    // }, [notification]);

    // console.log(notifications)
    return (
        <>
            {/*{notification &&*/}
            {/*    <div className="notification__cover">*/}
            {/*        <div className="notification">*/}
            {/*            <Link to={notification.link}*/}
            {/*                  state={{id: notification.id}}>*/}
            {/*                {notification.message}*/}
            {/*            </Link>*/}
            {/*            <button onClick={() => setNotification(null)}>*/}
            {/*                <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px"*/}
            {/*                     viewBox="0 0 24 24">*/}
            {/*                    <path fill="none" stroke="#000000" strokeWidth="2"*/}
            {/*                          d="M7,7 L17,17 M7,17 L17,7"/>*/}
            {/*                </svg>*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*}*/}
            <nav
                className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                id="layout-navbar">
                <div
                    className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                    <a className="nav-item nav-link px-0 me-xl-4" href="/">
                        <i className="bx bx-menu bx-sm"></i>
                    </a>
                </div>
                <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                        {

                            <li className="nav-item dropdown dropdown-notifications dropdown-menu-sm-full">
                                <a className="nav-link dropdown-toggle hide-arrow notification-button" href="/#"
                                   role="button"
                                   data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className={`bx bx-bell bx-sm ${notifications.length > 0 && "bx-tada"}`}>
                                        {/*<i className={`bx bx-bell bx-sm ${notifications.length > 0 && (user.role === 'HR' || user.role === 'Admin') && user.id === notifications[0].employee_id ? "bx-tada" : ""}`} >*/}
                                        {
                                            notifications.length > 0 && (
                                                <span></span>
                                            )
                                        }
                                    </i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <div className="notifications-list" data-simplebar>
                                        {
                                            loading ? (
                                                <p>Loading notifications...</p>
                                            ) : (
                                                Array.isArray(notifications) && notifications.length > 0 ? (
                                                    notifications.map((item) => {
                                                        const isAdminOrHR = user.role === 'HR' || user.role === 'Admin';
                                                        const isUserAuthorized = user.id === item.employee_id || isAdminOrHR;

                                                        return isUserAuthorized ? (
                                                            user.role === 'HR' || user.role === 'Admin' ? (
                                                            <Link
                                                                to={"/leave-app"}
                                                                state={{ id: item.application_id }}
                                                                className="dropdown-item"
                                                                key={item.application_id}
                                                            >
                                                                <div className="d-flex align-items-start">
                                                                    <div className="font-weight-bold me-1">{item.type} {item.message}</div>
                                                                </div>
                                                            </Link>
                                                            ) : (
                                                                <Link
                                                                    to={`/profile`}
                                                                    state={{id: user.id}}
                                                                    onClick={() => localStorage.setItem("account_tab", 3)}
                                                                    className="dropdown-item"
                                                                    key={item.application_id}
                                                                >
                                                                    <div className="d-flex align-items-start">
                                                                        <div className="font-weight-bold me-1">{item.type} {item.message}</div>
                                                                    </div>
                                                                </Link>
                                                            )

                                                        ) :'';
                                                        //     (
                                                        //     <p key={item.application_id}>No notifications available</p>
                                                        // );
                                                    })
                                                ) : (
                                                    <p>No notifications available</p>
                                                )
                                            )
                                        }

                                        {
                                            notification && (
                                                <Link to={notification.link}
                                                      state={{id: notification.id}}>
                                                    {notification.message}
                                                </Link>
                                            )
                                        }
                                    </div>
                                </div>
                            </li>
                        }

                        <li className="nav-item navbar-dropdown dropdown-user dropdown">
                            <Link to={`/`} className="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                <div className="avatar avatar-online">
                                    <img
                                        src={user.profile ? PF + user.profile : PF + "avatar.png"}
                                        alt="true"
                                        className="w-px-40 h-auto rounded-circle"
                                    />
                                </div>
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <Link to={`/`} className="dropdown-item">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 me-3">
                                                <div className="avatar avatar-online">
                                                    <img
                                                        src={user.profile ? PF + user.profile : PF + "avatar.png"}
                                                        alt="true"
                                                        className="w-px-40 h-auto rounded-circle"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <span
                                                    className="fw-semibold d-block">{user.first_name} {user.last_name}</span>
                                                <small className="text-muted">{user.role}</small>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <div className="dropdown-divider"></div>
                                </li>
                                <li>
                                    <Link to={`/profile`}
                                          state={{id: user.id}}
                                          className="dropdown-item"><i
                                        className="bx bx-user me-2"></i>My Profile</Link>
                                </li>
                                <li>
                                    <a href="/#" className="dropdown-item" onClick={logoutHandler}>
                                        <i className="bx bx-power-off me-2"></i>
                                        <span className="align-middle">Log Out</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar;