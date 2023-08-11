import {useSelector} from "react-redux";
import {Link,useLocation } from "react-router-dom";
import React from "react";


const Sidebar = ({to}) => {
    const user = useSelector((state) => state.login.user);
    const location = useLocation();
    const currentPath = location.pathname;
    const liClassName = "menu-item"

    return (
        <>
            <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
                <div className="app-brand demo">
                    <Link to={`/`}  className="app-brand-link">
                        <p>2CUBE STUDIO</p>
                    </Link>
                </div>
                <div className="menu-inner-shadow"></div>
                <ul className="menu-inner py-1">
                    <li className={` menu-item ${currentPath === '/' && "active"} `}>
                        <Link to={'/'} className="menu-link">
                            <i className="menu-icon tf-icons bx bx-home-circle"></i>
                            <div data-i18n="Analytics">Dashboard</div>
                        </Link>
                    </li>
                    {
                        user && (user.role === "Admin" || user.role === "HR") ? (
                            <li className={` menu-item ${currentPath === '/profile' && "active"} `}>
                                <Link to={"/profile"}
                                      state={{id: user.id}}
                                      className="menu-link"><i
                                    className="menu-icon tf-icons bx bx-lock-open-alt"></i>Profile</Link>
                            </li>
                        ) : ""
                    }
                    {
                        user && (user.role === "Admin" || user.role === "HR") ? (
                            <li className={` menu-item ${currentPath === '/employees' && "active"} `}>
                                <Link className="menu-link" to={"/employees"}>
                                    <i className="menu-icon tf-icons bx bxs-group"></i>
                                    <div data-i18n="Tables">Employees</div>
                                </Link>

                            </li>
                        ) : (
                            <li className={` menu-item ${currentPath === '/profile' && "active"} `}>
                                <Link to={"/profile"}
                                      state={{id: user.id}}
                                      className="menu-link"><i
                                    className="menu-icon tf-icons bx bx-lock-open-alt"></i>Profile</Link>
                            </li>)
                    }
                    {
                        user && (user.role === "Admin" || user.role === "HR") ? (
                            <li className={` menu-item ${currentPath === '/to-day' && "active"} `}>
                                <Link to={"/to-day"}
                                      // state={{id: user.id}}
                                      className="menu-link"><i
                                    className="menu-icon tf-icons bx bx-table"></i>To Day</Link>
                            </li>
                        ) : ""
                    }
                    {
                        user && (user.role === "Admin" || user.role === "HR") ? (
                            <li className={` menu-item ${currentPath === '/leave-app' && "active"} `}>
                                <Link to={"/leave-app"}
                                    // state={{id: user.id}}
                                      className="menu-link"><i
                                    className="menu-icon tf-icons bx bx-run"></i>Leave Application</Link>
                            </li>
                        ) : ""
                    }

                    {
                        user && (user.role === "Admin" || user.role === "HR") ? (
                            <li className={` menu-item ${currentPath === '/holiday' && "active"} `}>
                                <Link to={"/holiday"}
                                    // state={{id: user.id}}
                                      className="menu-link"><i
                                    className="menu-icon tf-icons bx bxs-caret-right-circle"></i>Holiday's</Link>
                            </li>
                        ) : ""
                    }

                    <li className="menu-item">
                        {/*<a href="" className="menu-link menu-toggle">*/}
                        {/*    <i className="menu-icon tf-icons bx bx-lock-open-alt"></i>*/}
                        {/*    <div data-i18n="Authentications">Authentications</div>*/}
                        {/*</a>*/}
                        <ul className="menu-sub">
                            <li className={liClassName}>
                                <a href="auth-login-basic.html" className="menu-link" target="_blank">
                                    <div data-i18n="Basic">Login</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="auth-register-basic.html" className="menu-link" target="_blank">
                                    <div data-i18n="Basic">Register</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="auth-forgot-password-basic.html" className="menu-link" target="_blank">
                                    <div data-i18n="Basic">Forgot Password</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </aside>
        </>
    )
}

export default Sidebar;