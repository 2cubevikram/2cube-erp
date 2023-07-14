import {useEffect, useState} from "react";
import {useNavigate, useParams , useLocation} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import Account from "./Account";
import Attendance from "./Attendance";
import {getProfile} from "../../redux/actions/profileAction";

const Profile = ({getProfile}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const id = location.state.id;
    const user = useSelector((state) => state.login.user);
    const profile = useSelector((state) => state.user.profile);
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
        localStorage.setItem("account_tab", tabNumber);
    };

    useEffect(() => {

        if (localStorage.getItem("account_tab")){
            setActiveTab(parseInt(localStorage.getItem("account_tab")));
        }

        if (id === undefined){
            navigate('/employees');
        }else{
            getProfile({ user, id });
        }
    }, [getProfile, id, user]);

    if (!profile) {
        return null;
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4"><span
                    className="text-muted fw-light">Account Settings /</span> Account</h4>
                <div className="row">
                    <div className="col-md-12">
                        <ul className="nav nav-pills flex-column flex-md-row mb-3">
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === 1 ? 'active' : ''}`}
                                   onClick={() => handleTabClick(1)}>
                                    <i className="bx bx-user me-1"></i> Account
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === 2 ? 'active' : ''}`}
                                   onClick={() => handleTabClick(2)}>
                                    <i className="bx bx-bell me-1"></i> Attendance
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="pages-account-settings-connections.html"
                                ><i className="bx bx-link-alt me-1"></i> Connections</a
                                >
                            </li>
                        </ul>
                    </div>
                    {activeTab === 1 && <Account profile={profile}/>}
                    {activeTab === 2 && <Attendance/>}
                </div>
            </div>
        </>
    )
}

export default connect(null, {getProfile})(Profile);