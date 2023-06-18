import { Outlet, Navigate } from "react-router-dom";
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
  const { userLogged, user } = userAuth();
  if (userLogged === true) {
    console.log("is admin", !!user.isAdmin);
    return user.isAdmin ? <Outlet /> : <Navigate to="/Vacations" />;
  } else {
    return <Navigate to="/Login" />;
  }
};



export { PrivateRoutes, AdminRoutes };
