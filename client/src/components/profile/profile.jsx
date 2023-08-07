import {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Account from "./Account";
import Attendance from "./Attendance";
import {getProfile} from "../../redux/actions/profileAction";
import Leave from "./Leave";

const Profile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const id = location.state ? location.state.id : 0 || 0;
    useEffect(() => {
        if (id === 0) {
            navigate('/');
        }
    })
    const user = useSelector((state) => state.login.user);
    const profile = useSelector((state) => state.user.profile);
    const [activeTab, setActiveTab] = useState(1);
    let currentTab;
    currentTab = activeTab === 1 ? "Account" : activeTab === 2 ? "Attendance" : activeTab === 3 ? "Leave" : "";


    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
        localStorage.setItem("account_tab", tabNumber);
    };

    useEffect(() => {
        if (localStorage.getItem("account_tab")) {
            setActiveTab(parseInt(localStorage.getItem("account_tab")));
        }

        if (id === undefined) {
            navigate('/');
        } else {
            dispatch(getProfile({user, id}));
        }
        // eslint-disable-next-line
    }, [getProfile, id, user, navigate]);

    if (!profile) {
        return null;
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4"><span
                    className="text-muted fw-light">Account Settings /</span> {currentTab} <span
                    className="text-muted fw-light"> Of {profile.first_name} {profile.last_name}</span></h4>
                <div className="row">
                    <div className="col-md-12">
                        <ul className="nav nav-pills flex-column flex-md-row mb-3">
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 1 ? 'active' : ''}`}
                                    onClick={() => handleTabClick(1)}
                                >
                                    <i className="bx bx-user me-1"></i> Account
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 2 ? 'active' : ''}`}
                                    onClick={() => handleTabClick(2)}>
                                    <i className="bx bx-bell me-1"></i> Attendance
                                </button>
                            </li>
                            {
                                user.id === profile.id ?
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${activeTab === 3 ? 'active' : ''}`}
                                            onClick={() => handleTabClick(3)}>
                                            <i className="bx bx-link-alt me-1"></i> Leave
                                        </button>
                                    </li> : ""
                            }
                        </ul>
                    </div>
                    {activeTab === 1 && <Account profile={profile}/>}
                    {activeTab === 2 && <Attendance/>}
                    {activeTab === 3 && <Leave/>}
                </div>
            </div>
        </>
    )
}

export default Profile;