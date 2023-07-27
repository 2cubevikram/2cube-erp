import { useState} from "react";
import { connect } from 'react-redux';
import {login} from "../../redux/actions/authActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = ({login, error}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
        } catch (error) {
            console.log(error)
            toast.error(error, {
                position: "top-center",
                autoClose: 3000,
            });
        }
    };
    console.log("Error prop:", error);
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
                                <h4 className="mb-2">Welcome to 2cube studio ! 👋</h4>
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
                                            onChange={e => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3 form-password-toggle">
                                        <div className="d-flex justify-content-between">
                                            <label className="form-label" htmlFor="password">Password</label>
                                            <a href="auth-forgot-password-basic.html">
                                                <small>Forgot Password?</small>
                                            </a>
                                        </div>
                                        <div className="input-group input-group-merge">
                                            <input
                                                type="password"
                                                id="password"
                                                className="form-control"
                                                name="password"
                                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                                aria-describedby="password"
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                            <span className="input-group-text cursor-pointer"><i
                                                className="bx bx-hide"></i></span>
                                        </div>
                                    </div>
                                    {/*{error && <div style={{ color: 'red' }}>Please enter a valid Email or Password!</div>}*/}
                                    {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
                                    <br/>
                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="remember-me"/>
                                            <label className="form-check-label" htmlFor="remember-me"> Remember
                                                Me </label>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <button className={"btn btn-primary d-grid w-100"} type="submit">Submit</button>
                                    </div>
                                </form>

                                <p className="text-center">
                                    <span>New on our platform?</span>
                                    <a href="/register">
                                        <span>Create an account</span>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
});

export default connect(mapStateToProps)(LoginForm);


// export default connect(null, { login })(LoginForm);
// export default connect(mapStateToProps, { login })(LoginForm);
