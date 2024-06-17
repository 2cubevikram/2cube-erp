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
                        <div className="brand_logo"><svg xmlns="http://www.w3.org/2000/svg" width="120" height="50" viewBox="0 0 131 50" fill="none">
                            <path d="M26.2888 22.0022C31.8974 18.7957 37.7567 15.4412 43.3653 12.2293C41.462 11.1411 38.8602 9.65142 36.9569 8.56319C35.8907 9.1707 33.7528 10.3963 32.6865 11.0038L34.8244 12.2241C30.6659 14.6013 26.1716 17.1739 22.0131 19.5511C20.9469 18.9436 18.8036 17.718 17.7374 17.1052C23.346 13.8987 29.2051 10.5442 34.819 7.33232C30.6552 4.94985 26.1609 2.37719 21.9971 0C14.949 4.03066 7.69834 8.18283 0.650257 12.2135C2.55356 13.3017 5.15528 14.7914 7.05858 15.8797C8.12486 15.2721 10.2627 14.0466 11.329 13.4391L9.19114 12.2188C13.3496 9.84158 17.844 7.26894 22.0025 4.89174C23.0687 5.49925 25.212 6.73011 26.2782 7.33761C20.6696 10.5442 14.8104 13.8987 9.19647 17.1105C13.3603 19.493 17.8547 22.0657 22.0185 24.4428C23.0847 23.8353 25.2226 22.6097 26.2888 22.0022Z" fill="#FF8E24"/>
                            <path d="M17.0818 23.106C11.4731 19.8995 5.61394 16.545 0 13.3384V37.7865C2.67635 39.3185 5.86453 41.141 8.54088 42.673C11.2172 44.2049 14.4054 46.0274 17.0818 47.5594C18.148 48.1669 20.2859 49.3925 21.3522 50V42.6677C20.2859 42.0602 18.148 40.8346 17.0818 40.2271V42.673C12.9233 40.2958 8.42891 37.7231 4.27044 35.3459V20.676C8.42891 23.0532 12.9233 25.6259 17.0818 28.0031V30.4489C18.148 31.0564 20.2859 32.282 21.3522 32.8895V25.5572C20.2859 24.9497 18.148 23.7241 17.0818 23.1166V23.106Z" fill="#FF8E24"/>
                            <path d="M41.8728 14.5587C35.5444 18.1826 28.9922 21.928 22.6585 25.5519V40.2218C28.2671 37.0152 34.1263 33.6607 39.7349 30.4542V35.3459C35.5764 37.7231 31.0821 40.2957 26.9236 42.6729V40.2271C25.8573 40.8346 23.7194 42.0602 22.6531 42.6677V50L24.7857 48.7797C27.462 47.2477 30.6502 45.4252 33.3266 43.8932C34.3928 43.2857 36.5307 42.0601 37.597 41.4526C39.5003 40.3644 42.102 38.8747 44 37.7865V23.1166C38.3914 26.3284 32.5322 29.6776 26.9182 32.8895V27.9977C31.0767 25.6205 35.5711 23.0479 39.7296 20.6707V23.1166C40.7958 22.5091 42.9337 21.2835 44 20.676V13.3437L41.8674 14.564L41.8728 14.5587Z" fill="#FF8E24"/>
                            <path d="M61.3656 20.8415C64.5854 18.2189 68.0107 15.6118 68.0107 13.088C68.0107 12.0004 67.5101 11.3032 66.435 11.3032C65.36 11.3032 64.7541 12.1254 64.7541 13.5408H61.3288C61.4341 9.9086 63.8213 8.35268 66.5826 8.35268C70.029 8.35268 71.5677 10.3405 71.5677 12.8643C71.5677 16.1478 68.5956 18.7705 66.1874 20.597H71.7943V23.4486H61.3709V20.8467L61.3656 20.8415Z" fill="#282929"/>
                            <path d="M81.464 9.09194C84.9314 9.09194 87.5505 11.0173 88.3778 14.1343H84.473C83.8722 12.9062 82.7708 12.287 81.4218 12.287C79.2401 12.287 77.7436 13.8846 77.7436 16.4292C77.7436 18.9738 79.2401 20.5713 81.4218 20.5713C82.7708 20.5713 83.8722 19.9572 84.473 18.724H88.3778C87.5452 21.841 84.9314 23.7455 81.464 23.7455C77.1639 23.7455 74.1338 20.7326 74.1338 16.4239C74.1338 12.1153 77.1639 9.08155 81.464 9.08155V9.09194Z" fill="#282929"/>
                            <path d="M91.5347 9.25841H95.0865V17.8705C95.0865 19.5721 95.9402 20.5556 97.6212 20.5556C99.3023 20.5556 100.198 19.5721 100.198 17.8705V9.25841H103.75V17.8497C103.75 21.8253 100.925 23.7975 97.5632 23.7975C94.2012 23.7975 91.54 21.8305 91.54 17.8497V9.25841H91.5347Z" fill="#282929"/>
                            <path d="M114.068 23.6518H107.275V9.25841H113.836C116.808 9.25841 118.568 10.7155 118.568 12.9895C118.568 14.7327 117.509 15.8619 116.097 16.273C117.799 16.6216 118.9 18.0995 118.9 19.7386C118.9 22.1167 117.135 23.657 114.063 23.657L114.068 23.6518ZM113.156 12.0684H110.832V15.0813H113.156C114.321 15.0813 114.964 14.5662 114.964 13.5827C114.964 12.5992 114.321 12.0632 113.156 12.0632V12.0684ZM113.404 17.6467H110.827V20.8262H113.446C114.632 20.8262 115.317 20.2954 115.317 19.2703C115.317 18.2452 114.59 17.652 113.404 17.652V17.6467Z" fill="#282929"/>
                            <path d="M130.931 12.0684H125.551V14.9824H130.304V17.6884H125.551V20.847H130.931V23.657H122.004V9.26359H130.931V12.0736V12.0684Z" fill="#282929"/>
                            <path d="M64.0215 36.5523C62.3773 36.5523 61.1125 35.6676 61.1125 34.2314H62.5564C62.6144 34.8975 63.0887 35.4335 64.0215 35.4335C64.9543 35.4335 65.497 34.9339 65.497 34.2418C65.497 32.2799 61.1388 33.5549 61.1388 30.5678C61.1388 29.142 62.2824 28.2573 63.9635 28.2573C65.534 28.2573 66.6459 29.0743 66.7618 30.4638H65.2757C65.2283 29.9173 64.7435 29.4126 63.895 29.3918C63.1151 29.3709 62.5143 29.7404 62.5143 30.521C62.5143 32.3528 66.862 31.2079 66.862 34.1741C66.862 35.3866 65.8554 36.5523 64.0268 36.5523H64.0215Z" fill="#FF8E24"/>
                            <path d="M79.4149 28.3609V29.4433H77.2279V36.4686H75.8788V29.4433H73.6813V28.3609H79.4149Z" fill="#FF8E24"/>
                            <path d="M86.4237 28.3609H87.7728V33.5284C87.7728 34.7877 88.4948 35.3809 89.6278 35.3809C90.7608 35.3809 91.4933 34.7877 91.4933 33.5284V28.3609H92.8424V33.5076C92.8424 35.5735 91.3299 36.5518 89.6172 36.5518C87.9045 36.5518 86.4289 35.5735 86.4289 33.5076V28.3609H86.4237Z" fill="#FF8E24"/>
                            <path d="M107.286 32.4408C107.286 34.9386 105.563 36.4634 102.928 36.4634H100.245V28.3557H102.928C105.563 28.3557 107.286 29.9325 107.286 32.4408ZM102.928 35.381C104.867 35.381 105.905 34.2829 105.905 32.4408C105.905 30.5986 104.867 29.4434 102.928 29.4434H101.594V35.381H102.928Z" fill="#FF8E24"/>
                            <path d="M114.279 28.3609H115.628V36.4686H114.279V28.3609Z" fill="#FF8E24"/>
                            <path d="M126.805 36.5523C124.492 36.5523 122.61 34.835 122.61 32.3996C122.61 29.9642 124.486 28.2573 126.805 28.2573C129.124 28.2573 131 29.9746 131 32.3996C131 34.8246 129.145 36.5523 126.805 36.5523ZM126.805 35.3971C128.434 35.3971 129.619 34.2314 129.619 32.3996C129.619 30.5678 128.439 29.423 126.805 29.423C125.172 29.423 123.991 30.5678 123.991 32.3996C123.991 34.2314 125.172 35.3971 126.805 35.3971Z" fill="#FF8E24"/>
                            <path d="M52.1804 7H51V42H52.1804V7Z" fill="#FF8E24"/>
                            </svg>
                        </div>
                    </Link>
                    <a href="/#" onClick={(e) => e.preventDefault()} className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none menu_close_icon">
                        <i className="bx bx-chevron-left bx-sm align-middle"></i>
                    </a>
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
                                    className="menu-icon tf-icons bx bx-time"></i>To Day</Link>
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

                    {
                        user && (user.role === "Admin" || user.role === "HR") ? (
                            <li className={` menu-item ${currentPath === '/salary' && "active"} `}>
                                <Link to={"/salary"}
                                    // state={{id: user.id}}
                                      className="menu-link"><i
                                    className="menu-icon tf-icons bx bxs-credit-card"></i>Salary</Link>
                            </li>
                        ) : ""
                    }

                    {
                        user && (user.role === "Admin") ? (
                            <li className={` menu-item ${currentPath === '/report' && "active"} `}>
                                <Link to={"/report"}
                                      className="menu-link"><i
                                    className="menu-icon tf-icons bx bx-time"></i>Time Report</Link>
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