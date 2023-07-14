


const Sidebar = () => {
    return (
        <>
            <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
                <div className="app-brand demo">
                    <a href="#" className="app-brand-link">
                        
                    </a>
                </div>
                <div className="menu-inner-shadow"></div>
                <ul className="menu-inner py-1">
                    <li className="menu-item active">
                        <a href="/" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-home-circle"></i>
                            <div data-i18n="Analytics">Dashboard</div>
                        </a>
                    </li>

                    <li className="menu-item">
                        <a href="/employees" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-table"></i>
                            <div data-i18n="Tables">Employees</div>
                        </a>
                    </li>

                    {/*<li className="menu-item">*/}
                    {/*    <a href="/profile" className="menu-link">*/}
                    {/*        <i className="menu-icon tf-icons bx bx-dock-top"></i>*/}
                    {/*        <div data-i18n="Account Settings">Profile</div>*/}
                    {/*    </a>*/}
                    {/*</li>*/}
                    <li className="menu-item">
                        <a href="" className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons bx bx-lock-open-alt"></i>
                            <div data-i18n="Authentications">Authentications</div>
                        </a>
                        <ul className="menu-sub">
                            <li className="menu-item">
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

                    <li className="menu-header small text-uppercase"><span className="menu-header-text">Forms &amp; Tables</span></li>
                    <li className="menu-item">
                        <a href="" className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons bx bx-detail"></i>
                            <div data-i18n="Form Elements">Form Elements</div>
                        </a>
                        <ul className="menu-sub">
                            <li className="menu-item">
                                <a href="forms-basic-inputs.html" className="menu-link">
                                    <div data-i18n="Basic Inputs">Basic Inputs</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="forms-input-groups.html" className="menu-link">
                                    <div data-i18n="Input groups">Input groups</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-item">
                        <a href="" className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons bx bx-detail"></i>
                            <div data-i18n="Form Layouts">Form Layouts</div>
                        </a>
                        <ul className="menu-sub">
                            <li className="menu-item">
                                <a href="form-layouts-vertical.html" className="menu-link">
                                    <div data-i18n="Vertical Form">Vertical Form</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="form-layouts-horizontal.html" className="menu-link">
                                    <div data-i18n="Horizontal Form">Horizontal Form</div>
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