import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';
import EmployeeComp from '../components/employee/employee';
import Footer from "../components/footer/footer";


const Employee = () => {
    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Sidebar />
                    <div className="layout-page">
                        <Navbar />
                        <EmployeeComp />
                        <Footer/>
                    </div>
                </div>
                <div className="layout-overlay layout-menu-toggle"></div>
            </div>
        </>
    )
}

export default Employee
