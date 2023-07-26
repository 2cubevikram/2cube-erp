import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
import {getUser} from "../../redux/reducers/authReducer";
import {useDispatch} from 'react-redux';
import {logoutUser} from "../../redux/actions/authActions";
import React from "react";

const Navbar = () => {
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    // const [main, setMainProfile] = useState(user);
    // const [profile, setUserProfile] = useState(user);
    // const mainProfile1 = useSelector((state) => state.user.profile);
    // const userProfile = useSelector((state) => state.user.profile);
    //
    //
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    //
    // useEffect(() => {
    //     if (userProfile !== null) {
    //         setUserProfile(userProfile);
    //     } else {
    //         setUserProfile(user);
    //     }
    // }, [userProfile, user]);
    //
    //
    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(logoutUser());
    };
    //
    // useEffect(() => {
    //     dispatch(getProfile({user, id: user.id}));
    // }, [dispatch, user])
    //
    // console.log('userProfile', mainProfile1)
    // console.log('user', user)


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

                    </div>
                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                        <li className="nav-item navbar-dropdown dropdown-user dropdown">
                            <Link to={`/`} className="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                <div className="avatar avatar-online">
                                    <img
                                        src={PF + user.profile}
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
                                                        src={PF + user.profile} alt="true"
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