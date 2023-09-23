import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addIncrement,
    addUserProfile,
    updateUserByAdmin,
    updateUserProfile
} from "../../redux/actions/profileAction";
import moment from "moment";
import {userDelete} from "../../redux/actions/authActions";
import {useNavigate} from "react-router-dom";

const Account = ({profile}) => {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(profile.first_name || "");
    const [lastName, setLastName] = useState(profile.last_name || "");
    const [email, setEmail] = useState(profile.email)
    const [birthDate, setBirthDate] = useState(profile.birth_date || "");
    const [accountNo, setAccountNumber] = useState(profile.account_number || "");
    const [extraDetails, setExtraDetails] = useState(profile.extra_details || "");
    const [joinDate, setJoinDate] = useState(profile.join_date || "");
    const [incrementMonth, setIncrementMonth] = useState(profile.increment_date || "");
    const [basicSalary, setBasicSalary] = useState(profile.basic || "");
    const [salaryIncrement, setSalaryIncrement] = useState(profile.amount || "");
    const [isLoading, setIsLoading] = useState(true);
    const [isRemember, isSetRemember] = useState(false);

    const user = useSelector((state) => state.login.user);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const updateState = () => {
        setFirstName(profile.first_name);
        setLastName(profile.last_name);
        setEmail(profile.email)
        setBirthDate(moment(profile.birth_date).format('YYYY-MM-DD'));
        setAccountNumber(profile.account_number);
        setExtraDetails(profile.extra_details);
        setJoinDate(moment(profile.join_date).format('YYYY-MM-DD'));
        setIncrementMonth(profile.increment_date);
        setBasicSalary(profile.basic);
        setSalaryIncrement(profile.amount);
    }

    useEffect(() => {
        updateState();
        if (profile.first_name !== undefined) {
            setIsLoading(false);
        }
        // eslint-disable-next-line
    }, [profile]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const obj = {
            first_name: firstName,
            last_name: lastName,
            birth_date: birthDate,
            file: file,
        };
        if (file !== null) {
            await dispatch(addUserProfile({obj, user}));
            alert("Profile Added Successfully")
        } else {
            if ((user.role === 'Admin' && profile.role === 'Admin') && basicSalary !== profile.basic) {
                const params = {
                    first_name: obj.first_name,
                    last_name: obj.last_name,
                    birth_date: obj.birth_date,
                    basic: basicSalary,
                }
                await dispatch(updateUserProfile({params, user}));
                alert("Your Profile Updated Successfully")

            } else {
                const params = {
                    first_name: obj.first_name,
                    last_name: obj.last_name,
                    birth_date: obj.birth_date,
                }
                await dispatch(updateUserProfile({params, user}));
                alert("Profile Updated Successfully")
            }

        }
    };

    const submitHandler1 = async (e) => {
        e.preventDefault();

        if ((joinDate !== moment(profile.join_date).format('YYYY-MM-DD')) || (birthDate !== moment(profile.birth_date).format('YYYY-MM-DD')) || profile.account_number !== accountNo || profile.extra_details !== extraDetails || profile.basic !== basicSalary) {
            const params = {
                employee_id: profile.id,
                birth_date: birthDate,
                account_number: accountNo,
                join_date: joinDate,
                extra_details: extraDetails,
                basic: basicSalary,
            }
            await dispatch(updateUserByAdmin({params, user}));
            alert("Employee Details Updated Successfully")
        } else if (incrementMonth !== moment(profile.increment_date).format('YYYY-MM-DD') && salaryIncrement !== profile.amount) {
            const params = {
                employee_id: profile.id,
                increment_date: incrementMonth,
                amount: salaryIncrement,
            }
            await dispatch(addIncrement({params, user}));
            alert("Increment Updated Successfully")
        } else {
            alert("No Changes Found")
        }
    }

    const deactivateAccount = async (e) => {
        e.preventDefault();

        if (!isRemember) {
            alert("Please Check I confirm the account deactivation");
            return;
        } else {
            const params = {
                status: 'Deactivate',
                employee_id: profile.id,
            }
            try {
                await dispatch(userDelete({params, user}));
                alert('are you sure you want to deactivate your account ?');
                navigate('/employees');
            } catch (error) {
                alert(error);
            }
        }

    }

    const isUserAdminOrHR = user.role === 'Admin' || user.role === 'HR';
    const isProfileAdminOrHR = profile.role === 'Admin' || profile.role === 'HR';

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="flex-grow-1 container-p-y">
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
                                {/*<form id="formAccountSettings" {profile.role !=='Admin' ? onSubmit={submitHandler} : '' }>*/}
                                {/*<form id="formAccountSettings"*/}
                                {/*      onSubmit={(isUserAdminOrHR || isProfileAdminOrHR || profile.role === 'Admin' || profile.role === 'HR') ? submitHandler2 : submitHandler}>*/}
                                <form id="formAccountSettings"
                                      onSubmit={(user.id === profile.id && user.role !=='Admin') ? submitHandler : submitHandler1}>
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
                                                required
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
                                                required
                                            />
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="email" className="form-label">E-mail</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="email"
                                                name="email"
                                                value={email}
                                                readOnly={!(user.role === 'Admin' || (user.role === 'HR' && profile.role !== 'HR'))}
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
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="state" className="form-label">Account Number</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="state"
                                                name="state"
                                                value={accountNo}
                                                onChange={(e) => setAccountNumber(e.target.value)}
                                                // readOnly={user.id !== profile.id}
                                                readOnly={!(user.role === 'Admin' || (user.role === 'HR' && profile.role !== 'HR'))}
                                                placeholder="Account Number"/>
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor="Details" className="form-label">Extra Details</label>
                                            <textarea
                                                id="Details"
                                                name="Details"
                                                value={extraDetails}
                                                onChange={(e) => setExtraDetails(e.target.value)}
                                                readOnly={!(user.role === 'Admin' || (user.role === 'HR' && profile.role !== 'HR'))}
                                                className="form-control"
                                                rows={3}
                                                cols={1}
                                            />
                                        </div>
                                        {
                                            (user.role === 'Admin' || (user.role === 'HR' && profile.role !== 'HR')) ? (
                                                <div className="mb-3 col-md-6">
                                                    <label className="form-label" htmlFor="phoneNumber">Join
                                                        Date</label>
                                                    <div className="input-group input-group-merge">
                                                        <input
                                                            type="date"
                                                            id="join_date"
                                                            name="join_date"
                                                            value={moment(joinDate).format('YYYY-MM-DD')}
                                                            onChange={(e) => setJoinDate(e.target.value)}
                                                            readOnly={!(user.role === 'Admin' || (user.role === 'HR' && profile.role !== 'HR'))}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                            ) : ""
                                        }
                                        {
                                            (user.role === 'Admin' || (user.role === 'HR' && profile.role !== 'HR')) ? (
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="next-date" className="form-label">Next
                                                        Increment</label>
                                                    <input
                                                        className="form-control"
                                                        type="date"
                                                        id="nextIncrement"
                                                        name="nextIncrement"
                                                        value={moment(incrementMonth).format('YYYY-MM-DD')}
                                                        onChange={(e) => setIncrementMonth(e.target.value)}
                                                        readOnly={!(user.role === 'Admin' || (user.role === 'HR' && profile.role !== 'HR'))}
                                                    />
                                                </div>
                                            ) : ""
                                        }
                                        {
                                            (user.role === 'Admin' || (user.role === 'HR' && profile.role !== 'HR')) ? (
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="firstName" className="form-label">Basic
                                                        Salary</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="basicSalary"
                                                        value={basicSalary}
                                                        onChange={(e) => setBasicSalary(e.target.value)}
                                                        readOnly={!(user.role === 'Admin' || (user.role === 'HR' && profile.role !== 'HR'))}
                                                        autoFocus
                                                        // required
                                                    />
                                                </div>
                                            ) : ""
                                        }

                                        {
                                            (user.role === 'Admin' || (user.role === 'HR' && profile.role !== 'HR')) ? (
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="lastName" className="form-label">Salary
                                                        Increment</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="salaryIncrement"
                                                        value={salaryIncrement}
                                                        onChange={(e) => setSalaryIncrement(e.target.value)}
                                                        readOnly={!(user.role === 'Admin' || (user.role === 'HR' && profile.role !== 'HR'))}
                                                    />
                                                </div>
                                            ) : ""
                                        }
                                    </div>

                                    <div className="mt-2">
                                        {user.id === profile.id ? (
                                            <>
                                                <button type="submit" className="btn btn-primary me-2">
                                                    Save changes
                                                </button>
                                                <button type="reset" className="btn btn-outline-secondary">
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            isUserAdminOrHR || isProfileAdminOrHR ? (
                                                <>
                                                    <button type="submit" className="btn btn-primary me-2">
                                                        Update
                                                    </button>
                                                    <button type="reset" className="btn btn-outline-secondary">
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : null
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {
                (user.role === "Admin" || user.role === "HR" || profile.role === "Admin" || profile.role === "HR") ? (
                    <div className="card">
                        <h5 className="card-header">Delete Account</h5>
                        <div className="card-body">
                            <div className="mb-3 col-12 mb-0">
                                <div className="alert alert-warning">
                                    <h6 className="alert-heading fw-bold mb-1">Are you sure you want to delete your
                                        account?</h6>
                                    <p className="mb-0">Once you delete your account, there is no going back. Please be
                                        certain.</p>
                                </div>
                            </div>
                            <form id="formAccountDeactivation" onSubmit={deactivateAccount}>
                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="accountActivation"
                                        id="accountActivation"
                                        onChange={e => isSetRemember(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="accountActivation">
                                        I confirm my account deactivation
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-danger deactivate-account">
                                    Deactivate Account
                                </button>
                            </form>
                        </div>
                    </div>
                ) : ""
            }

        </>
    )
}

export default Account