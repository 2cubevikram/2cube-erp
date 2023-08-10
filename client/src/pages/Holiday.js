import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';
import Holidays from '../components/holidays/holidays';
import Footer from "../components/footer/footer";
import {useSelector} from "react-redux";
import Profile from "./profile";

const Holiday = () => {
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
                                <Holidays/>
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

export default Holiday;
