import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateSalary} from "../redux/actions/salaryActions";

const AddSalaryForm = ({data = null, date = null, type = null, formClose = null}) => {
    console.log(data)
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login.user);

    const [amount, setAmount] = useState(data.amount);
    const [ExtraAllowance, setExtraAllowance] = useState(data.extra_allowance);
    const [status, setStatus] = useState("");
    const submitHandler = async (e) => {
        e.preventDefault();
        if (type === "UPDATE") {
            const obj = {
                id: data.id,
                amount: amount,
                extra_allowance: ExtraAllowance,
                status: status
            }
            try {
                await dispatch(updateSalary({user, obj}));
                formClose({id: null, state: false})
            } catch (error) {
                console.log(error)
                alert(error);
            }
        }
    };

    const handleFormClose = (event) => {
        formClose({id: null, state: false})
    };

    useEffect(() => {
        if (data) {
            setAmount(data.amount);
            setExtraAllowance(data.extra_allowance);
            setStatus(data.status);
        }
    }, [data])


    return (
        <div className=" flex-grow-1 container-p-y">
            <div className="card">
                {
                    type === "ADD" ? (
                        <>
                            <h5 className="card-header">Add Salary Form</h5>
                            <hr className="my-0"/>
                        </>
                    ) : (
                        <>
                            <h5 className="card-header">Update Salary Form</h5>
                            <hr className="my-0"/>
                        </>
                    )
                }
                <div className="card-body">
                    <form id="formAccountSettings" onSubmit={submitHandler}>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label htmlFor="leaveType" className="form-label">Amount</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={parseFloat(amount).toFixed(2)}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="organization" className="form-label">Extra Allowance</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    id="ExtraAllowance"
                                    name="ExtraAllowance"
                                    value={ExtraAllowance}
                                    onChange={(e) => setExtraAllowance(e.target.value)}
                                />
                            </div>

                            <div className="mb-3 col-md-12">
                                <label htmlFor="leaveType" className="form-label">Status</label>
                                <select className="form-select placement-dropdown" id="selectPlacement"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}>
                                    <option value="" disabled>Select Type</option>
                                    <option value="CREDIT">CREDIT</option>
                                    <option value="">Pending</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-2">
                            <button type="submit" className="btn btn-primary me-2">Submit</button>
                            {
                                formClose ? (
                                    <button
                                        type="reset"
                                        className="btn btn-outline-secondary"
                                        onClick={handleFormClose}>Cancel</button>
                                ) : ""
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddSalaryForm;