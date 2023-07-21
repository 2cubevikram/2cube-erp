import {Link, useNavigate} from "react-router-dom";
import {useSelector} from 'react-redux';
import {getUser} from "../../redux/reducers/authReducer";
import {useDispatch} from 'react-redux';
import {logoutUser} from "../../redux/actions/authActions";
import React, {useEffect, useState} from "react";
import {getProfile} from "../../redux/actions/profileAction";

const Navbar = () => {
    const user = useSelector(getUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [profile, setUserProfile] = useState(user);
    const userProfile = useSelector((state) => state.user.profile);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        if (userProfile !== null) {
            setUserProfile(userProfile);
        } else {
            setUserProfile(user);
        }
    }, [userProfile, user]);


    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(logoutUser());
    };

    useEffect(() => {
        dispatch(getProfile({user, id: user.id}));
    }, [dispatch, user])


    return (
        <>
            <nav
                className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                id="layout-navbar">
                <div
                    className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                    <a className="nav-item nav-link px-0 me-xl-4" href="/">
                        <i className="bx bx-menu bx-sm"></i>
                    </a>
                </div>
                <div className="navbar-nav-right d-flex align-items-center"
                     id="navbar-collapse">
                    <div className="navbar-nav align-items-center">
                        <div className="nav-item d-flex align-items-center">
                            <i className="bx bx-search fs-4 lh-0"></i>
                            <input
                                type="text"
                                className="form-control border-0 shadow-none"
                                placeholder="Search..."
                                aria-label="Search..."/>
                        </div>
                    </div>
                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                        <li className="nav-item navbar-dropdown dropdown-user dropdown">
                            <a className="nav-link dropdown-toggle hide-arrow"
                               href="/" data-bs-toggle="dropdown">
                                <div className="avatar avatar-online">
                                    <img
                                        src={PF + profile.profile}
                                        className="w-px-40 h-auto rounded-circle"
                                    />
                                </div>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <a className="dropdown-item" href="/">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 me-3">
                                                <div className="avatar avatar-online">
                                                    <img
                                                        src={PF + profile.profile} alt="true"
                                                        className="w-px-40 h-auto rounded-circle"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">

                                                <span
                                                    className="fw-semibold d-block">{profile.first_name} {profile.last_name}</span>
                                                <small className="text-muted">{profile.role}</small>
                                            </div>
                                        </div>
                                    </a>
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
                                    <a className="dropdown-item" href="/">
                                        <i className="bx bx-cog me-2"></i>
                                        <span className="align-middle">Settings</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/">
                                        <span className="d-flex align-items-center align-middle">
                                            <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
                                            <span className="flex-grow-1 align-middle">Billing</span>
                                            <span
                                                className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <div className="dropdown-divider"></div>
                                </li>
                                <li>
                                    <a className="dropdown-item" onClick={logoutHandler}>
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