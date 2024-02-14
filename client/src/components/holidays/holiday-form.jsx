import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addHoliday} from "../../redux/actions/holidayActions";

const HolidayForm = ({data = null, type = "APPLIED", formClose = null}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login.user);
    const [label, setLabel] = useState("");
    const [date, setDate] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        const obj = {
            label,
            date
        }
        dispatch(addHoliday({user,obj}));
        setLabel("");
        setDate("");

    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    {
                        type === "APPLIED" ? (
                            <>
                                <h5 className="card-header">Add Holiday</h5>
                                <hr className="my-0"/>
                            </>
                        ) : ""
                    }

                    <div className="card-body">
                        <form id="formAccountSettings" onSubmit={submitHandler}>
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="firstName" className="form-label">
                                        Holiday Date
                                    </label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        id="date"
                                        name="Date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        // required
                                    />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="lastName" className="form-label">
                                        Label
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="label"
                                        name="label"
                                        value={label}
                                        onChange={(e) => setLabel(e.target.value)}
                                        // required
                                    />
                                </div>
                            </div>
                            <div className="mt-2">
                                <button type="submit" className="btn btn-primary me-2">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HolidayForm;