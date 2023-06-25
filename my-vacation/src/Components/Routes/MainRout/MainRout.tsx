import { Route, Routes } from "react-router-dom";
import AddVacation from "../../Pages/AddVacation/AddVacation";
import EditVacation from "../../Pages/EditVacation/EditVacation";
import Login from "../../Pages/Login/Login";
import MainPage from "../../Pages/MainPage/MainPage";
import Page404 from "../../Pages/Page404/Page404";
import Register from "../../Pages/Register/Register";
import VacationCharts from "../../Pages/VacationCharts/VacationCharts";
import Vacations from "../../Pages/Vacations/Vacations";
import "./MainRout.css";
import { PrivateRoutes, AdminRoutes } from "../ProtectedRoute";

//navigate the user throuth the disired route and prevent users to acsess admin routes and 
//unregistered users to acsess the vacations
function MainRout(): JSX.Element {
  return (
    <div className="MainRout">
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<Page404 />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/Vacations" element={<Vacations />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path="/AddVacation" element={<AddVacation />} />
          <Route
            path="/EditVacation/:VacationCode"
            element={<EditVacation />}
          />
          <Route path="/VacationCharts" element={<VacationCharts />} />
        </Route>
      </Routes>
    </div>
  );
}

export default MainRout;
