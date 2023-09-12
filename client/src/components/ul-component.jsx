import { Link } from "react-router-dom";
import React from "react";
import { UserProfile } from "./general-component";
import moment from "moment";

export const EmployeeList = ({ employees, active_tab = 1 }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    // get difference between joining month and current month
    const getStay = Object.values(employees).map((item) => {
        let join_date = moment(item.join_date);
        let current_date = moment();
        let months = current_date.diff(join_date, 'months');
        return months;
    });

    return (
        <table className="table">
            <thead>
            <tr>
                <th>Emp. Name</th>
                <th>Join Date</th>
                <th>Increment Date</th>
                <th>Stay</th>
            </tr>
            </thead>
            <tbody className="table-border-bottom-0">
            {Object.values(employees).map((item, index) => (
                <React.Fragment key={item.id}>
                    <tr className="table-default" key={item.id}>
                        <td>
                            <Link
                                to={`/employees/profile`}
                                state={{ id: item.id }}
                                onClick={() => localStorage.setItem("account_tab", active_tab)}
                                className=""
                            >
                                <UserProfile
                                    profile={item.profile ? PF + item.profile : PF + "avatar.png"}
                                    name={`${item.first_name} ${item.last_name}`}
                                />
                            </Link>
                        </td>
                        <td>{moment(item.join_date).format('DD-MM-YYYY')}</td>
                        <td>{moment(item.increment_date).format('DD-MM-YYYY')}</td>
                        <td>{getStay[index]} Months</td>
                        <td><span className="badge bg-label-primary me-1">{item.status}</span></td>
                    </tr>
                </React.Fragment>
            ))}
            </tbody>
        </table>
    );
};
