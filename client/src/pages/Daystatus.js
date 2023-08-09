import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';
import Today from "../components/day-status/Today";
import Footer from "../components/footer/footer";
import {useSelector} from "react-redux";
import Home from "./Home";


const DayStatus = () => {
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
                                <Today/>
                                <Footer/>
                            </div>
                        </div>
                        <div className="layout-overlay layout-menu-toggle"></div>
                    </div>
                ) : (
                    <Home/>
                )
            }
        </>
    )
}

export default DayStatus
