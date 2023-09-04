import React, {useState} from "react";
import Current from "./current";
import Previous from "./previous";

const Salary = () => {
    const [activeTab, setActiveTab] = useState(1);
    let currentTab = activeTab === 1 ? "Current" : activeTab === 2 ? "Previous" : "";

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
        localStorage.setItem("salary_tab", tabNumber);
    };

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4"><span
                    className="text-muted fw-light">Salary Details /</span> {currentTab} </h4>
                <div className="row">
                    <div className="col-md-12">
                        <ul className="nav nav-pills flex-column flex-md-row mb-3">
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === 1 ? 'active' : ''}`}
                                        onClick={() => handleTabClick(1)}
                                >
                                    <i className="bx bx-user me-1"></i> Current
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${activeTab === 2 ? 'active' : ''}`}
                                        onClick={() => handleTabClick(2)}>
                                    <i className="bx bx-bell me-1"></i> Previous
                                </button>
                            </li>
                        </ul>
                    </div>
                    {activeTab === 1 && <Current/>}
                    {activeTab === 2 && <Previous/>}
                </div>
            </div>
        </>
    );
}

export default Salary;