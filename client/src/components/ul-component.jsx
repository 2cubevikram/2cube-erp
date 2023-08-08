import {Link} from "react-router-dom";
import React from "react";


export const EmployeeList = ({employees}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Emp. Name</th>
                <th>Email</th>
                <th>User</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody className="table-border-bottom-0">
            {Object.values(employees).map((item) => (
                <tr className="table-default" key={item.id}>
                    <td><i className="fab fa-sketch fa-lg text-warning me-3"></i>
                        <strong>{`${item.first_name} ${item.last_name}`}</strong></td>
                    <td>{item.email}</td>
                    <td>
                        <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                            <li data-bs-toggle="tooltip" data-popup="tooltip-custom"
                                data-bs-placement="top" className="avatar avatar-xs pull-up"
                                title="Lilian Fuller">
                                <img
                                    src={item.profile ? PF + item.profile : PF + "avatar.png"}
                                    alt="no img"
                                    className="rounded-circle"/>
                            </li>
                        </ul>
                    </td>

                    <td><span className="badge bg-label-primary me-1">{item.status}</span></td>
                    <td>
                        <div className="dropdown">
                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow"
                                    data-bs-toggle="dropdown">
                                <i className="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div className="dropdown-menu">
                                <Link to={`/employees/profile`}
                                      state={{id: item.id}}
                                      className="dropdown-item">
                                    <i className="bx bx-edit-alt me-1"></i>Profile
                                </Link>

                                <a className="dropdown-item" href="/"><i
                                    className="bx bx-trash me-1"></i> Delete</a>
                            </div>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

