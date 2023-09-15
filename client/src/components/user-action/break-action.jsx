import React from 'react';
import {connect, useSelector} from "react-redux";
import {BreakIn, BreakOut} from "../../redux/actions/breakAction";

const BreakAction = ({BreakIn, BreakOut, check_status, break_status}) => {

    const user = useSelector(state => state.login.user);
    const breakState = useSelector(state => state.break);

    const breakinHandler = e => {
        e.preventDefault();
        BreakIn(user);
    };

    function breakoutHandler(e) {
        e.preventDefault();
        const lastBreakData = breakState.break[breakState.break.length - 1];
        BreakOut({user, lastBreakData});
    }

    return (
        <>
            {check_status !== "CHECK_OUT" && check_status !== null ? (
                <>
                    {
                        break_status === "BREAK_OUT" ? (
                            <span className="btn btn-primary"
                                    onClick={e => breakinHandler(e)}>Break In </span>
                        ) : (
                            <span className="btn-danger btn"
                                    onClick={e => breakoutHandler(e)}> Break Out </span>
                        )
                    }
                </>
            ) : ""
            }

        </>
    )
}

export default connect(null, {BreakIn, BreakOut})(BreakAction);