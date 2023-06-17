import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { vacations } from "../redux/VacationStore";

import { usersReducer } from "../redux/userReducer";
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
  if (userLogged === true) {
    const user = vacations.getState().allUsers.users[0];
    return user.isAdmin ? <Outlet /> : <Navigate to="/AdminPage" />;
  } else {
    return <Navigate to="/Login" />;
  }
};

export { PrivateRoutes, AdminRoutes }; 