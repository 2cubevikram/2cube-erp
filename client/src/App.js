import {AuthContext} from "./context/AuthContext";
import React, {useContext} from "react";

import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Profile from "./pages/profile";
import Login from "./pages/Login";
import Register from "./components/login/register";

function App() {
    const {user} = useContext(AuthContext);
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={user ? <Home/> : <Navigate to="/Login"/>}></Route>
                    <Route exact path="/home" element={user ? <Home/> : <Navigate to="/Login"/>}></Route>
                    <Route exact path="/employees" element={user ? <Employee/> : <Navigate to="/Login"/>}/>
                    <Route exact path="/profile" element={user ? <Profile/> : <Navigate to="/Login"/>}/>
                    <Route exact path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
                    <Route exact path="/register" element={!user ? <Register/> : <Navigate to="/"/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
