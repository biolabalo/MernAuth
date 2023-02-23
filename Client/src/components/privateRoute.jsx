import React from "react";
import {  Navigate,  Outlet } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return  isLoggedIn ? (
    <Outlet /> 
  ) : (
    <Navigate to="/sign-in" replace state={{ from: rest.location }} />
  )
};

export default PrivateRoute;
