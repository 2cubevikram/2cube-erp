import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addUserProfile, updateUserProfile} from "../../redux/actions/profileAction";
import moment from "moment";

const Account = ({profile}) => {
    console.log(profile);
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);

    console.log("from porps",profile.first_name)

    const [firstName, setFirstName] = useState(profile.first_name || "");
    const [lastName, setLastName] = useState(profile.last_name || "");
    const [birthDate, setBirthDate] = useState(profile.birth_date || "");
    const [isLoading, setIsLoading] = useState(true);

    console.log(firstName)

    const user = useSelector((state) => state.login.user);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const updateState = () => {
        setFirstName(profile.first_name);
        setLastName(profile.last_name);
        setBirthDate(moment(profile.birth_date).format('YYYY-MM-DD'));
    }

    useEffect(() => {
        updateState();
        if (profile.first_name !== undefined) {
            setIsLoading(false);
        }
    }, [profile]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const obj = {
            first_name: firstName,
            last_name: lastName,
            birth_date: birthDate,
            file: file,
        };
        if(file !== null) {
            dispatch(addUserProfile({obj, user}));
            alert("Profile Added Successfully")
        } else {
            const params = {
                first_name: obj.first_name,
                last_name: obj.last_name,
                birth_date: obj.birth_date,
            }
            dispatch(updateUserProfile({params, user}));
            alert("Profile Updated Successfully")
        }
    };

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className=" flex-grow-1 container-p-y">
                    <div className="card">
                        <h5 className="card-header">Profile Details</h5>
                        <div className="card-body">
                            <div className="d-flex align-items-start align-items-sm-center gap-4">
                                <img
                                    src={profile.profile ? PF + profile.profile : PF + "avatar.png"}
                                    alt="user-avatar"
                                    className="d-block rounded"
                                    height="100"
                                    width="100"
                                    id="uploadedAvatar"
                                />
                                {profile.id === user.id ?
                                    <div className="button-wrapper">
                                        <label htmlFor="upload" className="btn btn-primary me-2 mb-4" tabIndex="0">
                                            <span className="d-none d-sm-block">Upload photo</span>
                                            <i className="bx bx-upload d-block d-sm-none"></i>
                                            <input
                                                type="file"
                                                id="upload"
                                                className="account-file-input"
                                                hidden
                                                accept="image/png, image/jpeg"
                                                onChange={(e) => setFile(e.target.files)}
                                                required
                                            />
                                        </label>
                                        <p className="text-muted mb-0">Allowed JPG, GIF or PNG. Max size of 800K</p>
                                    </div>
                                    : ""
                                }
                            </div>
                        </div>
                        <hr className="my-0"/>
                        <div className="card-body">
                            <form id="formAccountSettings" onSubmit={submitHandler}>
                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="firstName" className="form-label">First Name</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="firstName"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            readOnly={user.id !== profile.id}
                                            autoFocus
                                        />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="lastName" className="form-label">Last Name</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="lastName"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            readOnly={user.id !== profile.id}
                                        />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="email" className="form-label">E-mail</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="email"
                                            name="email"
                                            value={profile.email}
                                            readOnly
                                            placeholder="john.doe@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="organization" className="form-label">Birth date</label>
                                        <input
                                            className="form-control"
                                            // type="text"
                                            type="date"
                                            id="birth_date"
                                            name="birthDate"
                                            value={moment(birthDate).format('YYYY-MM-DD')}
                                            onChange={(e) => setBirthDate(e.target.value)}
                                            readOnly={user.id !== profile.id}
                                            required
                                        />
                                    </div>
                                    {/*<div className="mb-3 col-md-6">*/}
                                    {/*    <label className="form-label" htmlFor="phoneNumber">Phone Number</label>*/}
                                    {/*    <div className="input-group input-group-merge">*/}
                                    {/*        <span className="input-group-text">US (+1)</span>*/}
                                    {/*        <input*/}
                                    {/*            type="text"*/}
                                    {/*            id="phoneNumber"*/}
                                    {/*            name="phoneNumber"*/}
                                    {/*            className="form-control"*/}
                                    {/*            placeholder="202 555 0111"*/}
                                    {/*        />*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    {/*<div className="mb-3 col-md-6">*/}
                                    {/*    <label htmlFor="address" className="form-label">Address</label>*/}
                                    {/*    <input type="text" className="form-control" id="address" name="address"*/}
                                    {/*           placeholder="Address"/>*/}
                                    {/*</div>*/}
                                    {/*<div className="mb-3 col-md-6">*/}
                                    {/*    <label htmlFor="state" className="form-label">State</label>*/}
                                    {/*    <input className="form-control" type="text" id="state" name="state"*/}
                                    {/*           placeholder="California"/>*/}
                                    {/*</div>*/}
                                    {/*<div className="mb-3 col-md-6">*/}
                                    {/*    <label htmlFor="zipCode" className="form-label">Zip Code</label>*/}
                                    {/*    <input*/}
                                    {/*        type="text"*/}
                                    {/*        className="form-control"*/}
                                    {/*        id="zipCode"*/}
                                    {/*        name="zipCode"*/}
                                    {/*        placeholder="231465"*/}
                                    {/*        maxLength="6"*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                </div>
                                {user.id === profile.id ?
                                    <div className="mt-2">
                                        <button type="submit" className="btn btn-primary me-2">Save changes</button>
                                        <button type="reset" className="btn btn-outline-secondary">Cancel</button>
                                    </div> : ""
                                }
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {/*<div className="card">*/}
            {/*    <h5 className="card-header">Delete Account</h5>*/}
            {/*    <div className="card-body">*/}
            {/*        <div className="mb-3 col-12 mb-0">*/}
            {/*            <div className="alert alert-warning">*/}
            {/*                <h6 className="alert-heading fw-bold mb-1">Are you sure you want to delete your*/}
            {/*                    account?</h6>*/}
            {/*                <p className="mb-0">Once you delete your account, there is no going back. Please be*/}
            {/*                    certain.</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <form id="formAccountDeactivation">*/}
            {/*            <div className="form-check mb-3">*/}
            {/*                <input*/}
            {/*                    className="form-check-input"*/}
            {/*                    type="checkbox"*/}
            {/*                    name="accountActivation"*/}
            {/*                    id="accountActivation"*/}
            {/*                />*/}
            {/*                <label className="form-check-label" htmlFor="accountActivation"*/}
            {/*                >I confirm my account deactivation</label*/}
            {/*                >*/}
            {/*            </div>*/}
            {/*            <button type="submit" className="btn btn-danger deactivate-account">Deactivate Account</button>*/}
            {/*        </form>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </>
    )
}

export default Account