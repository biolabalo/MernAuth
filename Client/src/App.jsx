import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/signup";
import UserDetails from "./components/userDetails";
import PrivateRoute from "./components/privateRoute";

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<UserDetails />} />
          </Route>

          <Route exact path="/userDetails" element={<PrivateRoute />}>
            <Route exact path="/userDetails" element={<UserDetails />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
