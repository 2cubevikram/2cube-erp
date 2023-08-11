import React from "react";


import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Profile from "./pages/profile";
import DayStatus from "./pages/Daystatus";
import Leaves from "./pages/Leaves"
import {connect} from "react-redux";
import Login from "./components/login/login";
import Register from "./components/login/register";
import Holiday from "./pages/Holiday";


function App({state}) {
    // console.log(state.login.user)
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/login" element={!state.login.isLoggedIn ? <Login/> : <Navigate to="/"/>}/>
                    <Route exact path="/" element={state.login.isLoggedIn ? <Home/> : <Navigate to="/login"/>}></Route>
                    <Route exact path="/to-day" element={
                        (state.login.user !== null && state.login.user.role === "Admin") ||
                        (state.login.user !== null && state.login.user.role === "HR") ?
                            <DayStatus/> :
                            <Navigate to="/login"/>
                        // state.login.isLoggedIn ? <DayStatus/> : <Navigate to="/login"/>
                    }>
                    </Route>
                    <Route exact path="/leave-app" element={
                        (state.login.user !== null && state.login.user.role === "Admin") ||
                        (state.login.user !== null && state.login.user.role === "HR") ?
                            <Leaves/> :
                            <Navigate to="/login"/>
                        // state.login.isLoggedIn ? <Leaves/> : <Navigate to="/login"/>
                    }>
                    </Route>
                    <Route exact path="/holiday" element={
                        state.login.isLoggedIn ? <Holiday/> : <Navigate to="/login"/>}></Route>
                    <Route exact path="/employees" element={
                        (state.login.user !== null && state.login.user.role === "Admin") ||
                        (state.login.user !== null && state.login.user.role === "HR") ?
                            <Employee/> :
                            <Navigate to="/login"/>
                        // state.login.isLoggedIn ? <Employee/> : <Navigate to="/login"/>
                    }>
                    </Route>
                    <Route exact path="/profile"
                           element={state.login.isLoggedIn ? <Profile/> : <Navigate to="/login"/>}></Route>
                    {/*<Route exact path="/profile/:id" element={state.login.isLoggedIn ? <Profile/> : <Navigate to="/Login"/>}></Route>*/}
                    <Route exact path="/employees/profile" element={
                        (state.login.user !== null && state.login.user.role === "Admin") ||
                        (state.login.user !== null && state.login.user.role === "HR") ?
                            <Profile/> :
                            <Navigate to="/login"/>
                        // state.login.isLoggedIn ? <Profile/> : <Navigate to="/login"/>
                    }>
                    </Route>
                    <Route exact path="/register" element={!state.login.isLoggedIn ? <Register/> : <Navigate to="/"/>}/>
                </Routes>
            </Router>
        </>
    );
}

const mapStateToProps = state => ({
    state: state
});

export default connect(mapStateToProps, null)(App);
