import { NavLink } from "react-router-dom";
import "./MainPage.css";

function MainPage(): JSX.Element {
  return (
    <div className="MainPage">
      <span>Please</span>
      
      <NavLink to="/Login"> Login</NavLink>&nbsp; | &nbsp; | &nbsp;
      <span>Or</span>
      <NavLink to="/Register"> Register</NavLink>
    </div>
  );
}

export default MainPage;
