import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';
import ProfileComp from '../components/profile/profile';
import Footer from "../components/footer/footer";

const Profile = () => {
    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Sidebar />
                    <div className="layout-page">
                        <Navbar />
                        <ProfileComp />
                        <Footer/>
                    </div>
                </div>
                <div className="layout-overlay layout-menu-toggle"></div>
            </div>
        </>
    )
}

export default Profile;
