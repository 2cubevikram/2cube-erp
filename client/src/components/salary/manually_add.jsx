import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {manualSalaryAdd} from "../../redux/actions/salaryActions";
import {getAllEmployee} from "../../redux/actions/employeeAction";
import {useNavigate} from "react-router-dom";

const ManuallyAdd = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login.user);
    const loading = useSelector((state) => state.login.loading);
    const allUsers = useSelector((state) => state.login.allUsers);

    const [employeeData, setEmployeeData] = useState([]);
    const [commonCreditDate, setCommonCreditDate] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(manualSalaryAdd({user, obj: employeeData}));
        navigate('/salary');
        localStorage.setItem("salary_tab", 2);
        window.location.reload();
    };

    useEffect(() => {
        dispatch(getAllEmployee({user}));
    }, [user, dispatch]);

    const handleInputChange = (index, field, value) => {
        console.log("test", commonCreditDate); // Ensure this log works
        const updatedData = [...employeeData];
        if (!updatedData[index]) {
            updatedData[index] = {
                employee_id: allUsers[index]?.id,
                employee_name:
                    allUsers[index]?.first_name + " " + allUsers[index]?.last_name,
                leave: "",
                presentDays: "",
                salary: "",
                allowance: "",
                creditDate: commonCreditDate,
                status: "CREDIT",
            };
        }
        updatedData[index][field] = value;
        setEmployeeData(updatedData);
    };

    return (
        <>
            <div className="flex-grow-1 container-p-y">
                <div className="card text-center">
                    <h5 className="card-header">Current Salary Status</h5>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="table-responsive text-nowrap">
                            {allUsers && allUsers.length > 0 ? (
                                <form id="formAccountSettings" onSubmit={submitHandler}>
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th className={`left-align`}>Emp. Name</th>
                                            <th>Credit Date</th>
                                            <th>Leave</th>
                                            <th>Present Days</th>
                                            <th>Salary</th>
                                            <th>Allowance</th>
                                            {/* <th>Status</th> */}
                                        </tr>
                                        </thead>
                                        <tbody className="table-border-bottom-0">
                                        {allUsers.map((item, index) => (
                                            <Fragment key={item.id || index}>
                                                <tr>
                                                    <td className={`left-align`}>
                                                        {`${item.first_name} ${item.last_name}`}
                                                    </td>
                                                    <td>
                                                        <input
                                                            className="form-control"
                                                            type="date"
                                                            value={commonCreditDate}
                                                            onChange={(e) => setCommonCreditDate(e.target.value)}
                                                            required
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            onChange={(e) => handleInputChange(index, "leave", e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            onChange={(e) => handleInputChange(index, "presentDays", e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            onChange={(e) => handleInputChange(index, "salary", e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            onChange={(e) => handleInputChange(index, "allowance", e.target.value)}
                                                        />
                                                    </td>
                                                </tr>
                                            </Fragment>
                                        ))}
                                        </tbody>
                                    </table>

                                    <div className="mt-2">
                                        <button type="submit" className="btn btn-primary me-2">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <table className="table">
                                    <tbody className="table-border-bottom-0">
                                    <tr>
                                        <td colSpan="8">
                                            <div className="container-xxl flex-grow-1 container-p-y">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row g-0">
                                                            <h2 className="m-0 text-center">
                                                                No Data Available
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ManuallyAdd;