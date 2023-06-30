import { AuthContext } from "./context/AuthContext";
import React, { useContext } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Profile from "./pages/profile";
import Login from "./pages/Login";

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Login />} ></Route>
          <Route exact path="/home" element={user ? <Home /> : <Login />} ></Route>
          <Route exact path="/employees" element={<Employee />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
