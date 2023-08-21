import {formatDateTime} from "../function/time";


export const TimeBadge = ({_in=null,_out=null}) => {
    console.log(_in,_out)

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

    console.log(_in,_out)
    return (
        <>
            <span className="badge bg-label-primary me-1">{differenceTime}</span>
        </>
    )
}