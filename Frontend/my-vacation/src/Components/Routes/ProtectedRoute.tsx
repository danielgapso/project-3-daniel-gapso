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
  const { userLogged } = userAuth();
  return userLogged ? <Outlet /> : <Navigate to="/Login" />;
};

const AdminRoutes = () => {
  const { userLogged } = userAuth();
  const users = vacations.getState().allUsers.users;

  if (userLogged === true) {
    const isAdmin = users[0]?.isAdmin;
    return isAdmin ? <Outlet /> : <Navigate to="/AdminPage" />;
  } else {
    return <Navigate to="/Login" />;
  }
};

export { PrivateRoutes, AdminRoutes };
