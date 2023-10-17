import {useDispatch} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {changePassword} from "../../redux/actions/authActions";


const ChangePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pass, setPass] = useState(false);
    const [password, setPassword] = useState('');
    const [confpass, setConfpass] = useState(false);
    const [confpassword, setConfPassword] = useState('');
    const [error, setError] = useState('');
    const {email, token} = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confpassword) {
            setError('Password and Confirm Password not match');
            return;
        }
        setError('');

        try {
            await dispatch(changePassword(password.trim(), token));
            alert('Password changed successfully');
            navigate('/login');
        } catch (error) {
            alert(error)
            // console.log(error)
        }
    };


    return (
        <>
            <div className="container-xxl">
                <div className="authentication-wrapper authentication-basic container-p-y">
                    <div className="authentication-inner py-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="app-brand justify-content-center">
                                    <Link to={"/login"} className="app-brand-link gap-2">
                                        <span className="app-brand-text demo text-body fw-bolder">2cube studio</span>
                                    </Link>
                                </div>
                                <h4 className="mb-2">Change Password? 🔒</h4>
                                <p className="mb-4">Please enter password and confirm password for change</p>
                                <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit}>
                                    <div className="mb-3 form-password-toggle">
                                        <div className="d-flex justify-content-between">
                                            <label className="form-label" htmlFor="password">Password</label>
                                        </div>
                                        <div className="input-group input-group-merge">
                                            <input
                                                type={pass ? "text" : "password"}
                                                id="password"
                                                className="form-control"
                                                name="password"
                                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                                aria-describedby="password"
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                            <span
                                                onClick={() => setPass(!pass)}
                                                className="input-group-text cursor-pointer"><i
                                                className={pass ? "bx bx-show" : "bx bx-hide"}></i></span>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-password-toggle">
                                        <div className="d-flex justify-content-between">
                                            <label className="form-label" htmlFor="password">Confirm Password</label>
                                        </div>
                                        <div className="input-group input-group-merge">
                                            <input
                                                type={confpass ? "text" : "password"}
                                                id="conf-password"
                                                className="form-control"
                                                name="conf-password"
                                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                                aria-describedby="conf-password"
                                                onChange={e => setConfPassword(e.target.value)}
                                            />
                                            <span
                                                onClick={() => setConfpass(!confpass)}
                                                className="input-group-text cursor-pointer"><i
                                                className={confpass ? "bx bx-show" : "bx bx-hide"}></i></span>
                                        </div>
                                    </div>
                                    {error && <div className="text-danger">{error}</div>}
                                    <div className="mb-3">
                                        <button className={"btn btn-primary d-grid w-100"} type="submit">Change
                                            Password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword