import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addUserProfile} from "../../redux/actions/profileAction";

const Account = ({profile}) => {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const firstName = useRef();
    const lastName = useRef();
    const birth_date = useRef();

    const user = useSelector((state) => state.login.user);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    // console.log(file)
    const submitHandler = async (e) => {
        e.preventDefault();

        const obj = {
            first_name: firstName.current.value,
            last_name: lastName.current.value,
            birth_date: birth_date.current.value,
            file: file
        };
        dispatch(addUserProfile({obj, user}));
        // console.log(updatedUser);

    };
    return (
        <>
            <div className="card mb-4">
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
                        <div className="button-wrapper">
                            <label htmlFor="upload" className="btn btn-primary me-2 mb-4" tabIndex="0">
                                <span className="d-none d-sm-block">Upload new photo</span>
                                <i className="bx bx-upload d-block d-sm-none"></i>
                                {/*<input*/}
                                {/*    type="file"*/}
                                {/*    id="upload"*/}
                                {/*    className="account-file-input"*/}
                                {/*    hidden*/}
                                {/*    accept="image/png, image/jpeg"*/}
                                {/*/>*/}
                                <input
                                    type="file"
                                    id="upload"
                                    className="account-file-input"
                                    hidden
                                    accept="image/png, image/jpeg"
                                    onChange={(e) => setFile(e.target.files)}
                                />
                            </label>
                            <button type="button" className="btn btn-outline-secondary account-image-reset mb-4">
                                <i className="bx bx-reset d-block d-sm-none"></i>
                                <span className="d-none d-sm-block" onClick={() => setFile(null)}>Reset</span>
                            </button>

                            <p className="text-muted mb-0">Allowed JPG, GIF or PNG. Max size of 800K</p>
                        </div>
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
                                    ref={firstName}
                                    defaultValue={profile.first_name}
                                    autoFocus
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="lastName"
                                    ref={lastName}
                                    defaultValue={profile.last_name}/>
                            </div>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="email" className="form-label">E-mail</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="email"
                                    name="email"
                                    defaultValue={profile.email}
                                    readOnly
                                    placeholder="john.doe@example.com"
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="organization" className="form-label">Birth date</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="birth_date"
                                    name="birth_date"
                                    ref={birth_date}
                                    defaultValue={profile.birth_date}
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
                        <div className="mt-2">
                            <button type="submit" className="btn btn-primary me-2">Save changes</button>
                            <button type="reset" className="btn btn-outline-secondary">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
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