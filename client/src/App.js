import React from "react";


import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Profile from "./pages/profile";
import Register from "./components/login/register";
import {connect} from "react-redux";
import LoginForm from "./components/login/login";



function App({state}) {
    return (
        <>
            <Router>
                <Routes>
                    {/*<Route exact path="/" element={user ? <Home/> : <Navigate to="/Login"/>}></Route>*/}
                    {/*<Route exact path="/home" element={user ? <Home/> : <Navigate to="/Login"/>}></Route>*/}
                    {/*<Route exact path="/employees" element={user ? <Employee/> : <Navigate to="/Login"/>}/>*/}
                    {/*<Route exact path="/profile" element={user ? <Profile/> : <Navigate to="/Login"/>}/>*/}
                    {/*<Route exact path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>*/}
                    {/*<Route exact path="/register" element={!user ? <Register/> : <Navigate to="/"/>}/>*/}

                    <Route exact path="/login" element={!state.login.isLoggedIn ? <LoginForm/> : <Navigate to="/"/>}/>
                    <Route exact path="/" element={state.login.isLoggedIn ? <Home/> : <Navigate to="/Login"/>}></Route>
                    <Route exact path="/employees" element={state.login.isLoggedIn ? <Employee/> : <Navigate to="/Login"/>}></Route>
                    <Route exact path="/profile" element={state.login.isLoggedIn ? <Profile/> : <Navigate to="/Login"/>}></Route>
                    {/*<Route exact path="/profile/:id" element={state.login.isLoggedIn ? <Profile/> : <Navigate to="/Login"/>}></Route>*/}
                    <Route exact path="/employees/profile" element={state.login.isLoggedIn ? <Profile/> : <Navigate to="/Login"/>}></Route>
                    <Route exact path="/register" element={!state.login.isLoggedIn ? <Register/> : <Navigate to="/"/>}/>
                </Routes>
            </Router>
        </>
    );
}

const mapStateToProps = state => ({
    state:state
});

export default connect(mapStateToProps, null)(App);
