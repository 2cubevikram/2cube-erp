import {formatDateTime} from "../function/time";


export const TimeBadge = ({_in=null,_out=null}) => {
    if (!_out){
        return false;
    }
    const CheckinTime = new Date(_in);
    let CheckoutTime = '';

    if (_out) {
        CheckoutTime = new Date(_out);
    } else {
        CheckoutTime = null;
    }

    const differenceTime = formatDateTime.TimeDifference(CheckinTime, CheckoutTime);
    return (
        <>
            <span className="badge bg-label-primary me-1">{differenceTime}</span>
        </>
    )
}