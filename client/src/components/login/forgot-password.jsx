import {Link,useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {sendEmail} from "../../redux/actions/authActions";
import {useState} from "react";


const ForgotPassword = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(sendEmail(email.trim()));
            alert('Email has been sent successfully');
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
                               <h4 className="mb-2">Forgot Password? 🔒</h4>
                               <p className="mb-4">Enter your email and we'll send you instructions to reset your
                                   password</p>
                               <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit}>
                                   <div className="mb-3">
                                       <label htmlFor="email" className="form-label">Email</label>
                                       <input
                                           type="text"
                                           className="form-control"
                                           id="email"
                                           name="email"
                                           placeholder="Enter your email"
                                           autoFocus
                                           onChange={e => setEmail(e.target.value)}
                                       />
                                   </div>
                                   <button className="btn btn-primary d-grid w-100">Send Reset Link</button>
                               </form>
                               <div className="text-center">
                                   <Link to={"/login"}
                                      className="d-flex align-items-center justify-content-center">
                                       <i className="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
                                       Back to login
                                   </Link>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </>
     );
}

export default ForgotPassword;