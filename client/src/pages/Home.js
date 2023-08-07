import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import Dashboard from '../components/dashboard/dashboard';
import Navbar from '../components/navbar/navbar';
import Footer from "../components/footer/footer";


const Home = () => {
    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Sidebar />
                    <div className="layout-page">
                        <Navbar />
                        <Dashboard />
                        <Footer/>
                    </div>
                </div>
                <div className="layout-overlay layout-menu-toggle"></div>
            </div>
        </>
    )
}

export default Home
