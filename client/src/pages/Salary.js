import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import SalaryPage from '../components/salary/salary';
import Navbar from '../components/navbar/navbar';
import Footer from "../components/footer/footer";


const Salary = () => {
    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Sidebar />
                    <div className="layout-page">
                        <Navbar />
                        <SalaryPage />
                        <Footer/>
                    </div>
                </div>
                <div className="layout-overlay layout-menu-toggle"></div>
            </div>
        </>
    )
}

export default Salary;