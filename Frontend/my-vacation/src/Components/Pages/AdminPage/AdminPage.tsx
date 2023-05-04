import { useEffect, useState } from "react";
import "./AdminPage.css";
import axios from "axios";
import SingleVacation from "../AddVacation/singleVacation/singleVacation"
import Vacation from "../../model/Vacations/Vacation";
import { useNavigate } from "react-router-dom";

function AdminPage(): JSX.Element {
  // const [vacations, setvaCations] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/vacations/GetAllVacations")
      .then((res) => setvaCations(res.data));
  }, []);
  const navigate = useNavigate();

  const [vacations, setvaCations] = useState<Vacation[]>([]);

  return (
    <div className="AdminPage">
      {/* <div className="Container">
        {vacations.map((item) => (
          <div key={item["VacationCode"]} className="VacationCard">
            <span>{item["Destination"]}</span>
            <br />
            <span>{item["Description"]}</span>
            <br />
            <span>{item["Img"]}</span>
            <br />
            <span>{item["StartDate"]}</span>
            <br />
            <span>{item["EndDate"]}</span>
            <br />
            <span>{item["Price"]}</span>
          </div>
        ))}
      </div> */}
<button onClick={()=>
            navigate(`/addVacation`)}>Add New Vacation</button>
{vacations.map((item) => (
        <SingleVacation 
        key={item.VacationCode} 
        vacationData={item} />
      ))}
    </div>
  );
}

export default AdminPage;
