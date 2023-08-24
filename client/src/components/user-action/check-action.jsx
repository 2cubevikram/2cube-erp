import React from 'react';
import {connect, useSelector} from "react-redux";
import {CheckIn, CheckOut} from "../../redux/actions/checkAction";

const CheckAction = ({CheckIn, CheckOut, check_status, break_status}) => {

    const user = useSelector(state => state.login.user);
    const day = useSelector(state => state.check.day);

    const checkinHandler = e => {
        e.preventDefault();
        CheckIn(user);
    };

    function checkoutHandler(e) {
        e.preventDefault();
        CheckOut({user, day});
    }

    return (
        <>
            {
                check_status === "CHECK_OUT" || check_status == null ? (
                    <span className="btn btn-primary"
                            onClick={e => checkinHandler(e)}>Check In </span>
                ) : (
                    break_status !== "BREAK_IN" ? (
                        <span className="btn btn-danger"
                                onClick={e => checkoutHandler(e)}>Check Out </span>
                    ) : ""
                )
            }
        </>
    )
}

export default connect(null, {CheckIn, CheckOut})(CheckAction);