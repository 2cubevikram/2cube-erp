import React from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import breakReducer from "../../redux/reducers/breakReducer";
import {BreakIn, BreakOut} from "../../redux/actions/breakAction";

const BreakAction = ({BreakIn, BreakOut, check_status, break_status}) => {

    const user = useSelector(state => state.login.user);
    const breakState = useSelector(state => state.break);

    const dispatch = useDispatch();
    const breakinHandler = e => {
        e.preventDefault();
        BreakIn(user);
    };

    function breakoutHandler(e) {
        e.preventDefault();
        const lastBreakData = breakState.break[breakState.break.length - 1];
        console.log(lastBreakData)
        BreakOut({user, lastBreakData});
    }

    return (
        <>
            {
                check_status !== "CHECK_OUT" ? (
                    <>
                        {
                            break_status === "BREAK_OUT" ? (
                                <button className="btn btn-sm btn-outline-primary"
                                        onClick={e => breakinHandler(e)}>Break In </button>
                            ) : (
                                <button className="btn btn-sm btn-outline-primary"
                                        onClick={e => breakoutHandler(e)}> Break Out </button>
                            )
                        }
                    </>
                ) : ""
            }

        </>
    )
}

export default connect(null, {BreakIn, BreakOut})(BreakAction);