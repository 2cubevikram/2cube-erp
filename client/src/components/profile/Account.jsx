import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addIncrement, addUserProfile, updateUserProfile} from "../../redux/actions/profileAction";
import moment from "moment";
import {userDelete} from "../../redux/actions/authActions";
import {useNavigate} from "react-router-dom";

const Account = ({profile}) => {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(profile.first_name || "");
    const [lastName, setLastName] = useState(profile.last_name || "");
    const [birthDate, setBirthDate] = useState(profile.birth_date || "");
    const [joinDate, setJoinDate] = useState(profile.join_date || "");
    const [accountNo, setAccountNumber] = useState(profile.account_number || "");
    const [extraDetails, setExtraDetails] = useState(profile.extra_details || "");
    const [incrementMonth, setIncrementMonth] = useState(profile.increment || "");
    const [basicSalary, setBasicSalary] = useState(profile.basic || "");
    const [salaryIncrement, setSalaryIncrement] = useState(profile.increments || "");
    const [isLoading, setIsLoading] = useState(true);
    const [isRemember, isSetRemember] = useState(false);

    const user = useSelector((state) => state.login.user);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const updateState = () => {
        setFirstName(profile.first_name);
        setLastName(profile.last_name);
        setBirthDate(moment(profile.birth_date).format('YYYY-MM-DD'));
        setJoinDate(moment(profile.join_date).format('YYYY-MM-DD'));
        setAccountNumber(profile.account_number);
        setExtraDetails(profile.extra_details);
        setIncrementMonth(profile.increments);
        setBasicSalary(profile.basic);
        setSalaryIncrement(profile.increment);
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
            join_date: joinDate,
            account_number: accountNo,
            extra_details: extraDetails,
        };
        if (file !== null) {
            await dispatch(addUserProfile({obj, user}));
            alert("Profile Added Successfully")
        } else if (incrementMonth === profile.increment) {
            const params = {
                first_name: obj.first_name,
                last_name: obj.last_name,
                birth_date: obj.birth_date,
                join_date: joinDate,
                account_number: accountNo,
                extra_details: extraDetails,
            }
            await dispatch(updateUserProfile({params, user}));
            alert("Profile Updated Successfully")
        }
        if (incrementMonth !== "" && incrementMonth !== profile.increment) {
            const params = {
                increment: incrementMonth,
                employee_id: profile.id,
            }
            await dispatch(addIncrement({params, user}));
            alert("Increment Updated Successfully")
        }
    };

    const deactivateAccount = async (e) => {
        e.preventDefault();

        if (!isRemember) {
            alert("Please Check I confirm the account deactivation");
            return;
        } else {
            const params = {
                status: 'deactivate',
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
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="phoneNumber">Join Date</label>
                                        <div className="input-group input-group-merge">
                                            <input
                                                type="date"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                value={moment(joinDate).format('YYYY-MM-DD')}
                                                onChange={(e) => setJoinDate(e.target.value)}
                                                disabled={(user.role !== 'Admin' && user.role !== 'HR') || (user.role === 'HR' && profile.role === 'HR')}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="address" className="form-label">Next Increment</label>
                                        <select
                                            id="increment"
                                            className="select2 form-select"
                                            name="increment"
                                            value={incrementMonth}
                                            disabled={(user.role !== 'Admin' && user.role !== 'HR') || (user.role === 'HR' && profile.role === 'HR')}
                                            onChange={(e) => setIncrementMonth(e.target.value)}
                                        >
                                            <option value={1}>January</option>
                                            <option value={2}>February</option>
                                            <option value={3}>March</option>
                                            <option value={4}>April</option>
                                            <option value={5}>May</option>
                                            <option value={6}>June</option>
                                            <option value={7}>July</option>
                                            <option value={8}>August</option>
                                            <option value={9}>September</option>
                                            <option value={10}>October</option>
                                            <option value={11}>November</option>
                                            <option value={12}>December</option>
                                        </select>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="firstName" className="form-label">Basic Salary</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="basicSalary"
                                            value={basicSalary}
                                            onChange={(e) => setBasicSalary(e.target.value)}
                                            disabled={(user.role !== 'Admin' && user.role !== 'HR') || (user.role === 'HR' && profile.role === 'HR')}
                                            autoFocus
                                            required
                                        />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="lastName" className="form-label">Salary Increment</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="salaryIncrement"
                                            value={salaryIncrement}
                                            onChange={(e) => setSalaryIncrement(e.target.value)}
                                            disabled={(user.role !== 'Admin' && user.role !== 'HR') || (user.role === 'HR' && profile.role === 'HR')}
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
                                            readOnly={user.id !== profile.id}
                                            placeholder="Account Number"/>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="Details" className="form-label">Extra Details</label>
                                        <textarea
                                            id="Details"
                                            name="Details"
                                            value={extraDetails}
                                            onChange={(e) => setExtraDetails(e.target.value)}
                                            readOnly={user.id !== profile.id}
                                            className="form-control"
                                            rows={3}
                                            cols={1}
                                        />
                                    </div>
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