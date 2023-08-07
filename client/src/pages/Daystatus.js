import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';
import Today from "../components/day-status/Today";
import Footer from "../components/footer/footer";


const DayStatus = () => {
    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Sidebar />
                    <div className="layout-page">
                        <Navbar />
                        <Today />
                        <Footer/>
                    </div>
                </div>
                <div className="layout-overlay layout-menu-toggle"></div>
            </div>
        </>
    )
}

export default DayStatus
