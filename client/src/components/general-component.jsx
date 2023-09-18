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


export const UserProfile = ({profile, name , isActive = true , isBold = true}) => {
    return (
        <>
            <div className="avatar avatar_two d-flex align-items-center gap-3">
                <img src={profile} alt="Avatar"
                className="rounded-circle" />
                {
                    isBold ?
                        <strong className={`${!isActive && 'badge bg-label-danger me-1'}`}>{name}</strong> :
                        <span className={`${!isActive && 'badge bg-label-danger me-1'}`}>{name}</span>
                }
                </div>
        </>
    )
}