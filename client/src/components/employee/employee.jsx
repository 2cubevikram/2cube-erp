import React, {useContext, useEffect, useState, Fragment} from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";


const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const {user} = useContext(AuthContext);
    const token = user.token;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/auth/employees`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const employeesArray = Object.values(response.data);
                setEmployees(employeesArray);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [token]);
    // console.log(employees)

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get(`/auth/checkAllAttendance`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const employeesArray = Object.values(response.data);
                setAttendance(employeesArray);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAttendance();
    }, []);
    // console.log(attendance)

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <h5 className="card-header">Employee List</h5>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Emp. Name</th>
                                <th>Email</th>
                                <th>User</th>
                                {/*<th>worked hours</th>*/}
                                {/*<th>remain working hours</th>*/}
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                            {employees.map((item, index) => (
                                <tr className="table-default" key={item.id}>
                                    <td><i className="fab fa-sketch fa-lg text-warning me-3"></i>
                                        <strong> {item.first_name} {item.last_name}</strong></td>
                                    <td>{item.email}</td>
                                    <td>
                                        <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                            <li data-bs-toggle="tooltip" data-popup="tooltip-custom"
                                                data-bs-placement="top" className="avatar avatar-xs pull-up"
                                                title="Lilian Fuller">
                                                <img src="../assets/img/avatars/5.png" alt="true"
                                                     className="rounded-circle"/>
                                            </li>
                                        </ul>
                                    </td>
                                    {attendance.map((item2, index) => {
                                        console.log(item2);
                                        if (item2.employeeId === item.id) {
                                            return (
                                                <React.Fragment key={index}>
                                                    <td>
                                                        <span
                                                            className="badge bg-label-primary me-1">{item2.workingHours}</span>
                                                    </td>
                                                    <td>
                                                        <span
                                                            className="badge bg-label-primary me-1">{item2.minimumWorkingHours}</span>
                                                    </td>
                                                </React.Fragment>
                                            );
                                        }
                                        return null;
                                    })}
                                    {/*attendance value end*/}
                                    <td><span className="badge bg-label-primary me-1">{item.status}</span></td>
                                    <td>
                                        <div className="dropdown">
                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow"
                                                    data-bs-toggle="dropdown">
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <Link to="/" className="dropdown-item"><i
                                                    className="bx bx-edit-alt me-1"></i>Profile</Link>
                                                <a className="dropdown-item" href="/"><i
                                                    className="bx bx-edit-alt me-1"></i> Edit</a>
                                                <a className="dropdown-item" href="/"><i
                                                    className="bx bx-trash me-1"></i> Delete</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Employee