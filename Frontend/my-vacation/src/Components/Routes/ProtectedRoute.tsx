import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { vacations } from "../redux/VacationStore";

const userAuth = () => {
  const userLogged = vacations.getState().allUsers.isLoggedIn;
  const user = vacations.getState().allUsers.users[0];
  return { userLogged, user };
};

const PrivateRoutes = () => {
  const { userLogged, user } = userAuth();

  if (!userLogged) {
    return <Navigate to="/" />;
  }

 //  const isAdmin = user?.isAdmin;
 //  if (!isAdmin) {
   //  return <Navigate to="/vacations" />;
  // }

  return <Outlet />;
};

const AdminRoutes = () => {
  const { userLogged, user } = userAuth();

  if (!userLogged) {
    return <Navigate to="/Login" />;
  }

  const isAdmin = user?.isAdmin;

  if (!isAdmin) {
    return <Navigate to="/Vacations" />;
  }

  return <Outlet />;
};

export { PrivateRoutes, AdminRoutes };
