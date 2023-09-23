import { Link } from "react-router-dom";
import React from "react";
import { UserProfile } from "./general-component";
import moment from "moment";
import {isDateBeforeToday, isThisWeek} from "../function/excerpt";

export const EmployeeList = ({ employees, active_tab = 1 }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const sortedEmployees = Object.values(employees).sort((a, b) => {
        const nameA = `${a.first_name} ${a.last_name}`.toUpperCase();
        const nameB = `${b.first_name} ${b.last_name}`.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    // get difference between joining month and current month
    const getStay = sortedEmployees.map((item) => {
        let join_date = moment(item.join_date);
        let current_date = moment();
        let months = current_date.diff(join_date, 'months');
        return months;
    });

    // Function to check if the date is the current day
    const isCurrentDay = (date) => {
        const currentDate = moment();
        return moment(date).isSame(currentDate, 'day');
    };

    // Function to check if the date is in the current month and is the current day
    const isCurrentMonth = (date) => {
        const currentDate = moment();
        return moment(date).isSame(currentDate, 'month') && moment(date).isSame(currentDate, 'day');
    };

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
            {sortedEmployees.map((item, index) => {
                const isIncrementDateCurrentDay = isCurrentDay(item.increment_date);
                const isIncrementDateCurrentMonth = isCurrentMonth(item.increment_date);
                console.log(isIncrementDateCurrentDay, isIncrementDateCurrentMonth)

                return (
                    <React.Fragment key={item.id}>
                        {/*<tr key={item.id} >*/}
                        <tr
                            key={item.id}
                            className={`${isIncrementDateCurrentDay ? 'bg-label-primary' : ''} ${isIncrementDateCurrentMonth ? '' : ''}`}
                        >
                            <td>
                                <Link
                                    to={`/employees/profile`}
                                    state={{ id: item.id }}
                                    onClick={() => localStorage.setItem("account_tab", active_tab)}
                                    className="td-color"
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
                );
            })}
            </tbody>
        </table>
    );
};
