import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getToDayStatus} from "../../redux/actions/dayActions";
import {Link} from "react-router-dom";


const Today = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.user);
    const toDayStatus = useSelector(state => state.today)
    const loading = useSelector((state) => state.today.loading);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        dispatch(getToDayStatus({user}));
        // eslint-disable-next-line
    }, [user]);

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <h5 className="card-header">To Day Status</h5>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="table-responsive text-nowrap">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Emp.Name</th>
                                    <th>Profile</th>
                                    <th>Check</th>
                                    <th>Break</th>
                                    <th className={`text-center`}>Actions</th>
                                </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                {toDayStatus.today.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <i className="fab fa-bootstrap fa-lg text-primary me-3"></i>
                                            <strong>{item.first_name} {item.last_name}</strong>
                                        </td>
                                        <td>
                                            <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                <li
                                                    data-bs-toggle="tooltip"
                                                    data-popup="tooltip-custom"
                                                    data-bs-placement="top"
                                                    className="avatar  pull-up"
                                                    title="Lilian Fuller"
                                                >
                                                    <img
                                                        src={item.profile ? PF + item.profile : PF + "avatar.png"}
                                                        alt="Avatar"
                                                        className="rounded-circle"/>
                                                </li>
                                            </ul>
                                        </td>
                                        <td><span className="badge bg-label-warning me-1">{item.check}</span></td>
                                        <td><span className="badge bg-label-warning me-1">{item.break}</span></td>
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

                                                    {/*<a className="dropdown-item" href="/">*/}
                                                    {/*    <i className="bx bx-trash me-1"></i> Delete</a>*/}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Today;