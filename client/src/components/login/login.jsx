import {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {login} from "../../redux/actions/authActions";
import ErrorPopup from "../toast-message/ErrorPopup";
import {Link} from "react-router-dom";

const LoginForm = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.login.error);
    const [firstName, setFirstName] = useState('2Cube');
    const [lastName, setLastName] = useState('Studio');
    const [showError, setShowError] = useState(false);
    const [pass, setPass] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [logError, setLogError] = useState('');
    const [isRemember, isSetRemember] = useState(false);


    useEffect(() => {
        // Function to read the cookie and extract first_name
        const getFirstNameFromCookie = () => {
            const cookies = document.cookie.split('; ');
            for (const cookie of cookies) {
                const [name, value] = cookie.split('=');
                if (name === 'user') {
                    const userObject = JSON.parse(decodeURIComponent(value));
                    setFirstName(userObject.first_name || '');
                    setLastName(userObject.last_name || '');
                    setUsername(userObject.email || '');
                    setPassword(userObject.password || '');
                    break;
                }
            }
        };

        getFirstNameFromCookie();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login(username.trim(), password.trim(), isRemember));
        } catch (error) {
            setShowError(true);
            setLogError(error);
        }
    };

    return (
        <>
            <div className="container-xxl">
                <div className="authentication-wrapper authentication-basic container-p-y">
                    <div className="authentication-inner">
                        <div className="card">
                            <div className="card-body">
                                <div className="app-brand justify-content-center">
                                    <a href="/" className="app-brand-link gap-2">
                                        <span className="app-brand-text demo text-body fw-bolder">Well Come</span>
                                    </a>
                                </div>
                                <h4 className="mb-2">Welcome <strong style={{color: '#FF5733'}}> {firstName} {lastName} </strong> ! 👋</h4>
                                <p className="mb-4">Please sign-in to your account and start the session</p>

                                <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email or Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="email"
                                            name="email-username"
                                            placeholder="Enter your email or username"
                                            autoFocus
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3 form-password-toggle">
                                        <div className="d-flex justify-content-between">
                                            <label className="form-label" htmlFor="password">Password</label>
                                            <Link to={"/forgot-password"}>
                                                <small>Forgot Password?</small>
                                            </Link>
                                        </div>
                                        <div className="input-group input-group-merge">
                                            <input
                                                type={pass ? "text" : "password"}
                                                id="password"
                                                className="form-control"
                                                name="password"
                                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                                aria-describedby="password"
                                                // value={md5(password)}
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                            <span
                                                onClick={() => setPass(!pass)}
                                                className="input-group-text cursor-pointer"><i
                                                className={pass ? "bx bx-show" : "bx bx-hide"}></i></span>
                                        </div>
                                    </div>
                                    {error && showError &&
                                        <ErrorPopup error={logError} onClose={() => setShowError(false)}/>}
                                    <br/>
                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="remember-me"
                                                   onChange={e => isSetRemember(e.target.checked)}
                                            />
                                            <label className="form-check-label" htmlFor="remember-me"> Remember
                                                Me </label>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <button className={"btn btn-primary d-grid w-100"} type="submit">Sign In</button>
                                    </div>
                                </form>

                                <p className="text-center">
                                    <span>New on our platform?</span>
                                    <Link to={"/register"}>
                                        <span>Create an account</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm;