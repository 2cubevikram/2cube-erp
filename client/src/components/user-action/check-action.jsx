import React from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
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
                    <button className="btn btn-sm btn-outline-primary"
                            onClick={e => checkinHandler(e)}>Check In </button>
                ) : (
                    break_status !== "BREAK_IN" ? (
                        <button className="btn btn-sm btn-outline-primary"
                                onClick={e => checkoutHandler(e)}>Check Out </button>
                    ) : ""
                )
            }
        </>
    )
}

export default connect(null, {CheckIn, CheckOut})(CheckAction);