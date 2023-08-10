import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';
import LeaveManag from '../components/leave-manag/LeaveManag';
import Footer from "../components/footer/footer";

const Leaves = () => {
    return (
        <>
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
        </>
    )
}

export default Leaves;
