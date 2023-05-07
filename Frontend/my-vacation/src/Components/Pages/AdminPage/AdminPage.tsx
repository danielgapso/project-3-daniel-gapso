import { useEffect, useState } from "react";
import "./AdminPage.css";
import axios from "axios";
import SingleVacation from "../AddVacation/singleVacation/singleVacation";
import Vacation from "../../model/Vacations/Vacation";
import { useNavigate } from "react-router-dom";
import { downloadVacationAction } from "../../redux/VacationReducer";
import { vacations } from "../../redux/VacationStore";

function AdminPage(): JSX.Element {
  const navigate = useNavigate();
  const [localVacations, setLocalVacations] = useState<Vacation[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (vacations.getState().allVacations.allVacations.length < 1) {
      console.log("getting data from backend....");
      axios
        .get("http://localhost:4000/api/v1/vacations/GetAllVacations")
        .then((response) => {
          vacations.dispatch(downloadVacationAction(response.data));
          setRefresh(true);
        });
    }
  }, []);

  useEffect(() => {
    setLocalVacations(vacations.getState().allVacations.allVacations);
  }, [refresh]);

  return (
    <div className="AdminPage">
      <button onClick={() => navigate(`/addVacation`)}>Add New Vacation</button>
      {localVacations.map((item) => (
        <SingleVacation key={item.VacationCode} vacationData={item} />
      ))}
    </div>
  );
}

export default AdminPage;
