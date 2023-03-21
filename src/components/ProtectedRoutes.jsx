import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { useStateValue } from "../context/StateContext";

const ProtectedRoutes = ({ userData }) => {
  // const [{ user }] = useStateValue();

  console.log(userData);

  return userData ? <Outlet /> : <Navigate to="signin" />;
};

export default ProtectedRoutes;
