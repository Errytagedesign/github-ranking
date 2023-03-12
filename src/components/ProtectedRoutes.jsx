import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateValue } from "../context/StateContext";

const ProtectedRoutes = () => {
  const [{ user }] = useStateValue();

  return user ? <Outlet /> : <Navigate to="signin" />;
};

export default ProtectedRoutes;
