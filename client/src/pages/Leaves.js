import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';
import LeaveManag from '../components/leave-manag/LeaveManag';
import Footer from "../components/footer/footer";
import {useSelector} from "react-redux";
import Profile from "./profile";

const Leaves = () => {
    const user = useSelector((state) => state.login.user);
    return (
        <>
            {
                user.role === "Admin" || user.role === "HR" ? (
                    <div className="layout-wrapper layout-content-navbar">
                        <div className="layout-container">
                            <Sidebar/>
                            <div className="layout-page">
                                <Navbar/>
                                <LeaveManag/>
                                <Footer/>
                            </div>
                        </div>
                        <div className="layout-overlay layout-menu-toggle"></div>
                    </div>
                ) : (
                    <Profile/>
                )
            }
        </>
    )
}

export default Leaves;
