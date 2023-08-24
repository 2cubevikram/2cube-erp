import {useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {register} from "../../redux/actions/authActions";

const Register = () => {
    const dispatch = useDispatch();
    const first_name = useRef();
    const last_name = useRef();
    const email = useRef();
    const password = useRef();
    const role = useRef();
    let navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        const userData = {
            first_name: first_name.current.value.trim(),
            last_name: last_name.current.value.trim(),
            email: email.current.value.trim(),
            role: role.current.value.trim(),
            password: password.current.value.trim(),
        };
        try {
            await dispatch(register({userData}));
            alert("Sign up successful! Please proceed to login")
            navigate('/login');
        } catch (e) {
            alert(e)
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
                                    <a href="/login" className="app-brand-link gap-2">
                                        <span className="app-brand-text demo text-body fw-bolder">Well Come</span>
                                    </a>
                                </div>
                                <h4 className="mb-2">Adventure starts here 🚀</h4>
                                <p className="mb-4">Please sign-up for your new account and start your app management
                                    easy and fun!</p>
                                <form id="formAuthentication" className="mb-3" onSubmit={handleClick}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">First Name</label>
                                        <input type="text" className="form-control" ref={first_name}
                                               placeholder="Enter your username" autoFocus/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Last Name</label>
                                        <input type="text" className="form-control" ref={last_name}
                                               placeholder="Enter your username" autoFocus/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="text" className="form-control" ref={email}
                                               placeholder="Enter your email"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="designation" className="form-label">Designation</label>
                                        <select className="form-select" aria-label="Select Designation" ref={role}>
                                            <option value="">Select</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Employee">Employee</option>
                                            <option value="HR">Human Resource</option>
                                        </select>
                                    </div>
                                    <div className="mb-3 form-password-toggle">
                                        <label className="form-label" htmlFor="password">Password</label>
                                        <div className="input-group input-group-merge">
                                            <input type="password" id="password" className="form-control"
                                                   ref={password}
                                                   placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                                   aria-describedby="password"
                                            />
                                            <span className="input-group-text cursor-pointer">
                                                <i className="bx bx-hide"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="terms-conditions"
                                                   name="terms"/>
                                            <label className="form-check-label" htmlFor="terms-conditions">
                                                I agree to
                                                <a href="/#">privacy policy & terms</a>
                                            </label>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary d-grid w-100">Sign up</button>
                                </form>

                                <p className="text-center">
                                    <span>Already have an account?</span>
                                    <Link to={"/login"}>
                                        <span>Sign in instead</span>
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

export default Register;